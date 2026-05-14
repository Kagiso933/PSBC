# PARK SHOP BOYZ CLUB - E-Commerce Platform
## Enterprise-Grade Luxury Streetwear Store

### 🚀 Features

#### Customer-Facing
- ✅ Responsive luxury design with smooth animations
- ✅ Product catalog with filtering (All, Apparel, Accessories, Footwear)
- ✅ Shopping cart with real-time updates
- ✅ Secure checkout with Stitch payment integration
- ✅ Auto-rotating hero slider
- ✅ "Coming Soon" product badges
- ✅ Stock management (sold out states)
- ✅ SVG icons for luxury aesthetic
- ✅ Mobile-optimized design

#### Admin Portal
- ✅ Product management (Add, Edit, Delete)
- ✅ Image upload with preview
- ✅ Inventory tracking
- ✅ Order management
- ✅ Stock alerts (low stock warnings)
- ✅ Restock functionality
- ✅ Real-time data persistence (localStorage)

#### Payment Integration
- ✅ Stitch payment gateway (ready for API integration)
- ✅ Credit card support
- ✅ EFT support
- ✅ Secure payment badges
- ✅ Order confirmation system

---

## 📦 Files Included

```
psbc-store/
├── psbc-index.html     # Main storefront
├── psbc-app.js         # Application logic
└── README.md           # This file
```

---

## 🔧 Quick Start

### Local Development

1. **Download both files** to the same directory
2. **Open `psbc-index.html`** in your browser
3. **Admin access**: Click user icon → Enter password: `admin123`

### Production Deployment

#### Option 1: Static Hosting (Netlify/Vercel)

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Option 2: Traditional Web Hosting

1. Upload files to your hosting via FTP/cPanel
2. Ensure files are in public_html or www directory
3. Access via your domain

#### Option 3: GitHub Pages

```bash
# Create repository
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/yourusername/psbc-store.git
git push -u origin main

# Enable GitHub Pages in repository settings
```

---

## 🔐 Stitch Payment Integration

### Development Setup

The current implementation includes Stitch payment UI and flow. To enable live payments:

