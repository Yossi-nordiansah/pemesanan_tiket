import { NextResponse } from 'next/server';
import { formatGmapUrl } from '@/lib/utils';

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    const isValidGmapsUrl = /^(https?:\/\/)?(www\.)?(google\.com\/maps|maps\.app\.goo\.gl|goo\.gl\/maps)/.test(url);

    if (!isValidGmapsUrl) {
      return NextResponse.json({ error: 'Not a valid Google Maps URL' }, { status: 400 });
    }

    const formattedUrl = formatGmapUrl(url);

    return NextResponse.json({ 
      valid: true,
      formattedUrl
    });
  } catch (error) {
    console.error('Error validating Google Maps URL:', error);
    return NextResponse.json({ error: 'URL validation failed' }, { status: 500 });
  }
}