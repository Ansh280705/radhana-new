import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sizes = searchParams.get('sizes')?.split(',').filter(Boolean);
    const colors = searchParams.get('colors')?.split(',').filter(Boolean);
    const sort = searchParams.get('sort') || 'createdAt_desc';
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const newArrival = searchParams.get('newArrival');

    const where: any = {};
    if (category) where.category = { slug: category };
    if (brand) where.brand = brand;
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }
    if (sizes?.length) where.sizes = { hasSome: sizes };
    if (colors?.length) where.colors = { hasSome: colors };
    if (search) where.name = { contains: search, mode: 'insensitive' };
    if (featured === 'true') where.isFeatured = true;
    if (newArrival === 'true') where.isNewArrival = true;

    const sortMap: any = {
      price_asc: { price: 'asc' },
      price_desc: { price: 'desc' },
      rating_desc: { rating: 'desc' },
      createdAt_desc: { createdAt: 'desc' },
    };
    const orderBy = sortMap[sort] || { createdAt: 'desc' };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: { select: { name: true, slug: true } } },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Products GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { authenticateRequest, requireAdmin } = await import('@/lib/auth');
    const user = requireAdmin(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await req.json();
    const slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now();
    const product = await prisma.product.create({
      data: { ...data, slug },
      include: { category: true },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Products POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
