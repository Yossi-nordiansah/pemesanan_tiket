'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PartnerForm({ partner = null }) {
  const router = useRouter();
  const isEditMode = !!partner;

  const [formData, setFormData] = useState({
    partner_name: '',
    logo: '',
    ref_code: '',
    disc: '',
    p_link: '',
    p_gmap: '',
    owner: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [isGmapValid, setIsGmapValid] = useState(true);
  const [submitError, setSubmitError] = useState('');

  // Initialize form data if in edit mode
  useEffect(() => {
    if (isEditMode && partner) {
      setFormData({
        partner_name: partner.partner_name || '',
        logo: partner.logo || '',
        ref_code: partner.ref_code || '',
        disc: partner.disc?.toString() || '',
        p_link: partner.p_link || '',
        p_gmap: partner.p_gmap || '',
        owner: partner.owner || '',
      });

      if (partner.logo) {
        setLogoPreview(`/admin/partner/logo/${partner.logo}`);
      }
    }
  }, [isEditMode, partner]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.partner_name.trim()) {
      newErrors.partner_name = 'Partner name is required';
    }

    if (!formData.ref_code.trim()) {
      newErrors.ref_code = 'Reference code is required';
    }

    if (!formData.disc) {
      newErrors.disc = 'Discount is required';
    } else if (isNaN(parseFloat(formData.disc))) {
      newErrors.disc = 'Discount must be a number';
    }

    if (!formData.owner.trim()) {
      newErrors.owner = 'Owner is required';
    }

    if (formData.p_gmap && !isGmapValid) {
      newErrors.p_gmap = 'Invalid Google Maps link';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        logo: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed',
      }));
      return;
    }

    // Validate file size (2MB max)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        logo: 'File size exceeds 2MB limit',
      }));
      return;
    }

    // Preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
    
    setLogoFile(file);
    setErrors((prev) => ({ ...prev, logo: '' }));
  };

  const validateGmapLink = async () => {
    if (!formData.p_gmap) return true;

    try {
      const response = await fetch('/api/partners/validate-gmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: formData.p_gmap }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        setFormData((prev) => ({ ...prev, p_gmap: data.formattedUrl }));
        setIsGmapValid(true);
        setErrors((prev) => ({ ...prev, p_gmap: '' }));
        return true;
      } else {
        setIsGmapValid(false);
        setErrors((prev) => ({ ...prev, p_gmap: data.error || 'Invalid Google Maps link' }));
        return false;
      }
    } catch (error) {
      setIsGmapValid(false);
      setErrors((prev) => ({ ...prev, p_gmap: 'Error validating link' }));
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) return;

    // Validate Google Maps link if provided
    if (formData.p_gmap) {
      const isGmapLinkValid = await validateGmapLink();
      if (!isGmapLinkValid) return;
    }

    setIsSubmitting(true);

    try {
      // Upload logo if a new one is selected
      let logoPath = formData.logo;
      if (logoFile) {
        const logoFormData = new FormData();
        logoFormData.append('file', logoFile);

        const logoResponse = await fetch('/api/partners/upload', {
          method: 'POST',
          body: logoFormData,
        });

        if (!logoResponse.ok) {
          throw new Error('Failed to upload logo');
        }

        const logoData = await logoResponse.json();
        logoPath = logoData.filename;
      }

      // Prepare data for API
      const apiData = {
        ...formData,
        logo: logoPath,
        disc: parseFloat(formData.disc),
      };

      // Create or update partner
      const url = isEditMode 
        ? `/api/partners/${partner.id}` 
        : '/api/partners';
      
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save partner');
      }

      // Redirect to partners list on success
      router.push('/admin/partners');
      router.refresh();
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
      {submitError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {submitError}
        </div>
      )}

      {/* Partner Name */}
      <div className="mb-4">
        <label htmlFor="partner_name" className="block mb-1 font-medium">
          Partner Name <span className="text-red-500">*</span>
        </label>
        <input
          id="partner_name"
          name="partner_name"
          type="text"
          value={formData.partner_name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.partner_name ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {errors.partner_name && (
          <p className="mt-1 text-sm text-red-500">{errors.partner_name}</p>
        )}
      </div>

      {/* Logo */}
      <div className="mb-4">
        <label htmlFor="logo" className="block mb-1 font-medium">
          Logo
        </label>
        <div className="flex items-center space-x-4">
          {logoPreview && (
            <div className="relative w-16 h-16 border rounded overflow-hidden">
              <Image
                src={logoPreview}
                alt="Logo preview"
                fill
                className="object-contain"
              />
            </div>
          )}
          <input
            id="logo"
            name="logo"
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleLogoChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
          />
        </div>
        {errors.logo && (
          <p className="mt-1 text-sm text-red-500">{errors.logo}</p>
        )}
      </div>

      {/* Reference Code */}
      <div className="mb-4">
        <label htmlFor="ref_code" className="block mb-1 font-medium">
          Reference Code <span className="text-red-500">*</span>
        </label>
        <input
          id="ref_code"
          name="ref_code"
          type="text"
          value={formData.ref_code}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.ref_code ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {errors.ref_code && (
          <p className="mt-1 text-sm text-red-500">{errors.ref_code}</p>
        )}
      </div>

      {/* Discount */}
      <div className="mb-4">
        <label htmlFor="disc" className="block mb-1 font-medium">
          Discount (%) <span className="text-red-500">*</span>
        </label>
        <input
          id="disc"
          name="disc"
          type="number"
          step="0.01"
          value={formData.disc}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.disc ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {errors.disc && (
          <p className="mt-1 text-sm text-red-500">{errors.disc}</p>
        )}
      </div>

      {/* Partner Link */}
      <div className="mb-4">
        <label htmlFor="p_link" className="block mb-1 font-medium">
          Partner Link
        </label>
        <input
          id="p_link"
          name="p_link"
          type="url"
          value={formData.p_link}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
        />
      </div>

      {/* Google Maps Link */}
      <div className="mb-4">
        <label htmlFor="p_gmap" className="block mb-1 font-medium">
          Google Maps Link
        </label>
        <input
          id="p_gmap"
          name="p_gmap"
          type="url"
          value={formData.p_gmap}
          onChange={handleChange}
          onBlur={validateGmapLink}
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.p_gmap ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.p_gmap ? (
          <p className="mt-1 text-sm text-red-500">{errors.p_gmap}</p>
        ) : (
          formData.p_gmap && isGmapValid && (
            <p className="mt-1 text-sm text-green-500">Valid Google Maps link</p>
          )
        )}
      </div>

      {/* Owner */}
      <div className="mb-4">
        <label htmlFor="owner" className="block mb-1 font-medium">
          Owner <span className="text-red-500">*</span>
        </label>
        <input
          id="owner"
          name="owner"
          type="text"
          value={formData.owner}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.owner ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {errors.owner && (
          <p className="mt-1 text-sm text-red-500">{errors.owner}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={() => router.push('/admin/partners')}
          className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : isEditMode ? 'Update Partner' : 'Create Partner'}
        </button>
      </div>
    </form>
  );
}