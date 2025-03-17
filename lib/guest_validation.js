export const validateGuest = (data) => {
    const errors = {};
     
    // Validate partner_name (required, max 100 chars)
    // if (!data.name) {
    //   errors.name = 'Partner name is required';
    // } else if (data.name.length > 100) {
    //   errors.name = 'Partner name must be 100 characters or less';
    // }

    
    // Validate owner (required, max 255 chars)
    // if (!data.owner) {
    //   errors.owner = 'Owner is required';
    // } else if (data.owner.length > 255) {
    //   errors.owner = 'Owner must be 255 characters or less';
    // }
    
    // Optional fields validation
    // if (data.p_link && data.p_link.length > 255) {
    //   errors.p_link = 'Partner link must be 255 characters or less';
    // }
    
    // if (data.p_gmap && data.p_gmap.length > 255) {
    //   errors.p_gmap = 'Google Maps link must be 255 characters or less';
    // }
    
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