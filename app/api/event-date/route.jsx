import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET request: Ambil tanggal acara
export async function GET() {
  try {
    const event = await prisma.date.findFirst({
      select: {
        id: true,
        date: true
      }
    });

    if (!event) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    return new Response(JSON.stringify([event]), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Gagal mengambil data' }), { status: 500 });
  }
}

// Handle PUT request: Update tanggal acara
export async function PUT(req) {
  try {
    const { date } = await req.json();

    await prisma.date.update({
      where: { id: 1 }, // sesuaikan dengan ID acara kamu
      data: { date: new Date(date) }
    });

    return new Response(JSON.stringify({ message: 'Tanggal diperbarui' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Gagal memperbarui data' }), { status: 500 });
  }
}
