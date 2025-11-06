import { NextRequest, NextResponse } from 'next/server'
import { handlePostGridWebhook } from '@/lib/postgrid'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Verify webhook signature (if PostGrid provides one)
    // const signature = req.headers.get('x-postgrid-signature')
    // Add signature verification here

    await handlePostGridWebhook(body)

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('PostGrid webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
