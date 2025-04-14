import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer';
import { readFile } from 'fs/promises';
const prisma = new PrismaClient();

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT
});

export async function POST(req) {
  try {
    const { id, buyer, waNumber, email, productName, price, quantity, referralCode, idProduct } = await req.json();

    const transaction = await prisma.transactions.create({
      data: {
        id: id,
        name: buyer, 
        email: email,
        whatsapp: waNumber,
        ticket_id: idProduct,
        referral_code: referralCode || null,
        price: price,
        qr_code: null,
        status: 'Pending',
        purchase_time: new Date(),
      },
    })

    await prisma.tickets.update({
      where: { id: idProduct },
      data: {
        remaining_tickets: {
          decrement: 1
        }
      }
    });

    const parameter = {
      transaction_details: {
        order_id: id,
        gross_amount: price * quantity
      },
      item_details: [
        {
          id: id,
          price: price,
          quantity: quantity,
          name: productName,
        }
      ],
      customer_details: {
        first_name: buyer,
        email: email,
        phone: waNumber
      }
    };
    const token = await snap.createTransactionToken(parameter);
    return NextResponse.json({ token }, { status: 200 });
  } catch (err) {
    console.error('Midtrans error:', err.message);
    return NextResponse.json({ message: 'Midtrans error', error: err.message }, { status: 400 });
  }
}

