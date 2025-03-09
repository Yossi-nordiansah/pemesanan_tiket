// app/api/news/[id]/route.js
import { NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { existsSync } from 'fs';

// GET news by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const news = await prisma.news.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    
    if (!news) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 });
    }
    
    return NextResponse.json(news);
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json({ error: 'Error fetching news' }, { status: 500 });
  }
}

// PUT update news
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Invalid news ID' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const id_users = formData.get('id_users');
    const head_news = formData.get('head_news');
    const detail_news = formData.get('detail_news');
    const date_publication = formData.get('date_publication');
    const headerImageFile = formData.get('headerImage');
    const detailImageFile = formData.get('detailImage');
    
    // Get existing record
    const existingNews = await prisma.news.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingNews) {
      return NextResponse.json(
        { error: 'News item not found' },
        { status: 404 }
      );
    }

    // Initialize with existing image paths
    let header_image = formData.get('header_image') || existingNews.header_image;
    let detail_image = formData.get('detail_image') || existingNews.detail_image;

    // Process header image if a new one is provided
    if (headerImageFile && headerImageFile instanceof File) {
      // Delete old file if it exists
      if (existingNews.header_image) {
        await deleteImage(existingNews.header_image);
      }
      
      // Save new file
      const headerImagePath = await saveImage(headerImageFile, 'header');
      header_image = headerImagePath;
    }

    // Process detail image if a new one is provided
    if (detailImageFile && detailImageFile instanceof File) {
      // Delete old file if it exists
      if (existingNews.detail_image) {
        await deleteImage(existingNews.detail_image);
      }
      
      // Save new file
      const detailImagePath = await saveImage(detailImageFile, 'detail');
      detail_image = detailImagePath;
    }

    // Update the news item in the database
    const news = await prisma.news.update({
      where: { id: parseInt(id) },
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

    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json(
      { error: 'Failed to update news item' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Invalid news ID' },
        { status: 400 }
      );
    }

    // Get existing record to get image paths
    const existingNews = await prisma.news.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingNews) {
      return NextResponse.json(
        { error: 'News item not found' },
        { status: 404 }
      );
    }

    // Delete images if they exist
    if (existingNews.header_image) {
      await deleteImage(existingNews.header_image);
    }
    
    if (existingNews.detail_image) {
      await deleteImage(existingNews.detail_image);
    }

    // Delete the news item from the database
    await prisma.news.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json(
      { error: 'Failed to delete news item' },
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

// Helper function to delete image
async function deleteImage(imagePath) {
  try {
    if (!imagePath) return;
    
    // Get absolute path
    const fullPath = join(process.cwd(), 'public', imagePath);
    
    // Check if file exists before attempting to delete
    if (existsSync(fullPath)) {
      await unlink(fullPath);
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    // Continue execution even if image deletion fails
  }
}