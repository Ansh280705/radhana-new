import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { authenticateRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = authenticateRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const addresses = await prisma.address.findMany({ where: { userId: user.userId }, orderBy: { isDefault: 'desc' } });
    return NextResponse.json(addresses);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: 'Please log in to save an address' }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone, line1, line2, city, state, pincode, isDefault } = body;

    if (!name?.trim()) return NextResponse.json({ error: 'Full name is required' }, { status: 400 });
    if (!phone?.trim()) return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    if (!line1?.trim()) return NextResponse.json({ error: 'Address line 1 is required' }, { status: 400 });
    if (!city?.trim()) return NextResponse.json({ error: 'City is required' }, { status: 400 });
    if (!state?.trim()) return NextResponse.json({ error: 'State is required' }, { status: 400 });
    if (!pincode?.trim()) return NextResponse.json({ error: 'Pincode is required' }, { status: 400 });

    if (isDefault) {
      await prisma.address.updateMany({ where: { userId: user.userId }, data: { isDefault: false } });
    }

    const address = await prisma.address.create({
      data: {
        userId: user.userId,
        name: name.trim(),
        phone: phone.trim(),
        line1: line1.trim(),
        line2: line2?.trim() || null,
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
        isDefault: Boolean(isDefault),
      },
    });
    return NextResponse.json(address, { status: 201 });
  } catch (error) {
    console.error('Address POST error:', error);
    return NextResponse.json({ error: 'Failed to save address' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = authenticateRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await req.json();
    await prisma.address.deleteMany({ where: { id, userId: user.userId } });
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
