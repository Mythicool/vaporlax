# VaporLAX - Premium Vape Shop E-commerce

A production-ready React + Vite e-commerce website with Vaporwave aesthetics, built with TypeScript, TailwindCSS, and Stripe integration.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Mythicool/vaporlax.git
cd vaporlax
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your Stripe publishable key:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
```

4. **Start development server**
```bash
npm run dev
```

5. **Open in browser**
Navigate to `http://localhost:3000`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Features

### Design & UX
- **Vaporwave Aesthetic** - Neon colors, retro fonts, cyberpunk styling
- **Responsive Design** - Mobile-first approach, works on all devices
- **Smooth Animations** - Framer Motion powered transitions
- **Custom Components** - Reusable UI components with consistent styling

### E-commerce Functionality
- **Product Catalog** - Browse and filter products
- **Shopping Cart** - Add, remove, update quantities
- **Stripe Checkout** - Secure payment processing
- **Persistent Cart** - Cart state saved in localStorage
- **Age Verification** - 21+ verification for vape products

### Technical Features
- **TypeScript** - Full type safety
- **State Management** - Zustand for cart and UI state
- **Routing** - React Router DOM with animated transitions
- **Performance** - Code splitting and lazy loading
- **SEO Ready** - Proper meta tags and semantic HTML

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Header, Footer, Layout
│   └── ecommerce/       # Cart, Product components
├── pages/               # Route components
├── lib/                 # Utilities, API functions, stores
├── types/               # TypeScript type definitions
├── data/                # Static data files
└── styles/              # Global styles
```

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Required for Stripe integration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here

# Optional configurations
VITE_API_BASE_URL=http://localhost:3000/api
VITE_MINIMUM_AGE=21
VITE_FREE_SHIPPING_THRESHOLD=50
```

### Stripe Setup

1. Create a [Stripe account](https://stripe.com)
2. Get your publishable key from the Stripe Dashboard
3. Add it to your `.env` file
4. For production, use live keys instead of test keys

## 🎯 Product Data

Products are stored in `src/data/products.json`. Each product includes:

- Basic info (name, description, price, images)
- Category and stock status
- Variants (colors, flavors, etc.)
- Specifications
- Featured status

## 🛒 Cart Functionality

The shopping cart includes:

- **Add to Cart** - From product cards or detail pages
- **Quantity Management** - Increase/decrease quantities
- **Remove Items** - Delete items from cart
- **Persistent Storage** - Cart saved in localStorage
- **Price Calculation** - Subtotal, tax, shipping, total

## 💳 Stripe Integration

### Test Mode
- Uses Stripe test keys for development
- Simulates checkout flow
- No real payments processed

### Production Mode
- Uses Stripe live keys
- Processes real payments
- Requires SSL certificate

### Checkout Flow
1. User clicks "Secure Checkout"
2. Stripe Checkout session created
3. User redirected to Stripe
4. Payment processed securely
5. User redirected back to success page

## 🎨 Styling & Theming

### Color Palette
- **Neon Pink**: `#ff71ce`
- **Neon Cyan**: `#01cdfe`
- **Neon Purple**: `#b967ff`
- **Neon Teal**: `#05ffa1`
- **Vapor Black**: `#0d0d0d`

### Typography
- **Headings**: Orbitron (Google Fonts)
- **Body**: VT323 (Google Fonts)

### Custom CSS Classes
- `.neon-button` - Glowing button effects
- `.neon-card` - Card with neon borders
- `.gradient-text` - Gradient text effects
- `.neon-text` - Glowing text effects

## 📱 Responsive Design

Breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔒 Age Verification

All vape products require age verification:
- Minimum age: 21 years
- Verification notices throughout site
- Responsible vaping messaging

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to GitHub**
```bash
# Push to your GitHub repository
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**
- Visit [vercel.com](https://vercel.com)
- Import your GitHub repository
- Add environment variables
- Deploy

3. **Environment Variables in Vercel**
Add these in your Vercel dashboard:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
VITE_API_BASE_URL=https://your-domain.com/api
```

### Other Platforms

The built files in `dist/` can be deployed to:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## 🧪 Testing

### Manual Testing Checklist

- [ ] Browse products
- [ ] Add items to cart
- [ ] Update cart quantities
- [ ] Remove cart items
- [ ] Test checkout flow
- [ ] Verify responsive design
- [ ] Test all navigation links
- [ ] Submit contact form

### Browser Testing

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Customization

### Adding Products
Edit `src/data/products.json` to add new products.

### Styling Changes
Modify `tailwind.config.js` for theme changes.

### New Pages
Add new routes in `src/App.tsx` and create page components.

## 📞 Support

For questions or issues:
- Email: info@vaporlax.com
- Phone: 1-800-VAPOR-LAX

## 📄 License

This project is licensed under the MIT License.

## ⚠️ Age Verification Notice

This website and its products are intended for adults 21 years and older. Please vape responsibly.
