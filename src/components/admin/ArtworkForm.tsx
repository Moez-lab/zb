'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Upload, X, Loader2, Save } from 'lucide-react';
import { ART_CATEGORIES, FRAMING_OPTIONS, SIZE_UNITS } from '@/types';
import type { Artwork } from '@/types';

interface ArtworkFormProps {
  artwork?: Partial<Artwork>;
  mode: 'create' | 'edit';
}

export default function ArtworkForm({ artwork, mode }: ArtworkFormProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: artwork?.title || '',
    category: artwork?.category || 'Abstract',
    price: artwork?.price?.toString() || '',
    medium: artwork?.medium || '',
    width: artwork?.width?.toString() || '',
    height: artwork?.height?.toString() || '',
    unit: artwork?.unit || 'inches',
    framing: artwork?.framing || 'Unframed',
    description: artwork?.description || '',
    imageUrl: artwork?.imageUrl || '',
    imagePublicId: artwork?.imagePublicId || '',
    customWork: artwork?.customWork ?? true,
    featured: artwork?.featured ?? false,
    available: artwork?.available ?? true,
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'artworks');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Upload failed');
      }

      const { url, publicId } = await res.json();
      setForm((f) => ({ ...f, imageUrl: url, imagePublicId: publicId }));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      ...form,
      price: parseFloat(form.price),
      width: parseFloat(form.width),
      height: parseFloat(form.height),
    };

    try {
      const url = mode === 'create'
        ? '/api/artworks'
        : `/api/artworks/${artwork?.id}`;

      const res = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Save failed');
      }

      router.push('/admin/dashboard/artworks');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed');
      setSaving(false);
    }
  };

  const Field = ({
    label,
    children,
    required,
  }: {
    label: string;
    children: React.ReactNode;
    required?: boolean;
  }) => (
    <div>
      <label
        className="block text-[11px] tracking-[0.15em] uppercase mb-2"
        style={{ color: 'var(--color-stone)' }}
      >
        {label} {required && <span style={{ color: 'var(--color-gold)' }}>*</span>}
      </label>
      {children}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image upload */}
      <Field label="Artwork Image" required>
        <div
          className="relative rounded-xl overflow-hidden cursor-pointer group"
          style={{
            border: '2px dashed rgba(201,168,76,0.3)',
            background: 'rgba(255,255,255,0.02)',
          }}
          onClick={() => fileRef.current?.click()}
        >
          {form.imageUrl ? (
            <div className="relative" style={{ aspectRatio: '16/9' }}>
              <Image
                src={form.imageUrl}
                alt="Artwork preview"
                fill
                className="object-contain"
                sizes="800px"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-sm text-white">Click to change image</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              {uploading ? (
                <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-gold)' }} />
              ) : (
                <Upload size={32} style={{ color: 'var(--color-stone)' }} />
              )}
              <div className="text-center">
                <p className="text-sm" style={{ color: 'var(--color-stone-light)' }}>
                  {uploading ? 'Uploading...' : 'Click to upload image'}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-stone)' }}>
                  JPEG, PNG, or WebP — max 10MB
                </p>
              </div>
            </div>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleImageUpload}
        />
        {form.imageUrl && (
          <button
            type="button"
            onClick={() => setForm((f) => ({ ...f, imageUrl: '', imagePublicId: '' }))}
            className="flex items-center gap-1 text-xs mt-2 transition-colors hover:text-red-400"
            style={{ color: 'var(--color-stone)' }}
          >
            <X size={12} /> Remove image
          </button>
        )}
      </Field>

      {/* Title */}
      <Field label="Title" required>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className="admin-input"
          placeholder="e.g. Whispers of the Tide"
          required
        />
      </Field>

      {/* Category + Medium */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Category" required>
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="admin-input"
            required
          >
            {ART_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </Field>

        <Field label="Medium" required>
          <input
            type="text"
            value={form.medium}
            onChange={(e) => setForm((f) => ({ ...f, medium: e.target.value }))}
            className="admin-input"
            placeholder="e.g. Oil on Canvas"
            required
          />
        </Field>
      </div>

      {/* Price */}
      <Field label="Price (USD)" required>
        <div className="relative">
          <span
            className="absolute left-4 top-1/2 -translate-y-1/2 text-sm"
            style={{ color: 'var(--color-stone)' }}
          >
            $
          </span>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            className="admin-input pl-8"
            placeholder="2400"
            min="0"
            step="0.01"
            required
          />
        </div>
      </Field>

      {/* Size */}
      <div className="grid grid-cols-3 gap-4">
        <Field label="Width" required>
          <input
            type="number"
            value={form.width}
            onChange={(e) => setForm((f) => ({ ...f, width: e.target.value }))}
            className="admin-input"
            placeholder="36"
            min="0"
            step="0.01"
            required
          />
        </Field>
        <Field label="Height" required>
          <input
            type="number"
            value={form.height}
            onChange={(e) => setForm((f) => ({ ...f, height: e.target.value }))}
            className="admin-input"
            placeholder="48"
            min="0"
            step="0.01"
            required
          />
        </Field>
        <Field label="Unit">
          <select
            value={form.unit}
            onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
            className="admin-input"
          >
            {SIZE_UNITS.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Framing */}
      <Field label="Framing" required>
        <select
          value={form.framing}
          onChange={(e) => setForm((f) => ({ ...f, framing: e.target.value }))}
          className="admin-input"
          required
        >
          {FRAMING_OPTIONS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </Field>

      {/* Description */}
      <Field label="Description" required>
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="admin-input"
          rows={8}
          placeholder="Describe this artwork — the process, materials, inspiration..."
          required
        />
        <p className="text-xs mt-1" style={{ color: 'var(--color-stone)' }}>
          Use blank lines to separate paragraphs.
        </p>
      </Field>

      {/* Checkboxes */}
      <div className="flex flex-wrap gap-6">
        {[
          { key: 'available', label: 'Available for sale' },
          { key: 'featured', label: 'Featured on homepage' },
          { key: 'customWork', label: 'Custom commission available' },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form[key as keyof typeof form] as boolean}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.checked }))}
              className="w-4 h-4 rounded accent-[#c9a84c]"
            />
            <span className="text-sm" style={{ color: 'var(--color-stone-light)' }}>
              {label}
            </span>
          </label>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div
          className="p-4 rounded-lg text-sm"
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            color: '#f87171',
          }}
        >
          {error}
        </div>
      )}

      {/* Submit */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={saving || uploading}
          className="btn-primary"
        >
          <span style={{ position: 'relative', zIndex: 1 }}>
            {saving ? 'Saving...' : mode === 'create' ? 'Create Artwork' : 'Save Changes'}
          </span>
          {saving ? (
            <Loader2 size={15} className="animate-spin" style={{ position: 'relative', zIndex: 1 }} />
          ) : (
            <Save size={15} style={{ position: 'relative', zIndex: 1 }} />
          )}
        </button>
        <a
          href="/admin/dashboard/artworks"
          className="btn-ghost"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
