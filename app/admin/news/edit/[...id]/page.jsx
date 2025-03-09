import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import NewsForm from '@/app/_components/admin/NewsForm';

export async function generateMetadata({ params }) {
  const { id } = params;
  const news = await prisma.news.findUnique({
    where: { id: parseInt(id) },
  });

  if (!news) {
    return {
      title: 'News Article Not Found',
    };
  }

  return {
    title: `Edit: ${news.head_news}`,
    description: `Edit news article: ${news.head_news}`,
  };
}

export default async function EditNewsPage({ params }) {
  const { id } = params;
  const news = await prisma.news.findUnique({
    where: { id: parseInt(id) },
  });

  if (!news) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Edit News Article</h1>
        <NewsForm news={news} />
      </div>
    </div>
  );
}