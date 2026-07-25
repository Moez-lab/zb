'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Upload, Loader2, Save, CheckCircle } from 'lucide-react';
import type { About } from '@/types';

interface AboutFormProps {
  about?: Partial<About> | null;
}

export default function AboutForm({ about }: AboutFormProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: about?.name || '',
    title: about?.title || 'Contemporary Fine Artist',
    bio: about?.bio || '',
    photoUrl: about?.photoUrl || '',
    photoPublicId: about?.photoPublicId || '',
    instagram: about?.instagram || '',
    email: about?.email || '',
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'about');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Upload failed');
      }

      const { url, publicId } = await res.json();
      setForm((f) => ({ ...f, photoUrl: url, photoPublicId: publicId }));
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
    setSaved(false);

    try {
      const res = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Save failed');
      }

      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const Field = ({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) => (
    <div>
      <label className="block text-[11px] tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--color-stone)' }}>
        {label} {required && <span style={{ color: 'var(--color-gold)' }}>*</span>}
      </label>
      {children}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Photo upload */}
      <Field label="Profile Photo">
        <div className="flex items-start gap-6">
          {/* Preview */}
          <div
            className="relative w-32 h-32 rounded-xl overflow-hidden shrink-0 cursor-pointer group"
            style={{ border: '2px dashed rgba(201,168,76,0.3)', background: 'rgba(255,255,255,0.02)' }}
            onClick={() => fileRef.current?.click()}
          >
            {form.photoUrl ? (
              <>
                <Image src={form.photoUrl} alt="Profile" fill className="object-cover" sizes="128px" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload size={20} className="text-white" />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-2">
                {uploading ? (
                  <Loader2 size={24} className="animate-spin" style={{ color: 'var(--color-gold)' }} />
                ) : (
                  <Upload size={24} style={{ color: 'var(--color-stone)' }} />
                )}
              </div>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="btn-outline-gold text-xs py-2 px-4"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Photo'}
            </button>
            <p className="text-xs mt-2" style={{ color: 'var(--color-stone)' }}>
              JPEG, PNG, or WebP. Max 10MB.<br />
              Recommended: square or portrait ratio.
            </p>
            {form.photoUrl && (
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, photoUrl: '', photoPublicId: '' }))}
                className="text-xs mt-2 text-red-400 hover:text-red-300 transition-colors"
              >
                Remove photo
              </button>
            )}
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handlePhotoUpload}
        />
      </Field>

      {/* Name + Title */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Artist Name" required>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="admin-input"
            placeholder="e.g. Elena Reyes"
            required
          />
        </Field>
        <Field label="Title / Tagline" required>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="admin-input"
            placeholder="e.g. Contemporary Fine Artist"
            required
          />
        </Field>
      </div>

      {/* Bio */}
      <Field label="Biography" required>
        <textarea
          value={form.bio}
          onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
          className="admin-input"
          rows={10}
          placeholder="Write your artist biography..."
          required
        />
        <p className="text-xs mt-1" style={{ color: 'var(--color-stone)' }}>
          Use blank lines to separate paragraphs. The first paragraph will appear as the intro on the homepage.
        </p>
      </Field>

      {/* Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Email Address">
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="admin-input"
            placeholder="studio@yourdomain.com"
          />
        </Field>
        <Field label="Instagram Handle">
          <input
            type="text"
            value={form.instagram}
            onChange={(e) => setForm((f) => ({ ...f, instagram: e.target.value }))}
            className="admin-input"
            placeholder="@yourhandle"
          />
        </Field>
      </div>

      {/* Error */}
      {error && (
        <div
          className="p-4 rounded-lg text-sm"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}
        >
          {error}
        </div>
      )}

      {/* Success */}
      {saved && (
        <div
          className="flex items-center gap-2 p-4 rounded-lg text-sm"
          style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80' }}
        >
          <CheckCircle size={16} />
          Profile saved successfully!
        </div>
      )}

      <button
        type="submit"
        disabled={saving || uploading}
        className="btn-primary"
      >
        <span style={{ position: 'relative', zIndex: 1 }}>
          {saving ? 'Saving...' : 'Save Profile'}
        </span>
        {saving ? (
          <Loader2 size={15} className="animate-spin" style={{ position: 'relative', zIndex: 1 }} />
        ) : (
          <Save size={15} style={{ position: 'relative', zIndex: 1 }} />
        )}
      </button>
    </form>
  );
}
