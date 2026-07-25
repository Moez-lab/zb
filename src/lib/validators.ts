import { z } from 'zod';

// Shared validation schemas used across API routes and forms

export const artworkSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  category: z.string().min(1, 'Category is required').max(100),
  price: z.coerce.number().positive('Price must be positive').max(9_999_999),
  medium: z.string().min(1, 'Medium is required').max(200),
  width: z.coerce.number().positive('Width must be positive').max(9999),
  height: z.coerce.number().positive('Height must be positive').max(9999),
  unit: z.enum(['inches', 'cm']).default('inches'),
  framing: z.string().min(1, 'Framing is required').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(5000),
  imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
  imagePublicId: z.string().optional().default(''),
  customWork: z.coerce.boolean().default(true),
  featured: z.coerce.boolean().default(false),
  available: z.coerce.boolean().default(true),
});

export const aboutSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  title: z.string().min(1, 'Title is required').max(100),
  bio: z.string().min(10, 'Bio must be at least 10 characters').max(5000),
  photoUrl: z.string().url('Invalid photo URL').optional().or(z.literal('')),
  photoPublicId: z.string().optional().default(''),
  instagram: z.string().max(100).optional().default(''),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
});

export const inquirySchema = z.object({
  artworkId: z.string().cuid('Invalid artwork ID'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  // Honeypot: must be empty (bots fill this)
  website: z.string().max(0, 'Honeypot triggered').optional(),
});

export type ArtworkInput = z.infer<typeof artworkSchema>;
export type AboutInput = z.infer<typeof aboutSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;
