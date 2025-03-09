import DeleteButton from '@/app/_components/admin/DeleteButton';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';

export default async function NewsListPage() {
  const news = await prisma.news.findMany({
    orderBy: { date_publication: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">News Articles</h1>
          <Link
            href="/admin/news/create"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add News
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {news.length === 0 ? (
            <div className="px-4 py-5 sm:p-6 text-center text-gray-500">
              No news articles found. Add one to get started!
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {news.map((article) => (
                <li key={article.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {article.header_image && (
                          <div className="flex-shrink-0 h-12 w-12 mr-3">
                            <img
                              className="h-12 w-12 rounded-md object-cover"
                              src={article.header_image}
                              alt={article.head_news}
                            />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-indigo-600 truncate">
                            {article.head_news}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            Published: {format(new Date(article.date_publication), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/news/${article.id}`}
                          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/news/edit/${article.id}`}
                          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Edit
                        </Link>
                        <DeleteButton id={article.id} title={article.head_news} />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}