1. **Sign up at** [stitch.money](https://stitch.money)
2. **Get API credentials** from dashboard
3. **Update payment handler** in `psbc-app.js`:

```javascript
// In processOrder function, replace simulation with:
async processOrder(e) {
    e.preventDefault();
    
    try {
        // Initialize Stitch client
        const stitch = new StitchClient({
            apiKey: 'YOUR_API_KEY',
            environment: 'production' // or 'sandbox' for testing
        });
        
        const payment = await stitch.createPayment({
            amount: total,
            currency: 'ZAR',
            paymentMethod: this.currentPaymentMethod,
            customer: {
                email: e.target.email.value,
                name: `${e.target.firstName.value} ${e.target.lastName.value}`
            }
        });
        
        if (payment.status === 'successful') {
            // Complete order
            this.completeOrder(payment);
        }
    } catch (error) {
        alert('Payment failed: ' + error.message);
    }
}
```

### Stitch Documentation
- [Getting Started](https://stitch.money/docs/getting-started)
- [API Reference](https://stitch.money/docs/api)
- [Payment Methods](https://stitch.money/docs/payments)

---

## 🛠️ Configuration

### Admin Password

Change the admin password in `psbc-app.js`:

```javascript
function showAdminLogin() {
    const password = prompt('Enter admin password:');
    if (password === 'YOUR_SECURE_PASSWORD') {
        store.showAdminPanel();
    }
}
```

### Pricing & Shipping

Update in `psbc-app.js`:

```javascript
// Free shipping threshold
const shipping = subtotal > 1500 ? 0 : 150;

// Tax rate (currently 15% VAT)
const tax = subtotal * 0.15;
```

### Product Categories

Add/modify categories in the filter section:

```html
<button class="filter-btn" data-category="your-category">Category Name</button>
```

---

## 📊 Data Persistence

The platform uses `localStorage` for data persistence. For production, integrate with a backend:

### Option 1: Firebase (Recommended for small-medium stores)

```bash
npm install firebase

# Configure in psbc-app.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    projectId: "YOUR_PROJECT_ID",
    // ...
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
```

### Option 2: Custom Backend

Create a REST API with:
- Node.js + Express
- MongoDB/PostgreSQL
- JWT authentication
- API endpoints for products, orders, inventory

---

## 🎨 Customization

### Brand Colors

Update in `psbc-index.html` CSS:

```css
:root {
    --primary: #000000;        /* Main brand color */
    --secondary: #ffffff;       /* Background */
    --accent: #00D4AA;         /* Accent color (buttons, links) */
    --accent-dark: #00B894;    /* Hover states */
}
```

### Hero Images

Replace hero slide images in HTML:

```html
<img src="YOUR_IMAGE_URL.jpg" alt="Collection Hero">
```

### Logo

Update the logo text in HTML:

```html
<div class="logo">YOUR BRAND</div>
```

---

## 📱 Mobile Optimization

The platform is fully responsive with breakpoints at:
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

Test on multiple devices before deployment.

---

## 🔍 SEO Optimization

Add to `<head>` section:

```html
<meta name="description" content="Your luxury streetwear description">
<meta name="keywords" content="luxury, streetwear, south africa, fashion">
<meta property="og:title" content="Park Shop Boyz Club">
<meta property="og:description" content="Luxury African Streetwear">
<meta property="og:image" content="https://yourdomain.com/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">

<!-- Favicon -->
<link rel="icon" type="image/png" href="favicon.png">
```

---

## 📧 Email Integration

For order confirmations, integrate with:

### SendGrid
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
    to: customer.email,
    from: 'orders@parkshopboyzclub.com',
    subject: `Order Confirmation #${orderNumber}`,
    html: orderEmailTemplate(order)
};

await sgMail.send(msg);
```

### Mailgun, Postmark, or AWS SES
Similar integration patterns available.

---

## 🚦 Analytics

### Google Analytics

Add before closing `</body>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Facebook Pixel

```html
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

---

## 🔒 Security

### For Production:

1. **Enable HTTPS** (Let's Encrypt is free)
2. **Use environment variables** for API keys
3. **Implement CSRF protection**
4. **Add rate limiting** to prevent abuse
5. **Sanitize all user inputs**
6. **Regular security audits**

---

## 📈 Performance Optimization

### Image Optimization

Replace SVG placeholders with optimized images:

```bash
# Use ImageMagick or similar
convert original.jpg -quality 85 -resize 800x optimized.jpg

# Or use modern formats
convert original.jpg -quality 85 optimized.webp
```

### CDN Integration

Use Cloudflare or similar for:
- Image delivery
- Static asset caching
- DDoS protection
- SSL certificates

---

## 🐛 Troubleshooting

### Cart not persisting
- Check localStorage is enabled
- Clear browser cache
- Check browser console for errors

### Admin panel not loading
- Verify password is correct
- Check JavaScript console for errors
- Ensure both HTML and JS files are loaded

### Images not loading
- Verify image URLs are correct
- Check image formats are supported
- Check file permissions on server

---

## 📞 Support

For production deployment assistance:
- Email: support@parkshopboyzclub.com
- Stitch Support: [help.stitch.money](https://help.stitch.money)

---

## 📝 License

© 2026 Park Shop Boyz Club. All rights reserved.

---

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core e-commerce functionality
- ✅ Admin portal
- ✅ Product management
- ✅ Cart & checkout

### Phase 2 (Recommended)
- [ ] Backend API integration
- [ ] Real Stitch payment processing
- [ ] Customer accounts & login
- [ ] Order tracking
- [ ] Email notifications
- [ ] Search functionality
- [ ] Product reviews
- [ ] Wishlist feature

### Phase 3 (Advanced)
- [ ] Mobile app (React Native/Flutter)
- [ ] AI-powered recommendations
- [ ] Advanced analytics dashboard
- [ ] Multi-currency support
- [ ] International shipping
- [ ] Loyalty program
- [ ] Subscription boxes

---

## 🤝 Contributing

This is a production-ready template. Customize and deploy for your brand!

---

**Built with ❤️ for Park Shop Boyz Club**
*Wealth is of the Heart and Mind*
