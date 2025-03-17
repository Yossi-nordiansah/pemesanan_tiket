export const validatePartner = (data) => {
    const errors = {};
    
    // Validate partner_name (required, max 100 chars)
    if (!data.partner_name) {
      errors.partner_name = 'Partner name is required';
    } else if (data.partner_name.length > 100) {
      errors.partner_name = 'Partner name must be 100 characters or less';
    }
    
    // Validate ref_code (required, max 20 chars)
    if (!data.ref_code) {
      errors.ref_code = 'Reference code is required';
    } else if (data.ref_code.length > 20) {
      errors.ref_code = 'Reference code must be 20 characters or less';
    }
    
    // Validate disc (required, must be a number)
    if (data.disc === undefined || data.disc === null) {
      errors.disc = 'Discount is required';
    } else if (isNaN(parseFloat(data.disc))) {
      errors.disc = 'Discount must be a number';
    }
    
    // Validate owner (required, max 255 chars)
    if (!data.owner) { 
      errors.owner = 'Owner is required';
    } else if (data.owner.length > 255) {
      errors.owner = 'Owner must be 255 characters or less';
    }
    
    // Optional fields validation
    if (data.p_link && data.p_link.length > 255) {
      errors.p_link = 'Partner link must be 255 characters or less';
    }
    
    if (data.p_gmap && data.p_gmap.length > 255) {
      errors.p_gmap = 'Google Maps link must be 255 characters or less';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  export const validateImage = (file) => {
    const errors = {};
    
    // Check if file exists
    if (!file) {
      errors.file = 'No file uploaded';
      return { isValid: false, errors };
    }
    
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      errors.fileType = 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed';
    }
    
    // Check file size (2MB max)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      errors.fileSize = 'File size exceeds 2MB limit';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };