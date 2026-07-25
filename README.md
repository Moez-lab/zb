# 🎨 Luxury Art Gallery — Next.js

A full-stack, Vercel-ready art gallery website with admin panel, customer inquiries, and a premium animated UI.

## ✨ Features

- **Luxury UI** — Cormorant Garamond + Inter, gold/charcoal palette, Framer Motion animations
- **Gallery** — Filterable artwork grid with category tabs
- **Artwork Detail** — Price, medium, size, framing, description, custom work availability
- **Inquiry Form** — Email inquiries sent directly to the artist (rate limited + spam protected)
- **"You Might Also Like"** — Same-category artwork suggestions
- **About Page** — Artist profile with photo, bio, social links
- **Admin Panel** — Full CRUD for artworks and about, protected with bcrypt auth
- **Cloudinary** — Cloud image storage (Vercel-compatible)
- **Neon PostgreSQL** — Serverless database (Vercel-compatible)
- **Security** — Bcrypt, timing-safe auth, CSP headers, rate limiting, input validation

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+
- A [Neon](https://neon.tech) account (free)
- A [Cloudinary](https://cloudinary.com) account (free)
- A Gmail account for SMTP

### 2. Install dependencies
```bash
npm install
```

### 3. Run the interactive setup
```bash
node scripts/setup.mjs
```
This will ask for your credentials and create `.env.local` automatically.

### 4. Set up the database
```bash
npm run db:push   # Create tables in Neon
npm run db:seed   # Add sample artworks
```

### 5. Run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🌐 Deploy to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push
```

### 2. Import on Vercel
- Go to [vercel.com](https://vercel.com) → New Project → Import your repo

### 3. Add Environment Variables
In Vercel → Your Project → Settings → Environment Variables, add **all** variables from your `.env.local` with these changes:
- `NEXTAUTH_URL` → your production URL (e.g. `https://yourgallery.vercel.app`)
- `NEXT_PUBLIC_SITE_URL` → same production URL

### 4. Deploy!
Vercel will automatically build and deploy. Every push to `main` triggers a new deployment.

---

## 🔐 Security

| Feature | Implementation |
|---|---|
| Admin auth | NextAuth.js + bcrypt (cost factor 12) |
| Timing attack prevention | Constant-time bcrypt comparison even on wrong username |
| Password storage | Only bcrypt hash stored — never plain text |
| Session | JWT, 8-hour expiry, HttpOnly cookie |
| Input validation | Zod schemas on all API routes |
| Spam protection | Honeypot field + rate limiting (3/15min per IP) |
| Image upload | Type + size validation before Cloudinary upload |
| Security headers | CSP, X-Frame-Options, X-Content-Type-Options |
| Secrets | All in `.env.local`, never committed to git |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home (Hero + Featured Gallery + About Preview)
│   ├── gallery/              # All artworks
│   ├── artwork/[id]/         # Single artwork detail
│   ├── about/                # Artist about page
│   ├── admin/                # Admin panel (login + dashboard)
│   └── api/                  # REST API routes
├── components/
│   ├── layout/               # Navbar, Footer
│   ├── home/                 # Hero, FeaturedGallery, AboutPreview
│   ├── gallery/              # ArtworkCard, GalleryGrid
│   ├── artwork/              # ArtworkDetail, InquiryForm, SimilarArtworks
│   └── admin/                # AdminSidebar, ArtworkForm, AboutForm
├── lib/
│   ├── auth.ts               # NextAuth config
│   ├── prisma.ts             # Database client
│   ├── email.ts              # Nodemailer
│   ├── cloudinary.ts         # Image uploads
│   ├── rateLimit.ts          # Rate limiting
│   └── validators.ts         # Zod schemas
└── types/
    └── index.ts              # TypeScript types
```

---

## 📧 Gmail SMTP Setup

1. Enable 2-Step Verification on your Google account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Create an app password for "Mail"
4. Use the 16-character code as `SMTP_PASS`

---

## 🖼️ Admin Panel

Navigate to `/admin` → Login with your credentials from setup.

**Manage Artworks:** Add/edit/delete artworks with image upload, all metadata fields, and availability toggles.

**Manage About:** Edit artist name, title, bio, profile photo, email, and Instagram.

---

## 🏗️ Built With

- [Next.js 14](https://nextjs.org) (App Router)
- [Prisma](https://prisma.io) + [Neon PostgreSQL](https://neon.tech)
- [NextAuth.js v5](https://authjs.dev)
- [Cloudinary](https://cloudinary.com)
- [Framer Motion](https://framer.com/motion)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Nodemailer](https://nodemailer.com)
- [Zod](https://zod.dev)
