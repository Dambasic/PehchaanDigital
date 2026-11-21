# Pehchaan Digital — Agency Website

Complete, minimal, and conversion-focused agency website for **Pehchaan Digital** based in Pune, Maharashtra, India.
Tagline: *“Apni Pehchaan, Digital Duniya Mein.”*

---

## 🚀 Instant Deployment on Vercel

This repository is pre-configured and 100% **Vercel-ready**.

### Method 1: Git Push & Import on Vercel (Recommended)
1. Initialize Git (if not already done) and push to GitHub/GitLab:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Pehchaan Digital agency website"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```
2. Log into [vercel.com](https://vercel.com/) and click **"Add New..." ➔ "Project"**.
3. Import your repository.
4. Vercel automatically detects the framework as **Vite** with:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**. Your site will be live on a `*.vercel.app` domain in ~30 seconds with automatic SSL and global CDN caching.

---

### Method 2: Drag & Drop Upload
You can drag the pre-built `dist/` folder directly to Vercel without Git:
1. Log into [vercel.com/new](https://vercel.com/new).
2. Under "Deploying a static site?", drag and drop the folder:
   ```
   /Users/paarth/.gemini/antigravity/scratch/pehchaan-digital/dist
   ```
3. Your site deploys immediately!

---

### Method 3: Using Vercel CLI
```bash
npx vercel
```
Follow the interactive prompts (use defaults), and it will deploy instantly.

---

## 🔐 Admin Portal & Deep Analytics

The website includes a built-in, secure Admin Portal with real-time product price management and deep visitor analytics:

### Accessing Admin:
- Navigate to `/#admin` in the URL (e.g. `your-domain.com/#admin`) or click **"Admin Portal"** in the footer / navbar.
- **Default Admin Passcode:** `pehchaan2026` (can be changed anytime in Settings).

### Features:
1. **Products & Services Manager**:
   - Change any product's launch price and original strikethrough price instantly.
   - Edit full product details: name, description, deliverables bullets, categories/icons, badges, and button CTAs.
   - Add new products / services or delete existing ones.
   - Automatic WhatsApp enquiry message generator matching the new price.
   - Instant live synchronization with the public website catalogue.
2. **Deep Website Analytics**:
   - **Unique Visitors & Total Visits** telemetry.
   - **WhatsApp Clicks Breakdown** by touchpoint (Hero, Floating button, Services cards, Contact form, Navbar, Footer).
   - **Country Analytics**: Tracks visits & WhatsApp clicks by country (India, UAE, USA, UK, Singapore, Canada, etc.) with flags and click conversion rates.
   - **Device Breakdown**: Mobile vs Desktop vs Tablet ratio.
   - **Real-Time Event Stream**: Live feed of visitor interactions and WhatsApp inquiries.
   - **Time Filters**: Filter metrics by Today, 7 Days, 30 Days, or All Time.
   - Export reports as JSON / CSV.
3. **Vercel Analytics Integration**:
   - Integrated `@vercel/analytics` component for serverless real-user telemetry on Vercel deployments.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start local development server with host networking (for mobile preview)
npm run dev -- --host

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
pehchaan-digital/
├── vercel.json           # Vercel SPA rewrites & long-term asset cache headers
├── .gitignore            # Git ignore rules for node_modules, dist, etc.
├── package.json          # Dependencies (React 18, Vite, Tailwind CSS, Lucide)
├── tailwind.config.js    # Custom brand colors (#092957, #FF8A00, #F7F9FC)
├── tsconfig.json         # Strict TypeScript configuration
├── vite.config.ts        # Vite configuration
├── index.html            # SEO meta tags, OpenGraph, JSON-LD schema
├── public/               # Logos, favicon, robots.txt, sitemap.xml
│   ├── logo.png
│   ├── logo-transparent.png
│   ├── logo-dark-mode.png
│   ├── favicon.png
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/       # Hero, TrustIntro, Services, FeaturedWork, etc.
│   ├── data/             # Services catalogue, FAQs, and content arrays
│   ├── pages/            # Privacy Policy & Terms & Conditions
│   ├── utils/            # WhatsApp helper functions & validation
│   ├── App.tsx           # Main application shell with hash routing
│   └── main.tsx          # React DOM entry point
└── dist/                 # Production-ready build artifacts
```
