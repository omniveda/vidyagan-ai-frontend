// Utility function to get the correct PDF URL
export const getPdfUrl = (pdfPath) => {
  if (!pdfPath) return null;
  
  // If the path already includes the full backend URL, return as is
  if (pdfPath.startsWith('https://vidyagan-ai-server.onrender.com')) {
    return pdfPath;
  }
  
  // If it's just a path, prepend the backend URL
  if (pdfPath.startsWith('/uploads/')) {
    return `https://vidyagan-ai-server.onrender.com${pdfPath}`;
  }
  
  // If it's a relative path, construct the full URL
  return `https://vidyagan-ai-server.onrender.com/uploads/course-ebooks/${pdfPath}`;
};

// Function to check if a URL is a PDF
export const isPdfUrl = (url) => {
  return url && (url.includes('.pdf') || url.includes('/uploads/'));
}; 