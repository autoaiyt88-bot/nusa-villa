# NUSA VILLA — Luxury Villa Booking Platform

> A production-ready, full-stack luxury villa reservation web platform built with Next.js 16 (App Router), TypeScript, Tailwind CSS, Framer Motion, Prisma ORM, and Midtrans Sandbox Payment integration.

---

## 🌟 Key Highlights & Architecture

- **Visual Design**: Ultra-premium luxury tropical resort aesthetic featuring Deep Forest (`#12372A`), Emerald (`#2D6A4F`), Warm Sand (`#E9DFC7`), and Accent Gold (`#C5A46D`).
- **Hero Experience**: 100vh hero section with Ken Burns cinematic zoom, parallax depth on scroll, and accessible `prefers-reduced-motion` fallbacks.
- **Floating Booking Search**: Instant destination, check-in/check-out date pickers, and adult/children/infant counters redirecting directly to filtered results.
- **Villas Catalog (`/villas`)**: Real-time filtering by destination, price range, bedrooms, bathrooms, amenities, and multi-option sorting.
- **Villa Detail Page (`/villa/[slug]`)**: 5-photo showcase grid, full-screen interactive lightbox gallery, amenities, room plans, interactive map, and sticky live pricing calculator.
- **Transaction-Safe Availability**: Prevents double-booking by locking overlapping dates in database transactions.
- **Checkout & Midtrans Sandbox (`/checkout/[bookingId]`)**:
  - Integration with Midtrans Snap gateway (supporting QRIS, Virtual Accounts, Bank Transfer, and E-Wallets).
  - Built-in Sandbox Test Simulator allowing instant simulation of payment completion.
  - Automated webhook confirmation route (`/api/payment/notification`).
- **Booking Confirmation (`/booking/success`)**: Confetti celebration, official reservation code format (`NV-2026-XXXX`), and printable luxury receipt.
- **Guest Dashboard (`/dashboard`)**: Upcoming stay countdown, reservation history, saved wishlist with database sync, profile management, and session monitoring.
- **SaaS Executive Admin Dashboard (`/admin`)**:
  - Role-protected administrative portal (`ADMIN` / `STAFF`).
  - Interactive Recharts analytics (monthly revenue yields, destination occupancy rates).
  - Full Villa Portfolio CRUD (Create, Edit, Toggle Active/Disable, Delete).
  - Calendar availability locking for property maintenance or private VIP events.
  - Customer lifetime value directory and Midtrans payment logs.
  - Promotional coupon engine (`WELCOME20`, `ESCAPE10`, etc.).
  - Authentic guest review moderation (Approve, Hide, Delete).

---

## 🚀 Getting Started

### 1. Installation

```bash
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

### 3. Database Initialization & Seeding

```bash
# Push Prisma schema to SQLite database (dev.db)
npx prisma db push

# Seed realistic Bali villas, admin, users, bookings, and reviews
npx prisma db seed
```

### 4. Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Credentials

| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@nusa-villa.test` | `Admin123!` | `/admin` & `/dashboard` |
| **Guest User** | `guest@nusa-villa.test` | `Guest123!` | `/dashboard` |

---

## 🏗️ Production Build

To test or build the optimized production bundle:

```bash
npm run build
npm run start
```
