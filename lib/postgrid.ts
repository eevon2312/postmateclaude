import axios from 'axios'
import prisma from './prisma'
import QRCode from 'qrcode'

const POSTGRID_API_KEY = process.env.POSTGRID_API_KEY!
const POSTGRID_API_URL = 'https://api.postgrid.com/v1'

interface Postcard {
  id: string
  imageUrl: string | null
  messageText: string
  handwritingFont: string
  recipientName: string
  recipientAddress: string
  recipientCity: string
  recipientState: string | null
  recipientZip: string
  recipientCountry: string
}

export async function sendToPostGrid(postcard: Postcard) {
  try {
    // Generate QR code for replies
    const qrCodeUrl = await generateQRCode(postcard.id)

    // Update postcard with QR code
    await prisma.postcard.update({
      where: { id: postcard.id },
      data: { qrCodeUrl },
    })

    // Create contact (recipient) in PostGrid
    const contact = await axios.post(
      `${POSTGRID_API_URL}/contacts`,
      {
        firstName: postcard.recipientName.split(' ')[0],
        lastName: postcard.recipientName.split(' ').slice(1).join(' '),
        addressLine1: postcard.recipientAddress,
        city: postcard.recipientCity,
        provinceOrState: postcard.recipientState || '',
        postalOrZip: postcard.recipientZip,
        country: postcard.recipientCountry,
      },
      {
        headers: {
          'x-api-key': POSTGRID_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    )

    // Create postcard in PostGrid
    const postcardResponse = await axios.post(
      `${POSTGRID_API_URL}/postcards`,
      {
        to: contact.data.id,
        size: '6x4',
        front: postcard.imageUrl || 'https://via.placeholder.com/600x400',
        back: generateBackHTML(postcard, qrCodeUrl),
        express: false,
      },
      {
        headers: {
          'x-api-key': POSTGRID_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    )

    // Update postcard with PostGrid details
    await prisma.postcard.update({
      where: { id: postcard.id },
      data: {
        postgridId: postcardResponse.data.id,
        postgridStatus: postcardResponse.data.status,
        trackingId: postcardResponse.data.id,
        status: 'sent',
      },
    })

    return postcardResponse.data
  } catch (error: any) {
    console.error('PostGrid API error:', error.response?.data || error.message)

    // Update postcard status to failed
    await prisma.postcard.update({
      where: { id: postcard.id },
      data: { status: 'failed' },
    })

    throw error
  }
}

async function generateQRCode(postcardId: string): Promise<string> {
  const replyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reply/${postcardId}`

  try {
    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(replyUrl, {
      width: 200,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    })

    return qrCodeDataUrl
  } catch (error) {
    console.error('QR code generation error:', error)
    return ''
  }
}

function generateBackHTML(postcard: Postcard, qrCodeUrl: string): string {
  return `
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 20px;
            font-family: '${postcard.handwritingFont}', cursive;
            font-size: 18px;
            line-height: 1.6;
          }
          .container {
            display: flex;
            height: 100%;
          }
          .message {
            flex: 1;
            padding-right: 20px;
            border-right: 2px dashed #ccc;
          }
          .address {
            width: 200px;
            padding-left: 20px;
          }
          .qr-code {
            margin-top: 10px;
            text-align: center;
          }
          .qr-code img {
            width: 100px;
            height: 100px;
          }
          .qr-text {
            font-size: 10px;
            margin-top: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="message">
            ${postcard.messageText.replace(/\n/g, '<br>')}
          </div>
          <div class="address">
            <div style="text-align: center; margin-bottom: 20px; border: 2px dashed #ccc; padding: 10px;">
              STAMP
            </div>
            <div class="qr-code">
              <img src="${qrCodeUrl}" alt="Scan to reply" />
              <div class="qr-text">Scan to reply</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

// Handle PostGrid webhook updates
export async function handlePostGridWebhook(data: any) {
  const { id, status } = data

  try {
    // Find postcard by PostGrid ID
    const postcard = await prisma.postcard.findFirst({
      where: { postgridId: id },
    })

    if (!postcard) {
      console.error('Postcard not found for PostGrid ID:', id)
      return
    }

    // Map PostGrid status to our status
    const statusMap: { [key: string]: string } = {
      ready: 'processing',
      in_transit: 'sent',
      delivered: 'delivered',
      returned: 'failed',
      canceled: 'failed',
    }

    const newStatus = statusMap[status] || 'processing'

    // Update postcard status
    await prisma.postcard.update({
      where: { id: postcard.id },
      data: {
        postgridStatus: status,
        status: newStatus,
      },
    })
  } catch (error) {
    console.error('Error handling PostGrid webhook:', error)
  }
}
