import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  export const saveFile = async (file, directory) => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    
    // Get file extension
    const originalName = file.name;
    const ext = path.extname(originalName);
    
    // Generate unique filename
    const filename = `${uuidv4()}${ext}`;
    const filepath = path.join(directory, filename);
    
    // Write file
    fs.writeFileSync(filepath, buffer);
    
    return filename;
  };
  
  export const deleteFile = (filepath) => {
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      return true;
    }
    return false;
  };
  
  export const formatGmapUrl = (url) => {
    try {
      const shortUrlPattern = /(maps\.app\.goo\.gl|goo\.gl\/maps)/;
      const placePattern = /place\/[^\/]+\/@([\-\d.]+),([\-\d.]+)/;
      const coordsPattern = /@([\-\d.]+),([\-\d.]+)/;
  
      if (shortUrlPattern.test(url)) {
        return url; // Short URL, return as is
      }
  
      const placeMatch = url.match(placePattern);
      if (placeMatch) {
        const [_, lat, lng] = placeMatch;
        return `https://www.google.com/maps?q=${lat},${lng}`;
      }
  
      const coordsMatch = url.match(coordsPattern);
      if (coordsMatch) {
        const [_, lat, lng] = coordsMatch;
        return `https://www.google.com/maps?q=${lat},${lng}`;
      }
  
      return url; // Return original if no pattern matched
    } catch (error) {
      console.error('Error formatting Google Maps URL:', error);
      return url; // Fallback to original URL
    }
  };