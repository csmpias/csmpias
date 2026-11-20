/**
 * Forces a Cloudinary-hosted image to a PDF-safe format (react-pdf only
 * decodes JPEG/PNG, not WebP/AVIF) and caps its size so large source
 * uploads don't blow up generation time or file size.
 */
export function pdfSafeImageUrl(url: string, width = 1000): string {
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/f_jpg,q_auto,w_${width},c_limit/`);
}
