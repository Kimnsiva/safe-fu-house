import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create OWNER
  const hashedPassword = await argon2.hash('password123'); // Change in production!
  await prisma.user.upsert({
    where: { email: 'owner@safefu.house' },
    update: {},
    create: {
      email: 'owner@safefu.house',
      password: hashedPassword,
      role: 'OWNER',
    },
  });

  // 2. Settings (Business facts)
  const settings = [
    { key: 'announcement', jsonValue: JSON.stringify({ text: 'Welcome to Safe-fu House!' }) },
    { key: 'hours', jsonValue: JSON.stringify({ open: '09:00', close: '18:00', closedDays: ['Wednesday'] }) },
  ];
  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { jsonValue: s.jsonValue },
      create: s,
    });
  }

  // 3. Categories
  const catMatcha = await prisma.category.create({
    data: { nameTh: 'มัทฉะ', nameEn: 'Matcha', sortOrder: 1 },
  });
  const catCoffee = await prisma.category.create({
    data: { nameTh: 'ชาและกาแฟ', nameEn: 'Tea and Coffee', sortOrder: 2 },
  });

  // 4. Menu Items
  await prisma.menuItem.createMany({
    data: [
      {
        categoryId: catMatcha.id,
        nameTh: 'มัทฉะลาเต้ ใบเมเปิ้ล',
        nameEn: 'Matcha Latte with Maple Leaf',
        descTh: 'มัทฉะลาเต้ซิกเนเจอร์พร้อมใบเมเปิ้ล',
        descEn: 'Signature Matcha Latte with Maple Leaf',
        priceThb: null,
        tag: 'signature',
        available: true,
        published: true,
        sortOrder: 1,
      },
      {
        categoryId: catMatcha.id,
        nameTh: 'มัทฉะเลมอนเนด',
        nameEn: 'Matcha Lemonade',
        priceThb: null,
        available: true,
        published: true,
        sortOrder: 2,
      },
      {
        categoryId: catCoffee.id,
        nameTh: 'โฮจิฉะลาเต้',
        nameEn: 'Houjicha Latte',
        priceThb: null,
        available: true,
        published: true,
        sortOrder: 1,
      },
      {
        categoryId: catCoffee.id,
        nameTh: 'เก็นไมฉะลาเต้',
        nameEn: 'Genmaicha Latte',
        priceThb: null,
        available: true,
        published: true,
        sortOrder: 2,
      },
      {
        categoryId: catCoffee.id,
        nameTh: 'โคลด์บรูว์โคโคนัท',
        nameEn: 'Cold Brew Coconut',
        priceThb: null,
        available: true,
        published: true,
        sortOrder: 3,
      },
      {
        categoryId: catCoffee.id,
        nameTh: 'ซอลต์เต็ดบลูโคโคนัท',
        nameEn: 'Salted Blue Coconut',
        tag: 'signature',
        priceThb: null,
        available: true,
        published: true,
        sortOrder: 4,
      },
    ],
  });

  // 5. Workshops
  const today = new Date();
  const w1 = await prisma.workshop.create({
    data: {
      nameTh: 'สโนว์โกลบ (รวมเครื่องดื่ม 2 แก้ว)',
      nameEn: 'Snow Globe',
      priceThb: 2590,
      duration: 120,
    },
  });
  const w2 = await prisma.workshop.create({
    data: {
      nameTh: 'มาร์บลิ่งอาร์ต',
      nameEn: 'Marbling Art',
      priceThb: 550,
      duration: 60,
    },
  });
  const w3 = await prisma.workshop.create({
    data: {
      nameTh: 'เทอราเรียมอาร์ต / เรซิน',
      nameEn: 'Terrarium Art / Resin',
      priceThb: 1290,
      duration: 90,
    },
  });

  // Create slots for tomorrow 10:00, 13:00, 16:00
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const times = [10, 13, 16];
  for (const w of [w1, w2, w3]) {
    for (const hour of times) {
      const startsAt = new Date(tomorrow);
      startsAt.setHours(hour);
      await prisma.workshopSlot.create({
        data: {
          workshopId: w.id,
          startsAt,
          capacity: 10,
        },
      });
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
