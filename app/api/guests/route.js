import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET() {
    try {
      const guests = await prisma.guests.findMany({
        orderBy: {
          name: 'asc',
        },
      });

      return NextResponse.json(Array.isArray(guests) ? guests : []);
    } catch (error) {
      console.error('Error fetching guests:', error);
      return NextResponse.json({ error: 'Failed to fetch guests' }, { status: 500 });
    }
  }

  export async function POST(req) {
    try {
        const formData = await req.formData();
        
        const name = formData.get('name');
        const event = formData.get('event');
        const detail_guest = formData.get('detail_guest');
        const logo = formData.get('logo');
        const image = formData.get('image');

        if (!name || !event || !detail_guest || !logo || !image) {
            return NextResponse.json({ error: 'Semua field harus diisi' }, { status: 400 });
        }

        if (!(logo instanceof File) || !(image instanceof File)) {
            return NextResponse.json({ error: 'File logo dan image tidak valid' }, { status: 400 });
        }

        const logoPath = `admin/guest/logo/${logo.name}`;
        const imagePath = `admin/guest/image/${image.name}`;

        const logoSavePath = path.join(process.cwd(), 'public', logoPath);
        const imageSavePath = path.join(process.cwd(), 'public', imagePath);

        await writeFile(logoSavePath, Buffer.from(await logo.arrayBuffer()));
        await writeFile(imageSavePath, Buffer.from(await image.arrayBuffer()));

        // Simpan ke database
        const guest = await prisma.guests.create({
            data: { 
                name, 
                event, 
                detail_guest, 
                logo: `/${logoPath}`, 
                image: `/${imagePath}`
            },
        });

        return NextResponse.json(guest, { status: 201 });

    } catch (error) {
        console.error("Error saving guest:", error);
        return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 });
    }
}