import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const count = await prisma.guests.count();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error counting guests:', error);
    return NextResponse.json({ error: 'Failed to count guests' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}