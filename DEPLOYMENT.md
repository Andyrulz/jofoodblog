# 🚀 Deployment Guide - Gentle Eating

This guide will help you deploy the Gentle Eating website to production.

## Pre-Deployment Checklist

### ✅ Content Review

- [ ] Replace all placeholder images with actual food photography
- [ ] Update profile photo in About section
- [ ] Verify all recipe content is accurate
- [ ] Proofread all text for typos
- [ ] Update contact email addresses
- [ ] Add actual social media links

### ✅ Technical Setup

- [ ] Newsletter integration configured (Mailchimp/ConvertKit)
- [ ] Google Analytics tracking ID added
- [ ] Favicon set created and linked
- [ ] Meta tags updated with actual domain
- [ ] All links tested and working
- [ ] Forms tested and submitting correctly

### ✅ Performance

- [ ] All images compressed (<200KB each)
- [ ] Images converted to WebP (optional)
- [ ] CSS/JS minified (production)
- [ ] Lighthouse score >80
- [ ] Mobile responsiveness verified

### ✅ SEO

- [ ] Sitemap.xml created
- [ ] Robots.txt added
- [ ] Google Search Console verified
- [ ] Schema markup validated
- [ ] Meta descriptions optimized

### ✅ Accessibility

- [ ] WAVE audit completed (0 errors)
- [ ] Keyboard navigation tested
- [ ] Screen reader tested
- [ ] Color contrast verified
- [ ] Alt text added to all images

---

## Deployment Options

### Option 1: Netlify (Recommended)

**Advantages**: Free, easy, automatic HTTPS, continuous deployment, form handling

#### Steps:

1. **Create account** at https://netlify.com

2. **Option A: Drag & Drop**

   - Zip your project folder
   - Drag to Netlify dashboard
   - Done!

3. **Option B: GitHub Integration**

   ```bash
   # Initialize git repo
   git init
   git add .
   git commit -m "Initial commit"

   # Push to GitHub
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

   - Connect GitHub repo in Netlify
   - Configure build settings (none needed for static site)
   - Deploy

4. **Configure Custom Domain**

   - Add domain in Netlify dashboard
   - Update DNS records at your registrar
   - Wait for SSL certificate (automatic)

5. **Configure Forms** (Newsletter)
   - Add `netlify` attribute to form:
   ```html
   <form name="newsletter" method="POST" data-netlify="true"></form>
   ```

#### Netlify Configuration File

Create `netlify.toml` in root:

```toml
[build]
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

---

### Option 2: Vercel

Similar to Netlify with excellent performance.

#### Steps:

1. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Deploy:

   ```bash
   vercel
   ```

3. Follow prompts to link GitHub or deploy directly

---

### Option 3: GitHub Pages

Free hosting directly from GitHub repository.

#### Steps:

1. Create GitHub repository named `username.github.io`

2. Push code:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/username.github.io.git
   git push -u origin main
   ```

3. Enable Pages:

   - Go to repository Settings
   - Navigate to Pages section
   - Select branch: `main`
   - Select folder: `/ (root)`
   - Save

4. Site will be live at: `https://username.github.io`

#### Custom Domain:

- Add `CNAME` file with your domain
- Configure DNS at registrar

---

### Option 4: Traditional Web Hosting

For cPanel or FTP-based hosting.

#### Steps:

1. **Prepare files**:

   - Compress all images
   - Minify CSS/JS (optional)
   - Test locally one final time

2. **Upload via FTP**:

   - Use FileZilla or similar FTP client
   - Connect to your hosting account
   - Upload all files to `public_html` or `www` folder
   - Maintain folder structure

3. **Set Permissions**:

   - Files: 644
   - Folders: 755

4. **Configure HTTPS**:
   - Enable SSL in cPanel
   - Force HTTPS redirect in `.htaccess`:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

---

## Post-Deployment Steps

### 1. Verify Deployment

- [ ] Homepage loads correctly
- [ ] All internal links work
- [ ] Images display properly
- [ ] Forms submit successfully
- [ ] Mobile layout correct
- [ ] HTTPS enabled

### 2. Setup Google Analytics

Add to `<head>` in all HTML files:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

### 3. Submit to Search Engines

#### Google Search Console

1. Go to https://search.google.com/search-console
2. Add property (your domain)
3. Verify ownership (HTML file or DNS)
4. Submit sitemap.xml

