import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { validatePartner } from '@/lib/partner_validation';
import { deleteFile } from '@/lib/utils';
import path from 'path';

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
    
    const partner = await prisma.partners.findUnique({
      where: { id }
    });
    
    if (!partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }
    
    return NextResponse.json(partner);
  } catch (error) {
    console.error('Error fetching partner:', error);
    return NextResponse.json({ error: 'Failed to fetch partner' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
    
    const data = await request.json();
    
    // Validate partner data
    const { isValid, errors } = validatePartner(data);
    
    if (!isValid) {
      return NextResponse.json({ errors }, { status: 400 });
    }
    
    // Update partner
    const updatedPartner = await prisma.partners.update({
      where: { id },
      data: {
        partner_name: data.partner_name,
        logo: data.logo || null,
        ref_code: data.ref_code,
        disc: parseFloat(data.disc),
        p_link: data.p_link || null,
        p_gmap: data.p_gmap || null,
        owner: data.owner
      }
    });
    
    return NextResponse.json(updatedPartner);
  } catch (error) {
    console.error('Error updating partner:', error);
    return NextResponse.json({ error: 'Failed to update partner' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
    
    // Find partner to get logo path
    const partner = await prisma.partners.findUnique({
      where: { id }
    });
    
    if (!partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }
    
    // Delete logo file if exists
    if (partner.logo) {
      const logoPath = path.join(process.cwd(), 'public', 'admin', 'partner', 'logo', partner.logo);
      deleteFile(logoPath);
    }
    
    // Delete partner record
    await prisma.partners.delete({
      where: { id }
    });
    
    return NextResponse.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Error deleting partner:', error);
    return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 });
  }
}