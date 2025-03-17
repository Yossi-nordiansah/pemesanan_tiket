import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req, { params }) {
    const { id } = params;
    const { name, event, detail_guest } = await req.json();

    const guest = await prisma.guests.update({
        where: { id: Number(id) },
        data: { name, event, detail_guest },
    });

    return NextResponse.json(guest);
}

export async function DELETE(req, { params }) {
    const { id } = params;

    await prisma.guests.delete({ where: { id: Number(id) } });

    return NextResponse.json({ message: 'Guest deleted' });
}
