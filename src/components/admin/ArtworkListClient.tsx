'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import type { Artwork } from '@/types';

interface ArtworkListClientProps {
  artworks: Artwork[];
}

export default function ArtworkListClient({ artworks: initial }: ArtworkListClientProps) {
  const [artworks, setArtworks] = useState(initial);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This action cannot be undone.`)) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/artworks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setArtworks((prev) => prev.filter((a) => a.id !== id));
      router.refresh();
    } catch {
      alert('Failed to delete artwork. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="font-display text-3xl font-light"
            style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--color-cream)' }}
          >
            Artworks
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-stone)' }}>
            {artworks.length} {artworks.length === 1 ? 'work' : 'works'} in collection
          </p>
        </div>
        <Link href="/admin/dashboard/artworks/new" className="btn-primary">
          <span style={{ position: 'relative', zIndex: 1 }}>Add New</span>
          <Plus size={15} style={{ position: 'relative', zIndex: 1 }} />
        </Link>
      </div>

      {/* Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'var(--color-charcoal-soft)' }}
      >
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['', 'Title', 'Category', 'Price', 'Size', 'Status', 'Actions'].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-[10px] tracking-[0.15em] uppercase"
                  style={{ color: 'var(--color-stone)' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {artworks.map((artwork, i) => (
              <tr
                key={artwork.id}
                style={{
                  borderBottom: i < artworks.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}
                className="hover:bg-[rgba(255,255,255,0.02)] transition-colors"
              >
                {/* Thumbnail */}
                <td className="pl-4 py-3 w-12">
                  <div className="relative w-10 h-10 rounded-md overflow-hidden">
                    <Image
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                </td>

                <td className="px-4 py-3">
                  <p className="text-sm font-medium" style={{ color: 'var(--color-cream)' }}>
                    {artwork.title}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-stone)' }}>
                    {artwork.medium}
                  </p>
                </td>

                <td className="px-4 py-3">
                  <span className="badge-category text-[10px]">{artwork.category}</span>
                </td>

                <td className="px-4 py-3 text-sm" style={{ color: 'var(--color-gold)' }}>
                  ${artwork.price.toLocaleString()}
                </td>

                <td className="px-4 py-3 text-xs" style={{ color: 'var(--color-stone-light)' }}>
                  {artwork.width} × {artwork.height} {artwork.unit}
                </td>

                <td className="px-4 py-3">
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      background: artwork.available ? 'rgba(74,222,128,0.1)' : 'rgba(239,68,68,0.1)',
                      color: artwork.available ? '#4ade80' : '#f87171',
                    }}
                  >
                    {artwork.available ? 'Available' : 'Sold'}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/artwork/${artwork.id}`}
                      target="_blank"
                      className="p-1.5 rounded transition-colors hover:bg-[rgba(255,255,255,0.06)]"
                      style={{ color: 'var(--color-stone)' }}
                      title="View on site"
                    >
                      <Eye size={15} />
                    </Link>
                    <Link
                      href={`/admin/dashboard/artworks/${artwork.id}/edit`}
                      className="p-1.5 rounded transition-colors hover:bg-[rgba(201,168,76,0.1)]"
                      style={{ color: 'var(--color-gold)' }}
                      title="Edit"
                    >
                      <Edit size={15} />
                    </Link>
                    <button
                      onClick={() => handleDelete(artwork.id, artwork.title)}
                      disabled={deleting === artwork.id}
                      className="p-1.5 rounded transition-colors hover:bg-[rgba(239,68,68,0.1)]"
                      style={{ color: '#f87171' }}
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {artworks.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center">
                  <p className="text-sm mb-3" style={{ color: 'var(--color-stone)' }}>
                    No artworks yet
                  </p>
                  <Link href="/admin/dashboard/artworks/new" className="btn-outline-gold">
                    Add Your First Artwork
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
