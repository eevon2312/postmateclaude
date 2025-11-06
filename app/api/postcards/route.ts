import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const postcards = await prisma.postcard.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        recipientName: true,
        recipientCity: true,
        recipientCountry: true,
        status: true,
        createdAt: true,
        trackingId: true,
        imageUrl: true,
      },
    })

    return NextResponse.json(postcards)
  } catch (error) {
    console.error('Error fetching postcards:', error)
    return NextResponse.json(
      { error: 'Failed to fetch postcards' },
      { status: 500 }
    )
  }
}
