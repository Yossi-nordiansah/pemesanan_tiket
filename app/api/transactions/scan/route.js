import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { transactionId } = await request.json();
    
    if (!transactionId) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      );
    }
    
    // Find the transaction by ID
    const transaction = await prisma.transactions.findUnique({
      where: {
        id: transactionId
      }
    });
    
    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }
    
    // Update the transaction status to 'Scanned'
    const updatedTransaction = await prisma.transactions.update({
      where: {
        id: transactionId
      },
      data: {
        status: 'Scanned' // You may need to add this status to your schema enum
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Transaction scanned successfully',
      transaction: updatedTransaction
    });
  } catch (error) {
    console.error('Error scanning transaction:', error);
    return NextResponse.json(
      { error: 'Failed to scan transaction', details: error.message },
      { status: 500 }
    );
  }
}