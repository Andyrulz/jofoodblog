# 🥗 Gentle Eating - GERD-Friendly Food Blog

A warm, compassionate food blog dedicated to helping people with GERD, acid reflux, and chronic acidity enjoy delicious, low-acid meals without discomfort.

## 📋 Project Overview

This website is built following the comprehensive Product Requirements Document (PRD) outlined in `context.md`. It features:

- **Empathetic Design**: Soft color palette (beige, mint green, pale gray) creates a calming atmosphere
- **User-Focused Navigation**: Easy browsing by meal type, featured recipes, and educational articles
- **Accessibility First**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Mobile Responsive**: Fully functional on desktop, tablet, and mobile devices
- **Performance Optimized**: Fast loading times with lazy loading and optimized assets

## 🏗️ Project Structure

```
Food-blog/
├── index.html                 # Homepage with all sections
├── context.md                 # Complete PRD documentation
├── README.md                  # This file
│
├── css/                       # Stylesheets
│   ├── styles.css            # Global styles, variables, utilities
│   ├── hero.css              # Hero section & navigation
│   ├── meal-types.css        # Meal category cards
│   ├── recipes.css           # Recipe card layouts
│   ├── articles.css          # Article/blog cards
│   ├── about.css             # About section styles
│   ├── newsletter.css        # Newsletter form styles
│   └── footer.css            # Footer styles
│
├── js/                        # JavaScript files
│   ├── main.js               # Core functionality (nav, scrolling, lazy loading)
│   └── newsletter.js         # Newsletter form handling & validation
│
├── images/                    # Image assets
│   ├── hero/                 # Hero background images
│   ├── meal-types/           # Category images (breakfast, lunch, etc.)
│   ├── recipes/              # Recipe photos
│   ├── articles/             # Article images
│   └── about/                # Profile/about images
│
├── data/                      # Data files
│   └── recipes.json          # Recipe and article data structure
│
└── pages/                     # Secondary pages
    ├── about.html            # Full about page
    ├── recipes.html          # All recipes listing
    ├── blog.html             # Blog listing
    ├── resources.html        # Resources page
    ├── contact.html          # Contact form
    ├── thank-you.html        # Newsletter thank you page
    ├── privacy.html          # Privacy policy
    ├── terms.html            # Terms of service
    └── disclaimer.html       # Medical disclaimer
```

## 🎨 Design System

### Color Palette

- **Beige**: `#f7f3ee` - Warm, calming background
- **Mint Green**: `#d4e8dd` - Soft accent color
- **Pale Gray**: `#f1f1f1` - Neutral sections
- **Pale Green**: `#eaf4ef` - Alternate section background
- **Dark Gray**: `#2d2d2d` - Footer and text
- **Accent**: `#7ab892` - Primary action color
- **Hover**: `#5a9872` - Hover states

### Typography

- **Font Family**: Lato, Open Sans, system fonts
- **Base Size**: 16px (1rem)
- **Scale**:
  - H1: 3rem (48px)
  - H2: 2.25rem (36px)
  - H3: 1.75rem (28px)
  - H4: 1.5rem (24px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)

### Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1023px
- **Mobile**: < 767px

## ✨ Key Features

### 1. Hero Section

- Full-width hero with background image
- Prominent headline and subheadline
- Two clear CTAs (Explore Recipes, Learn About GERD)
- Lazy-loaded background image for performance
- Keyboard accessible navigation

### 2. Meal Types Explorer

- 6 category cards in responsive grid
- Hover animations and smooth transitions
- Links to category-specific recipe pages
- Mobile: single column scroll
- Desktop: 2x3 or 3x2 grid

### 3. Featured Recipes

- 3-4 highlighted recipes with schema markup
- 16:9 recipe images
- Tag system (Low Acid, Quick, Vegan, Gluten-Free)
- 100-character descriptions
- Hover effects with gentle zoom

### 4. Recent Recipes

- Dynamic grid of 4-6 recent posts
- Auto-updates with new content
- "View All Recipes" CTA button
- Consistent card styling

