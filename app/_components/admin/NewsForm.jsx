'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import Image from 'next/image';

export default function NewsForm({ news = null }) {
  const router = useRouter();
  const isEditing = !!news;
  const headerImageRef = useRef(null);
  const detailImageRef = useRef(null);

  const [formData, setFormData] = useState({
    id_users: news?.id_users || 1, // Default to 1 or get from session
    head_news: news?.head_news || '',
    detail_news: news?.detail_news || '',
    date_publication: news?.date_publication 
      ? format(new Date(news.date_publication), 'yyyy-MM-dd') 
      : format(new Date(), 'yyyy-MM-dd'),
  });

  const [headerImage, setHeaderImage] = useState(null);
  const [detailImage, setDetailImage] = useState(null);
  const [headerImagePreview, setHeaderImagePreview] = useState(news?.header_image || '');
  const [detailImagePreview, setDetailImagePreview] = useState(news?.detail_image || '');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState('');

  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateImage = (file) => {
    if (!file) return true;
    
    if (!allowedImageTypes.includes(file.type)) {
      setImageError(`Invalid file type. Allowed types: JPG, PNG, GIF, WEBP`);
      return false;
    }
    
    if (file.size > maxFileSize) {
      setImageError(`File too large. Maximum size: 5MB`);
      return false;
    }
    
    setImageError('');
    return true;
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    if (!validateImage(file)) {
      e.target.value = '';
      return;
    }

    if (type === 'header') {
      setHeaderImage(file);
      setHeaderImagePreview(URL.createObjectURL(file));
    } else {
      setDetailImage(file);
      setDetailImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setImageError('');

    // Validate images
    if (headerImage && !validateImage(headerImage)) {
      setIsSubmitting(false);
      return;
    }
    
    if (detailImage && !validateImage(detailImage)) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Create FormData for file uploads
      const formDataWithFiles = new FormData();
      
      // Add text fields
      Object.keys(formData).forEach(key => {
        formDataWithFiles.append(key, formData[key]);
      });
      
      // Add files
      if (headerImage) {
        formDataWithFiles.append('headerImage', headerImage);
      } else if (news?.header_image) {
        // Keep the existing image path if editing and no new image is uploaded
        formDataWithFiles.append('header_image', news.header_image);
      }
      
      if (detailImage) {
        formDataWithFiles.append('detailImage', detailImage);
      } else if (news?.detail_image) {
        // Keep the existing image path if editing and no new image is uploaded
        formDataWithFiles.append('detail_image', news.detail_image);
      }

      const apiUrl = isEditing 
        ? `/api/news/${news.id}` 
        : '/api/news';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(apiUrl, {
        method,
        body: formDataWithFiles, // No Content-Type header as browser sets it with boundary for FormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save news');
      }

      router.push('/admin/news');
      router.refresh(); // Refresh the page data
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      if (headerImagePreview && headerImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(headerImagePreview);
      }
      if (detailImagePreview && detailImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(detailImagePreview);
      }
    };
  }, [headerImagePreview, detailImagePreview]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {imageError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{imageError}</span>
        </div>
      )}
      
      <div>
        <label htmlFor="head_news" className="block text-sm font-medium text-gray-700">
          Headline
        </label>
        <input
          type="text"
          id="head_news"
          name="head_news"
          value={formData.head_news}
          onChange={handleChange}
          required
          maxLength={100}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      
      <div>
        <label htmlFor="detail_news" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="detail_news"
          name="detail_news"
          rows="6"
          value={formData.detail_news}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      
      <div>
        <label htmlFor="date_publication" className="block text-sm font-medium text-gray-700">
          Publication Date
        </label>
        <input
          type="date"
          id="date_publication"
          name="date_publication"
          value={formData.date_publication}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      
      <div>
        <label htmlFor="header_image" className="block text-sm font-medium text-gray-700">
          Header Image
        </label>
        <div className="mt-1 flex items-center space-x-4">
          <input
            type="file"
            id="header_image"
            ref={headerImageRef}
            accept=".jpg,.jpeg,.png,.gif,.webp"
            onChange={(e) => handleImageChange(e, 'header')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={() => {
              setHeaderImage(null);
              setHeaderImagePreview('');
              if (headerImageRef.current) headerImageRef.current.value = '';
            }}
            className="px-2 py-1 bg-gray-200 rounded text-sm"
          >
            Clear
          </button>
        </div>
        {headerImagePreview && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Preview:</p>
            <div className="mt-1 relative w-full h-40 border border-gray-300 rounded-md overflow-hidden">
              <Image 
                src={headerImagePreview} 
                alt="Header image preview" 
                fill 
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Accepted formats: JPG, PNG, GIF, WEBP. Max size: 5MB
        </p>
      </div>
      
      <div>
        <label htmlFor="detail_image" className="block text-sm font-medium text-gray-700">
          Detail Image
        </label>
        <div className="mt-1 flex items-center space-x-4">
          <input
            type="file"
            id="detail_image"
            ref={detailImageRef}
            accept=".jpg,.jpeg,.png,.gif,.webp"
            onChange={(e) => handleImageChange(e, 'detail')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={() => {
              setDetailImage(null);
              setDetailImagePreview('');
              if (detailImageRef.current) detailImageRef.current.value = '';
            }}
            className="px-2 py-1 bg-gray-200 rounded text-sm"
          >
            Clear
          </button>
        </div>
        {detailImagePreview && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Preview:</p>
            <div className="mt-1 relative w-full h-40 border border-gray-300 rounded-md overflow-hidden">
              <Image 
                src={detailImagePreview} 
                alt="Detail image preview" 
                fill 
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Accepted formats: JPG, PNG, GIF, WEBP. Max size: 5MB
        </p>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}