export interface Artwork {
  id: string;
  title: string;
  category: string;
  price: number;
  medium: string;
  width: number;
  height: number;
  unit: string;
  framing: string;
  description: string;
  imageUrl: string;
  imagePublicId: string;
  customWork: boolean;
  featured: boolean;
  available: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface About {
  id: string;
  name: string;
  title: string;
  bio: string;
  photoUrl: string;
  photoPublicId: string;
  instagram: string;
  email: string;
  updatedAt: Date | string;
}

export interface Inquiry {
  id: string;
  artworkId: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: Date | string;
}

export interface ApiError {
  error: string;
  details?: unknown;
}

export type ApiResponse<T> = T | ApiError;

export const ART_CATEGORIES = [
  'Abstract',
  'Realism',
  'Impressionism',
  'Contemporary',
  'Landscape',
  'Portrait',
  'Still Life',
  'Mixed Media',
  'Watercolor',
  'Photography',
  'Sculpture',
  'Digital Art',
] as const;

export const FRAMING_OPTIONS = [
  'Unframed',
  'White frame',
  'Black frame',
  'Natural wood frame',
  'Gold frame',
  'Silver frame',
  'Floater frame',
] as const;

export const SIZE_UNITS = ['inches', 'cm'] as const;
