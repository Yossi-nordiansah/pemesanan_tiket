import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';

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
    title: news.head_news,
    description: news.detail_news.substring(0, 160),
  };
}

export default async function NewsDetailPage({ params }) {
  const { id } = params;
  const news = await prisma.news.findUnique({
    where: { id: parseInt(id) },
  });

  if (!news) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <nav className="mb-8">
        <Link
          href="/admin/news"
          className="text-indigo-600 hover:text-indigo-900"
        >
          ← Back to News
        </Link>
      </nav>

      {news.header_image && (
        <div className="rounded-lg overflow-hidden mb-8">
          <img
            src={news.header_image}
            alt={news.head_news}
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      <div className="prose lg:prose-lg max-w-none">
        <h1>{news.head_news}</h1>
        
        <div className="text-gray-500 mb-8">
          Published on {format(new Date(news.date_publication), 'MMMM dd, yyyy')}
        </div>

        <div dangerouslySetInnerHTML={{ __html: news.detail_news.replace(/\n/g, '<br />') }} />

        {news.detail_image && (
          <div className="my-8">
            <img 
              src={news.detail_image} 
              alt="News detail" 
              className="rounded-lg max-w-full h-auto"
            />
          </div>
        )}
      </div>

      <div className="mt-8 flex space-x-4">
        <Link
          href={`/news/edit/${news.id}`}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Edit Article
        </Link>
      </div>
    </div>
  );
}