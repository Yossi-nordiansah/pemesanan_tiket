import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { referralCode, ticketPrice } = body;

    const referral = await prisma.referrals.findFirst({
      where: {
        code: referralCode // (collate = utf8mb4_bin)
      }
    });

    if (!referral) {
      return new Response(JSON.stringify({
        valid: false,
        message: 'Referral code not found.',
        finalPrice: ticketPrice
      }), { status: 200 });
    }

    const discount = referral.discount_percentage;
    const discountAmount = (ticketPrice * discount) / 100;
    const finalPrice = ticketPrice - discountAmount;

    return new Response(JSON.stringify({
      valid: true,
      discount,
      message: `Referral applied. Discount ${discount}%`,
      finalPrice
    }), { status: 200 });

  } catch (error) {
    console.error('Error validating referral:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error'
    }), { status: 500 });
  }
}

