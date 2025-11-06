import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // Try to fetch from database
    let templates = await prisma.template.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    })

    // If no templates in database, return default templates
    if (templates.length === 0) {
      templates = [
        {
          id: 'default-1',
          name: 'Scenic View',
          thumbnailUrl: '/templates/scenic.jpg',
          layoutData: {},
          category: 'travel',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'default-2',
          name: 'Minimalist',
          thumbnailUrl: '/templates/minimal.jpg',
          layoutData: {},
          category: 'general',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'default-3',
          name: 'Colorful',
          thumbnailUrl: '/templates/colorful.jpg',
          layoutData: {},
          category: 'celebration',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'default-4',
          name: 'Classic',
          thumbnailUrl: '/templates/classic.jpg',
          layoutData: {},
          category: 'general',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    }

    return NextResponse.json(templates)
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    )
  }
}
