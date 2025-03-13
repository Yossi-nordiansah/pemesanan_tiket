import { NextResponse } from 'next/server';
import { saveFile } from '@/lib/utils';
import { validateImage } from '@/lib/partner_validation';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    // Validate image
    const { isValid, errors } = validateImage(file);
    if (!isValid) {
      return NextResponse.json({ errors }, { status: 400 });
    }
    
    // Save file
    const uploadDir = path.join(process.cwd(), 'public', 'admin', 'partner', 'logo');
    const filename = await saveFile(file, uploadDir);
    
    return NextResponse.json({ 
      filename,
      url: `/admin/partner/logo/${filename}`
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}