import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    const body = await req.json()
    const {
      templateId,
      imageUrl,
      message,
      handwritingFont,
      recipient,
    } = body

    // Validate required fields
    if (!templateId || !message || !recipient) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create postcard in database
    const postcard = await prisma.postcard.create({
      data: {
        userId: session?.user?.id || null,
        templateId,
        imageUrl: imageUrl || null,
        messageText: message,
        handwritingFont: handwritingFont || 'Caveat',
        recipientName: recipient.recipientName,
        recipientAddress: `${recipient.addressLine1}${
          recipient.addressLine2 ? ', ' + recipient.addressLine2 : ''
        }`,
        recipientCity: recipient.city,
        recipientState: recipient.state || '',
        recipientZip: recipient.zip,
        recipientCountry: recipient.country,
        status: 'draft',
      },
    })

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Postmate Postcard',
              description: 'Custom printed and mailed postcard',
            },
            unit_amount: 449, // $4.49 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true&postcardId=${postcard.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?canceled=true`,
      metadata: {
        postcardId: postcard.id,
      },
    })

    return NextResponse.json({
      postcardId: postcard.id,
      checkoutUrl: checkoutSession.url,
    })
  } catch (error: any) {
    console.error('Error creating postcard:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create postcard' },
      { status: 500 }
    )
  }
}
