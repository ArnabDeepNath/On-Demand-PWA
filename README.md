# SHA24 — Bike Mechanic On Demand PWA

**Progressive Web App** for on-demand bike mechanic booking. Book mechanics, track repairs, manage spare parts — all from your phone.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📱 Features

### Customer Portal
- 🏍️ **6-Step Booking Wizard** — Issue type → Photos → Location → Schedule → Bike details → Service type
- 📋 **Booking History** — Track active and past bookings
- 🔍 **Search** — Find services and mechanics
- 👤 **Profile** — Manage bikes, addresses, preferences

### Field Executive Portal
- 📊 **Daily Dashboard** — Tasks, targets, progress tracking
- 👤 **Mechanic Onboarding** — Document capture, GPS tagging, toolkit verification
- 🔧 **Spare Parts Ordering** — Browse catalog, bulk order, stock tracking
- 📋 **Support Tasks** — Complaint handling, delay management

### PWA
- 📲 Installable on any device
- 🔄 Offline support with service worker
- ⚡ Lightning-fast with Vite

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 7 |
| Routing | React Router v7 |
| PWA | vite-plugin-pwa + Workbox |
| Icons | Lucide React |
| Styling | Vanilla CSS (custom design system) |
| CI/CD | GitHub Actions → GitHub Pages |

## 📁 Project Structure

```
src/
├── contexts/      # Auth, Toast providers
├── data/          # Mock data & API stubs
├── layouts/       # Customer & Agent layouts
├── pages/
│   ├── auth/      # Login, OTP, role selection
│   ├── customer/  # Booking, history, profile
│   └── agent/     # Dashboard, onboarding, parts
├── styles/        # Design system (index.css)
├── App.jsx        # Router & route definitions
└── main.jsx       # Entry point
```

## 🏗 Build & Deploy

```bash
npm run build     # Production build → dist/
```

CI/CD automatically deploys to GitHub Pages on push to `main`.

## 📄 License

Proprietary — SHA24.in
