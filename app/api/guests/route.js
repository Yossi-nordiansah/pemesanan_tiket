import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req) {
    const formData = await req.formData();
    console.log("Received FormData:", formData);
    const name = formData.get('name');
    const event = formData.get('event');
    const detail_guest = formData.get('detail_guest');
    const logo = formData.get('logo');
    const image = formData.get('image');

    if (!name || !event || !detail_guest || !logo || !image) {
        return NextResponse.json({ error: 'Semua field harus diisi' }, { status: 400 });
    }

    const logoPath = `/public/admin/guest/logo/${logo.name}`;
    const imagePath = `/public/admin/guest/image/${image.name}`;

    await writeFile(path.join(process.cwd(), logoPath), Buffer.from(await logo.arrayBuffer()));
    await writeFile(path.join(process.cwd(), imagePath), Buffer.from(await image.arrayBuffer()));

    const guest = await prisma.guests.create({
        data: { name, event, detail_guest, logo: logoPath, image: imagePath },
    });

    return NextResponse.json(guest, { status: 201 });
}

export async function GET() {
    try {
        console.log("Fetching guests from database...");

        const guests = await prisma.guests.findMany({
            orderBy: { createdAt: "desc" }
        });

        console.log("Fetched Guests:", guests); // Log hasil dari database

        if (!guests || guests.length === 0) {
            console.warn("Database is empty or returned null.");
            return NextResponse.json([], { status: 200 });
        }

        return NextResponse.json(guests, { status: 200 });
    } catch (error) {
        console.error("Error fetching guests:", error);

        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}