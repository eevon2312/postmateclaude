import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { postcardId, senderName, message } = body

    if (!postcardId || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify postcard exists
    const postcard = await prisma.postcard.findUnique({
      where: { id: postcardId },
    })

    if (!postcard) {
      return NextResponse.json(
        { error: 'Postcard not found' },
        { status: 404 }
      )
    }

    // Create reply
    const reply = await prisma.reply.create({
      data: {
        postcardId,
        senderName: senderName || 'Anonymous',
        message,
      },
    })

    // TODO: Send email notification to postcard sender
    // if postcard has userId, notify them via email

    return NextResponse.json(reply)
  } catch (error) {
    console.error('Error creating reply:', error)
    return NextResponse.json(
      { error: 'Failed to create reply' },
      { status: 500 }
    )
  }
}