### 5. How-To Articles

- Alternating layout for visual interest
- 4:3 article images
- 2-line summaries
- Educational focus on reflux management

### 6. About Me Section

- Personal story (150+ words)
- Split layout: image + content
- Builds trust and connection
- CTA to full about page

### 7. Newsletter Signup

- Email capture with validation
- GDPR-compliant consent checkbox
- Success message and redirect
- Integration-ready for Mailchimp/ConvertKit

### 8. Footer

- 4-column layout (Navigation, Quick Links, Social, Legal)
- Social media links (Instagram, Pinterest, YouTube)
- Medical disclaimer
- Copyright information

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- A local web server (optional but recommended)
- Text editor (VS Code, Sublime Text, etc.)

### Installation

1. **Clone or download the project**

   ```bash
   cd Food-blog
   ```

2. **Add images**

   - Place hero images in `images/hero/`
   - Add meal type images in `images/meal-types/`
   - Add recipe photos in `images/recipes/`
   - Add article images in `images/articles/`
   - Add profile photo in `images/about/`

3. **Run a local server** (recommended)

   **Option 1: Python**

   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Option 2: Node.js (http-server)**

   ```bash
   npx http-server
   ```

   **Option 3: VS Code Live Server**

   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

4. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📧 Newsletter Integration

The newsletter form is ready to integrate with your email service provider. Update `js/newsletter.js`:

### Mailchimp Integration

```javascript
async function submitToMailchimp(email) {
  const response = await fetch("YOUR_MAILCHIMP_FORM_ACTION_URL", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      EMAIL: email,
      b_YOUR_USER_ID_YOUR_LIST_ID: "",
    }),
  });
  return response.ok;
}
```

### ConvertKit Integration

```javascript
async function submitToConvertKit(email) {
  const response = await fetch(
    "https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: "YOUR_API_KEY",
        email: email,
      }),
    }
  );
  return response.ok;
}
```

## 🔧 Customization

### Update Colors

Edit CSS variables in `css/styles.css`:

```css
:root {
  --color-beige: #f7f3ee;
  --color-mint: #d4e8dd;
  --color-accent: #7ab892;
  /* ... */
}
```

### Change Fonts

Update font imports in `index.html` and CSS variable:

```css
--font-primary: "Your Font", sans-serif;
```

### Modify Content

- **Recipes**: Edit `data/recipes.json`
- **About Story**: Edit `pages/about.html`
- **Legal Pages**: Update `pages/privacy.html`, `pages/terms.html`, `pages/disclaimer.html`

## 📊 SEO Optimization

### Current Implementation

- Semantic HTML5 structure
- Meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Schema.org structured data for recipes
- Descriptive URLs
- Alt text for all images
- Proper heading hierarchy

### Next Steps

1. Add Google Analytics (GA4)

   ```html
   <!-- Add to <head> in index.html -->
   <script
     async
     src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"
   ></script>
   ```

2. Create `sitemap.xml`
3. Add `robots.txt`
4. Submit to Google Search Console
5. Generate and add favicon set

## ♿ Accessibility Features

- **WCAG 2.1 AA Compliant**
  - Contrast ratios ≥ 4.5:1
  - Font size ≥ 16px
  - Focus indicators on all interactive elements
- **Keyboard Navigation**
  - Tab order follows logical flow
  - Skip to main content link
  - Escape key closes mobile menu
- **Screen Reader Support**
  - ARIA labels and landmarks
  - Alt text for all images
  - Proper heading structure
  - Live regions for form feedback
- **Reduced Motion Support**
  - Respects `prefers-reduced-motion` preference
  - Animations disabled for sensitive users

## 🎯 Performance Optimization

### Current Optimizations

- Lazy loading for images
- Minimal JavaScript
- CSS organized by component
- No heavy frameworks
- Efficient selectors

### Recommended Next Steps

1. **Image Optimization**

   - Compress images (TinyPNG, ImageOptim)
   - Use WebP format with fallbacks
   - Implement responsive images (`srcset`)

