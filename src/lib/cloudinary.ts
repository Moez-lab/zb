import { v2 as cloudinary } from 'cloudinary';

// Configure once (server-side only — uses secret keys)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface UploadResult {
  url: string;
  publicId: string;
}

/**
 * Upload a file buffer to Cloudinary
 * @param buffer - File buffer
 * @param folder - Cloudinary folder ('artworks' or 'about')
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  folder: 'artworks' | 'about'
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `art-gallery/${folder}`,
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        max_bytes: 10 * 1024 * 1024, // 10MB max
        transformation: [
          { quality: 'auto:good', fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('No result from Cloudinary'));
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    uploadStream.end(buffer);
  });
}

/**
 * Delete an image from Cloudinary by its public ID
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId);
}
