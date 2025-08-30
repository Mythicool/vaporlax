# VaporLAX Deployment Guide

Complete step-by-step guide to deploy VaporLAX to production.

## 🚀 Quick Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account (free)
- Stripe account for payment processing

### Step 1: Prepare Repository

1. **Initialize Git repository** (if not already done)
```bash
git init
git add .
git commit -m "Initial VaporLAX e-commerce setup"
```

2. **Push to GitHub**
```bash
# Create repository on GitHub first, then:
git remote add origin https://github.com/Mythicool/vaporlax.git
git branch -M main
git push -u origin main
```

### Step 2: Set Up Stripe

1. **Create Stripe Account**
   - Visit [stripe.com](https://stripe.com)
   - Sign up for an account
   - Complete business verification

2. **Get API Keys**
   - Go to Stripe Dashboard → Developers → API Keys
   - Copy your **Publishable Key** (starts with `pk_test_` for test mode)
   - For production, use live keys (starts with `pk_live_`)

3. **Configure Webhooks** (Optional for advanced features)
   - Go to Stripe Dashboard → Developers → Webhooks
   - Add endpoint: `https://your-domain.com/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`

### Step 3: Deploy to Vercel

1. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your `vaporlax` repository

2. **Configure Build Settings**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Add Environment Variables**
   In Vercel dashboard, go to Settings → Environment Variables:

   ```env
   # Required
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key

   # Optional (with defaults)
   VITE_APP_NAME=VaporLAX
   VITE_APP_URL=https://your-domain.vercel.app
   VITE_MINIMUM_AGE=21
   VITE_FREE_SHIPPING_THRESHOLD=50
   VITE_DEFAULT_TAX_RATE=0.08
   VITE_CONTACT_EMAIL=info@vaporlax.com
   VITE_CONTACT_PHONE=1-800-VAPOR-LAX
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Step 4: Custom Domain (Optional)

1. **Add Custom Domain**
   - In Vercel dashboard, go to Settings → Domains
   - Add your domain (e.g., `vaporlax.com`)
   - Follow DNS configuration instructions

2. **SSL Certificate**
   - Vercel automatically provides SSL certificates
   - Your site will be accessible via HTTPS

## 🔧 Alternative Deployment Options

### Netlify

1. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

2. **Environment Variables**
   Add the same environment variables as Vercel

3. **Redirects**
   Create `public/_redirects`:
   ```
   /*    /index.html   200
   ```

### GitHub Pages

1. **Build and Deploy Action**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: '18'
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

### AWS S3 + CloudFront

1. **Build Project**
   ```bash
   npm run build
   ```

2. **Upload to S3**
   - Create S3 bucket
   - Enable static website hosting
   - Upload `dist/` contents

3. **Configure CloudFront**
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure custom error pages for SPA routing

## 🔒 Production Checklist

### Security
- [ ] Use HTTPS (SSL certificate)
- [ ] Use Stripe live keys (not test keys)
- [ ] Implement proper age verification
- [ ] Add security headers
- [ ] Enable CORS properly

### Performance
- [ ] Enable gzip compression
- [ ] Configure CDN (CloudFront, Vercel Edge)
- [ ] Optimize images
- [ ] Enable caching headers
- [ ] Monitor Core Web Vitals

### SEO
- [ ] Add proper meta tags
- [ ] Configure Open Graph tags
- [ ] Add sitemap.xml
- [ ] Add robots.txt
- [ ] Verify Google Search Console

### Analytics
- [ ] Set up Google Analytics
- [ ] Configure conversion tracking
- [ ] Monitor user behavior
- [ ] Track e-commerce events

### Legal Compliance
- [ ] Add privacy policy
- [ ] Add terms of service
- [ ] Implement age verification
- [ ] Add shipping/return policies
- [ ] Comply with local vaping regulations

## 🔍 Testing Production

### Functionality Tests
- [ ] Browse all pages
- [ ] Add products to cart
- [ ] Complete checkout flow
- [ ] Test on mobile devices
- [ ] Verify email notifications
- [ ] Test error scenarios

### Payment Tests
- [ ] Test with Stripe test cards
- [ ] Verify successful payments
- [ ] Test failed payments
- [ ] Check webhook handling
- [ ] Verify order confirmation

### Performance Tests
- [ ] Page load speeds < 3 seconds
- [ ] Mobile performance score > 90
- [ ] Accessibility score > 95
- [ ] SEO score > 90

## 🚨 Troubleshooting

### Common Issues

**Build Fails**
- Check Node.js version (18+)
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall

**Stripe Not Working**
- Verify publishable key is correct
- Check environment variables
- Ensure HTTPS in production

**Routing Issues**
- Configure SPA redirects
- Check Vercel rewrites in `vercel.json`
- Verify React Router setup

**Images Not Loading**
- Check image paths
- Verify public folder structure
- Use absolute URLs for external images

### Support Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

## 📊 Monitoring

### Key Metrics to Track
- Page load times
- Conversion rates
- Cart abandonment
- Payment success rates
- User engagement
- Mobile vs desktop usage

### Tools
- Google Analytics
- Vercel Analytics
- Stripe Dashboard
- Google Search Console
- PageSpeed Insights

## 🔄 Updates and Maintenance

### Regular Tasks
- Update dependencies monthly
- Monitor security vulnerabilities
- Review performance metrics
- Update product catalog
- Check payment processing
- Backup important data

### Version Control
- Use semantic versioning
- Tag releases
- Maintain changelog
- Test before deploying
- Use staging environment

---

**Need Help?**
- Email: info@vaporlax.com
- Documentation: Check README.md
- Issues: Create GitHub issue
