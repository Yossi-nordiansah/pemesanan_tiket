import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';
import { validatePartner } from '@/lib/partner_validation';

export async function GET() {
  try {
    const partners = await prisma.partners.findMany({
      orderBy: {
        partner_name: 'asc'
      }
    });
    
    return NextResponse.json(partners);
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate partner data
    const { isValid, errors } = validatePartner(data);
    
    if (!isValid) {
      return NextResponse.json({ errors }, { status: 400 });
    }
    
    // Create new partner
    const partner = await prisma.partners.create({
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
    
    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    console.error('Error creating partner:', error);
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
  }
}