#### Bing Webmaster Tools

1. Go to https://www.bing.com/webmasters
2. Add site
3. Verify and submit sitemap

### 4. Create Sitemap

Create `sitemap.xml` in root:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2025-11-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/pages/about.html</loc>
    <lastmod>2025-11-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/pages/recipes.html</loc>
    <lastmod>2025-11-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- Add more pages -->
</urlset>
```

### 5. Create Robots.txt

Create `robots.txt` in root:

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

---

## Performance Optimization

### 1. Image Optimization

Compress all images before upload:

```bash
# Using ImageMagick
mogrify -strip -interlace Plane -quality 85 *.jpg

# Or use online tools:
# - TinyPNG: https://tinypng.com
# - Squoosh: https://squoosh.app
```

### 2. Enable Caching

Add to `.htaccess` (Apache):

```apache
# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/javascript
</IfModule>
```

### 3. Minify Assets (Production)

Use online tools or build process:

- CSS: https://www.minifier.org/
- JS: https://javascript-minifier.com/

Or use automated tools:

```bash
# Install
npm install -g minify

# Minify
minify css/styles.css > css/styles.min.css
minify js/main.js > js/main.min.js
```

Update HTML to use minified versions:

```html
<link rel="stylesheet" href="css/styles.min.css" />
<script src="js/main.min.js"></script>
```

---

## Monitoring & Maintenance

### Regular Tasks

**Weekly**:

- [ ] Check Analytics for traffic/errors
- [ ] Respond to contact form submissions
- [ ] Monitor newsletter signups

**Monthly**:

- [ ] Add new recipes
- [ ] Publish blog articles
- [ ] Update social media
- [ ] Check for broken links
- [ ] Review and respond to feedback

**Quarterly**:

- [ ] Run Lighthouse audit
- [ ] Check for security updates
- [ ] Review SEO performance
- [ ] Optimize slow pages
- [ ] Update content as needed

### Tools for Monitoring

1. **Google Analytics**: Traffic, user behavior
2. **Google Search Console**: Search performance, errors
3. **Uptime Robot**: Monitor site availability (free)
4. **PageSpeed Insights**: Performance monitoring

---

## Backup Strategy

### Automatic Backups

If using GitHub + Netlify/Vercel:

- Git repo serves as backup
- Automatic on every push

### Manual Backups

For traditional hosting:

1. Download via FTP monthly
2. Export database if using CMS
3. Store backups in cloud (Google Drive, Dropbox)

---

## Domain Configuration

### DNS Settings

For custom domain, configure these records at your registrar:

**Using Netlify**:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

**Using Vercel**:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Allow 24-48 hours for DNS propagation.

---

## SSL Certificate

### Free SSL Options

- Netlify: Automatic
- Vercel: Automatic
- Cloudflare: Free tier available
- Let's Encrypt: Free, renewal every 90 days

Most modern hosting includes free SSL via Let's Encrypt.

---

## Troubleshooting

### Images Not Loading

- Check file paths (case-sensitive on Linux servers)
- Verify images uploaded to correct folders
- Check file permissions (644)

### Forms Not Working

- Verify action URL
- Check newsletter integration credentials
- Test with simple alert first

### Mobile Layout Broken

- Clear browser cache
- Check viewport meta tag
- Test on real devices, not just browser resize

### Slow Loading

- Run Lighthouse audit
- Compress images more
- Enable caching
- Consider CDN

---

## Support Resources

### Documentation

- Netlify Docs: https://docs.netlify.com/
- Vercel Docs: https://vercel.com/docs
- GitHub Pages: https://pages.github.com/

### Community

- Stack Overflow
- Web Dev Reddit: r/webdev
- Twitter: #webdev

---

## Success Metrics

Track these KPIs after launch:

**Traffic**:

- Unique visitors per month
- Page views
- Bounce rate (<60% goal)
- Average session duration (>2 min goal)

**Engagement**:

- Newsletter signups (>2% conversion)
- Recipe views
- Contact form submissions
- Social shares

**SEO**:

- Organic search traffic
- Keyword rankings
- Featured snippets
- Backlinks

---

**Congratulations on launching Gentle Eating! 🎉**

Remember to keep adding fresh content regularly to maintain engagement and improve SEO.