2. **Minification**

   - Minify CSS and JS for production
   - Combine files to reduce HTTP requests

3. **Caching**

   - Add cache headers
   - Use CDN for static assets

4. **Performance Testing**
   - Run Google Lighthouse audit
   - Test on real devices
   - Monitor Core Web Vitals

## 🚢 Deployment

### Static Hosting Options

1. **Netlify** (Recommended)

   - Drag and drop deployment
   - Free SSL certificate
   - Automatic deployments from Git
   - Custom domain support

2. **Vercel**

   - Similar to Netlify
   - Excellent performance
   - Free tier available

3. **GitHub Pages**

   - Free hosting
   - Push to deploy
   - Custom domain support

4. **Traditional Hosting**
   - cPanel/FTP upload
   - Shared hosting (Bluehost, SiteGround)

### Pre-Deployment Checklist

- [ ] Replace all placeholder images
- [ ] Update social media links
- [ ] Configure newsletter integration
- [ ] Add Google Analytics
- [ ] Test all forms
- [ ] Test on multiple devices
- [ ] Run accessibility audit
- [ ] Run Lighthouse performance test
- [ ] Update contact email addresses
- [ ] Add favicon
- [ ] Create sitemap.xml
- [ ] Add robots.txt

## 🔄 CMS Integration

This site is designed for easy CMS integration:

### WordPress Integration

1. Convert HTML to WordPress theme
2. Use Custom Post Types for recipes
3. Install ACF (Advanced Custom Fields) for recipe metadata
4. Add WP Recipe Maker plugin

### Webflow

1. Import HTML structure
2. Connect CMS collections
3. Design recipe template
4. Publish

### Headless CMS Options

- **Contentful**: Recipe content management
- **Sanity**: Flexible content structure
- **Strapi**: Self-hosted option

## 📝 Content Guidelines

### Writing Recipes

- Use warm, friendly tone
- Avoid medical jargon
- Include prep/cook times
- List all ingredients clearly
- Number instructions
- Add helpful notes

### Tone & Voice

- **Friendly**: Like advice from a caring friend
- **Empathetic**: Acknowledge the struggle
- **Hopeful**: Food can be enjoyable again
- **Conversational**: Second person ("you")
- **Non-medical**: Educational, not prescriptive

## 🐛 Known Issues & Limitations

1. **Image Placeholders**: Sample images need to be replaced with actual food photography
2. **Recipe Pages**: Individual recipe detail pages need to be built
3. **Search Function**: No search functionality yet
4. **Comments**: No comment system implemented
5. **Backend**: Currently static HTML (no database)

## 🔮 Future Enhancements

- [ ] Recipe search and filtering
- [ ] User accounts and saved recipes
- [ ] Recipe ratings and reviews
- [ ] Meal planner tool
- [ ] Shopping list generator
- [ ] Print-friendly recipe cards
- [ ] Recipe video integration
- [ ] Community forum
- [ ] Mobile app

## 📚 Resources

### Documentation

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Schema.org Recipe Markup](https://schema.org/Recipe)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)

### Design Tools

- [Coolors](https://coolors.co/) - Color palette generator
- [Google Fonts](https://fonts.google.com/) - Free web fonts
- [Unsplash](https://unsplash.com/) - Free stock photos
- [Pexels](https://www.pexels.com/) - Food photography

### Testing Tools

- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Accessibility Tool](https://wave.webaim.org/)

## 📞 Support & Contact

For questions or support regarding this project:

- **Email**: hello@gentleeating.com
- **Documentation**: See `context.md` for complete PRD

## 📄 License

© 2025 Gentle Eating. All rights reserved.

---

## 🙏 Acknowledgments

This project was built following the comprehensive PRD in `context.md`, which outlines every detail from color choices to accessibility requirements to ensure a warm, trustworthy experience for people managing GERD and acid reflux.

**Remember**: This website provides educational information only and is not a substitute for professional medical advice. Always consult with a healthcare provider before making dietary changes.

---

**Made with 💚 for the reflux community**
