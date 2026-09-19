import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // 1. Create Collections
  const collections = [
    {
      name: "Mossanite",
      imageUrl: "https://images.unsplash.com/photo-1599643478514-4a820cbf311e?q=80&w=600&auto=format&fit=crop",
      description: "Brilliant, durable, and ethically sourced mossanite jewelry."
    },
    {
      name: "Emeralds",
      imageUrl: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600&auto=format&fit=crop",
      description: "Rich, vivid green emeralds for a touch of timeless elegance."
    },
    {
      name: "Lab Diamonds",
      imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop",
      description: "Flawless, sustainable lab-grown diamonds."
    },
    {
      name: "Precious Stones",
      imageUrl: "https://images.unsplash.com/photo-1574706599763-706b83f4bce9?q=80&w=600&auto=format&fit=crop",
      description: "A curated selection of sapphires, rubies, and other precious gems."
    }
  ];

  for (const col of collections) {
    const created = await prisma.collection.upsert({
      where: { name: col.name },
      update: {},
      create: {
        name: col.name,
        imageUrl: col.imageUrl,
        description: col.description,
      }
    });

    // 2. Add some dummy products to each collection
    await prisma.product.createMany({
      data: [
        {
          name: `Classic ${col.name} Ring`,
          description: `A beautiful classic ring featuring premium ${col.name.toLowerCase()}.`,
          price: 1500,
          stock: 10,
          collectionId: created.id,
          imageUrl: col.imageUrl,
        },
        {
          name: `Elegant ${col.name} Necklace`,
          description: `Stunning necklace adorned with ${col.name.toLowerCase()}.`,
          price: 2200,
          stock: 5,
          collectionId: created.id,
          imageUrl: col.imageUrl,
        }
      ]
    });
  }

  console.log('Database seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
