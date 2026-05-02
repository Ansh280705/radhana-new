const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Savaria Fashion database...');

  // 1. Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@savaria.fashion' },
    update: {},
    create: {
      name: 'Savaria Admin',
      email: 'admin@savaria.fashion',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created: admin@savaria.fashion / admin123');

  // 2. Create Categories
  const categories = [
    { name: 'Women', slug: 'women', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800' },
    { name: 'Men', slug: 'men', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800' },
    { name: 'Ethnic Wear', slug: 'ethnic-wear', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800' },
    { name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800' },
  ];

  const createdCategories = [];
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { image: cat.image },
      create: cat,
    });
    createdCategories.push(created);
  }
  console.log(`✅ ${createdCategories.length} categories created`);

  // 3. Create Sample Products
  const products = [
    {
      name: 'Premium Silk Embroidered Kurta',
      description: 'Handcrafted silk kurta with intricate embroidery on the neckline and sleeves. Perfect for festive occasions.',
      price: 4999,
      comparePrice: 6999,
      images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800'],
      categoryId: createdCategories.find(c => c.slug === 'ethnic-wear').id,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Maroon', 'Gold'],
      brand: 'Savaria Heritage',
      stock: 50,
      isFeatured: true,
      isNewArrival: true,
      slug: 'silk-embroidered-kurta-' + Date.now(),
    },
    {
      name: 'Elegant Evening Floral Dress',
      description: 'Lightweight chiffon dress with a delicate floral print and pleated skirt. Ideal for summer parties.',
      price: 2499,
      comparePrice: 3499,
      images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800'],
      categoryId: createdCategories.find(c => c.slug === 'women').id,
      sizes: ['XS', 'S', 'M'],
      colors: ['Blue', 'White'],
      brand: 'Savaria Women',
      stock: 30,
      isFeatured: true,
      isNewArrival: false,
      slug: 'evening-floral-dress-' + Date.now(),
    },
    {
      name: 'Classic Slim Fit Linen Shirt',
      description: 'Breathable linen shirt in a classic slim fit. Perfect for a sharp, casual look.',
      price: 1899,
      comparePrice: 2499,
      images: ['https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800'],
      categoryId: createdCategories.find(c => c.slug === 'men').id,
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['Beige', 'Navy'],
      brand: 'Savaria Men',
      stock: 100,
      isFeatured: false,
      isNewArrival: true,
      slug: 'slim-fit-linen-shirt-' + Date.now(),
    },
  ];

  for (const prod of products) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: prod,
    });
  }
  console.log(`✅ Sample products created`);

  // 4. Create Banners
  const banners = [
    {
      title: 'Summer Collection 2024',
      subtitle: 'Breezy styles for the sunny days ahead',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200',
      link: '/products?category=women',
      discount: 20,
      position: 1,
    },
    {
      title: 'Heritage Festive Sale',
      subtitle: 'Celebrate tradition with 30% off on all ethnic wear',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200',
      link: '/products?category=ethnic-wear',
      discount: 30,
      position: 2,
    }
  ];

  for (const b of banners) {
    await prisma.banner.create({ data: b });
  }
  console.log('✅ Promotional banners created');

  console.log('✨ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
