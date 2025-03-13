"use client";

import NewsForm from '@/app/_components/admin/NewsForm';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function CreateNewsPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white border border-gray-200 rounded-2xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <header className="flex items-center justify-between mb-8">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-900 dark:text-gray-100 hover:text-blue-500"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Create News Article
        </h1>
      </header>
      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
        <NewsForm />
      </div>
    </div>
  );
}
