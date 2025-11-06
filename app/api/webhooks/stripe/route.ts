import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import prisma from '@/lib/prisma'
import { sendToPostGrid } from '@/lib/postgrid'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      await handleCheckoutComplete(session)
      break

    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('PaymentIntent succeeded:', paymentIntent.id)
      break

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent
      console.log('PaymentIntent failed:', failedPayment.id)
      break

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const postcardId = session.metadata?.postcardId

  if (!postcardId) {
    console.error('No postcardId in session metadata')
    return
  }

  try {
    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        postcardId,
        amount: session.amount_total || 0,
        currency: session.currency || 'usd',
        stripeTxId: session.payment_intent as string,
        status: 'completed',
      },
    })

    // Update postcard status
    await prisma.postcard.update({
      where: { id: postcardId },
      data: { status: 'processing' },
    })

    // Send to PostGrid for printing and mailing
    const postcard = await prisma.postcard.findUnique({
      where: { id: postcardId },
    })

    if (postcard) {
      await sendToPostGrid(postcard)
    }
  } catch (error) {
    console.error('Error handling checkout complete:', error)
  }
}
