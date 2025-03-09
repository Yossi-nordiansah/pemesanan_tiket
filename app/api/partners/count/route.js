import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const count = await prisma.partners.count();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error counting partners:', error);
    return NextResponse.json({ error: 'Failed to count partners' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}