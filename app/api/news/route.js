import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

// GET all news
export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        date_publication: 'desc',
      },
    });
    
    return NextResponse.json(news);
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json({ error: 'Error fetching news' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const id_users = formData.get('id_users');
    const head_news = formData.get('head_news');
    const detail_news = formData.get('detail_news');
    const date_publication = formData.get('date_publication');
    const headerImageFile = formData.get('headerImage');
    const detailImageFile = formData.get('detailImage');

    // Validate required fields
    if (!head_news || !detail_news || !date_publication || !id_users) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let header_image = null;
    let detail_image = null;

    // Process header image if provided
    if (headerImageFile && headerImageFile instanceof File) {
      const headerImagePath = await saveImage(headerImageFile, 'header');
      header_image = headerImagePath;
    }

    // Process detail image if provided
    if (detailImageFile && detailImageFile instanceof File) {
      const detailImagePath = await saveImage(detailImageFile, 'detail');
      detail_image = detailImagePath;
    }

    // Create the news item in the database
    const news = await prisma.news.create({
      data: {
        head_news,
        detail_news,
        date_publication: new Date(date_publication),
        header_image,
        detail_image,
        user: {
          connect: { id: parseInt(id_users) }
        }
      },
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      { error: 'Failed to create news item' },
      { status: 500 }
    );
  }
}

// Helper function to save image
async function saveImage(file, type) {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const fileName = `${uuidv4()}_${file.name.replace(/\s+/g, '_')}`;
    
    // Create directory path
    const dirPath = join(process.cwd(), 'public', 'admin', 'news', type);
    
    // Ensure directory exists
    await mkdir(dirPath, { recursive: true });
    
    // Full path for file
    const filePath = join(dirPath, fileName);
    
    // Write file
    await writeFile(filePath, buffer);
    
    // Return relative path for database
    return `/admin/news/${type}/${fileName}`;
  } catch (error) {
    console.error(`Error saving ${type} image:`, error);
    throw error;
  }
}