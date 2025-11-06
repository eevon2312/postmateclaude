import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create default templates
  const templates = [
    {
      name: 'Scenic View',
      thumbnailUrl: '/templates/scenic.jpg',
      layoutData: { type: 'photo-full' },
      category: 'travel',
    },
    {
      name: 'Minimalist',
      thumbnailUrl: '/templates/minimal.jpg',
      layoutData: { type: 'simple' },
      category: 'general',
    },
    {
      name: 'Colorful Birthday',
      thumbnailUrl: '/templates/colorful.jpg',
      layoutData: { type: 'celebration' },
      category: 'celebration',
    },
    {
      name: 'Classic Vintage',
      thumbnailUrl: '/templates/classic.jpg',
      layoutData: { type: 'vintage' },
      category: 'general',
    },
    {
      name: 'Holiday Greetings',
      thumbnailUrl: '/templates/holiday.jpg',
      layoutData: { type: 'holiday' },
      category: 'celebration',
    },
    {
      name: 'Nature Photography',
      thumbnailUrl: '/templates/nature.jpg',
      layoutData: { type: 'photo-full' },
      category: 'travel',
    },
  ]

  for (const template of templates) {
    await prisma.template.upsert({
      where: { name: template.name },
      update: {},
      create: template,
    })
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
