import fs from "node:fs";
import path from "node:path";
import { v2 as cloudinary } from "cloudinary";

for (const line of fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf-8").split("\n")) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (match) process.env[match[1]] = match[2];
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const ROOT = "/home/user/csmp_ias";
const BACKUP_ROOT = path.join(ROOT, "csmpias_backup/csmpias.com");

const postImageMap: Record<string, string[]> = JSON.parse(
  fs.readFileSync(path.join(ROOT, "scripts/post-image-map.json"), "utf-8"),
);
const pagesImageMap: Record<string, string[]> = JSON.parse(
  fs.readFileSync(path.join(ROOT, "scripts/pages-image-map.json"), "utf-8"),
);

const pdfPaths = [
  "my_write/uploads/2026/03/UP-Special-_20260228_185616_0000.pdf",
  "my_write/uploads/2026/03/DOC-20260223-WA0012.pdf",
  "my_write/uploads/2026/03/UP-Special-_20260228_185445_0000.pdf",
  "my_write/uploads/2026/03/UP-Special-_20260228_185714_0000.pdf",
  "my_write/uploads/2026/02/UP-Special-_20260228_185714_0000.pdf",
];

type UploadResult = { secure_url: string; public_id: string };
const uploaded: Record<string, UploadResult> = {};

async function uploadOne(relPath: string, folder: string): Promise<UploadResult | null> {
  if (uploaded[relPath]) return uploaded[relPath];

  const localPath = path.join(BACKUP_ROOT, relPath);
  if (!fs.existsSync(localPath)) {
    console.warn(`SKIP (missing on disk): ${relPath}`);
    return null;
  }
  if (relPath.endsWith(".svg")) {
    console.warn(`SKIP (svg, not migrated): ${relPath}`);
    return null;
  }

  const baseName = path.basename(relPath).replace(/\.[^.]+$/, "");
  const publicId = `${folder}/${baseName}`.replace(/[^a-zA-Z0-9/_-]/g, "_");

  try {
    const result = await cloudinary.uploader.upload(localPath, {
      public_id: publicId,
      resource_type: "image",
      overwrite: false,
      unique_filename: false,
    });
    const record = { secure_url: result.secure_url, public_id: result.public_id };
    uploaded[relPath] = record;
    console.log(`OK  ${relPath} -> ${result.public_id}`);
    return record;
  } catch (err) {
    console.error(`FAIL ${relPath}:`, (err as Error).message);
    return null;
  }
}

async function main() {
  const postCovers: Record<string, UploadResult> = {};
  for (const [slug, images] of Object.entries(postImageMap)) {
    for (const img of images) {
      const result = await uploadOne(img, "csmp-ias/blog");
      if (result) {
        postCovers[slug] = result;
        break; // first successfully-uploaded image becomes the cover
      }
    }
  }

  const pageCovers: Record<string, UploadResult> = {};
  for (const [pageSlug, images] of Object.entries(pagesImageMap)) {
    for (const img of images) {
      const result = await uploadOne(img, "csmp-ias/site");
      if (result) {
        pageCovers[pageSlug] = result;
        break;
      }
    }
  }

  const pdfUploads: Record<string, UploadResult> = {};
  for (const pdf of pdfPaths) {
    const result = await uploadOne(pdf, "csmp-ias/resources/study-materials");
    if (result) pdfUploads[pdf] = result;
  }

  fs.writeFileSync(path.join(ROOT, "scripts/post-covers.json"), JSON.stringify(postCovers, null, 2));
  fs.writeFileSync(path.join(ROOT, "scripts/page-covers.json"), JSON.stringify(pageCovers, null, 2));
  fs.writeFileSync(path.join(ROOT, "scripts/pdf-uploads.json"), JSON.stringify(pdfUploads, null, 2));

  console.log(`\nDone. Posts with covers: ${Object.keys(postCovers).length}/${Object.keys(postImageMap).length}`);
  console.log(`Page images: ${Object.keys(pageCovers).length}/${Object.keys(pagesImageMap).length}`);
  console.log(`PDFs: ${Object.keys(pdfUploads).length}/${pdfPaths.length}`);
}

main();
