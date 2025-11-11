# 🚀 Quick Start Guide

Get the Gentle Eating website running locally in minutes.

## 1. Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Basic knowledge of HTML/CSS/JavaScript

## 2. Installation

### Clone or Download

```bash
# If using Git
git clone <repository-url>
cd Food-blog

# Or download and extract the ZIP file
```

## 3. Run Locally

### Option A: VS Code Live Server (Easiest)

1. Open project folder in VS Code
2. Install "Live Server" extension
3. Right-click `index.html`
4. Select "Open with Live Server"
5. Browser opens at `http://127.0.0.1:5500`

### Option B: Python HTTP Server

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Then open: http://localhost:8000
```

### Option C: Node.js HTTP Server

```bash
# Install globally
npm install -g http-server

# Run
http-server

# Then open: http://localhost:8080
```

### Option D: PHP Built-in Server

```bash
php -S localhost:8000

# Then open: http://localhost:8000
```

## 4. Project Structure at a Glance

```
Food-blog/
├── index.html              ← Start here (homepage)
├── css/                    ← All stylesheets
├── js/                     ← JavaScript files
├── images/                 ← Image assets (add yours here)
├── pages/                  ← Secondary pages
├── data/                   ← JSON data
└── README.md               ← Full documentation
```

## 5. Key Files to Know

| File                | Purpose                                |
| ------------------- | -------------------------------------- |
| `index.html`        | Main homepage with all sections        |
| `css/styles.css`    | Global styles, variables, utilities    |
| `js/main.js`        | Core functionality (nav, scroll, etc.) |
| `js/newsletter.js`  | Newsletter form handling               |
| `data/recipes.json` | Recipe and article data                |
| `README.md`         | Complete documentation                 |
| `DEPLOYMENT.md`     | Deployment instructions                |

## 6. Customize Content

### Update Colors

Edit `css/styles.css` line 18:

```css
:root {
  --color-beige: #f7f3ee; /* Change these */
  --color-mint: #d4e8dd;
  --color-accent: #7ab892;
}
```

### Update Text

Edit `index.html`:

- Line 92: Hero headline
- Line 93: Hero subheadline
- Lines 250+: Featured recipes
- Lines 500+: About section

### Add Images

1. Add your images to appropriate folders:
   - `images/hero/` - Background images
   - `images/recipes/` - Recipe photos
   - `images/meal-types/` - Category images
2. Update image references in HTML

### Add Recipes

Edit `data/recipes.json`:

```json
{
  "id": 8,
  "title": "Your Recipe Name",
  "description": "Short description",
  "category": "breakfast",
  "tags": ["Low Acid", "Quick"],
  "ingredients": ["..."],
  "instructions": ["..."]
}
```

## 7. Test Features

### Mobile Navigation

1. Resize browser to mobile size (< 768px)
2. Click hamburger menu
3. Menu slides in from right
4. Click link or outside to close

### Newsletter Form

1. Scroll to newsletter section
2. Enter email and check consent
3. Click "Subscribe Now"
4. See success message
5. Redirects to thank-you page

### Smooth Scrolling

1. Click "Explore Recipes" in hero
2. Page smoothly scrolls to Meal Types section

## 8. Browser Testing

Test in these browsers:

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome)

## 9. Common Tasks

### Add a New Page

1. Create `pages/new-page.html`
2. Copy structure from existing page
3. Update content
4. Add link in navigation

### Change Fonts

1. Go to [Google Fonts](https://fonts.google.com/)
2. Select fonts
3. Copy `<link>` tag to HTML `<head>`
4. Update `--font-primary` in `css/styles.css`

### Integrate Newsletter Service

#### Mailchimp:

1. Get form action URL from Mailchimp
2. Edit `js/newsletter.js` line 87
3. Replace `simulateNewsletterSubmission` function

#### ConvertKit:

1. Get API key and form ID
2. Edit `js/newsletter.js`
3. See integration examples in file

### Add Google Analytics

1. Get tracking ID from Google Analytics
2. Add to `<head>` in `index.html`:

```html
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

## 10. Deploy to Production

### Quick Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Drag & drop project folder
3. Done! Site is live with HTTPS

See `DEPLOYMENT.md` for detailed instructions.

## 11. Troubleshooting

### Images Not Showing

- Check file paths are correct
- File names are case-sensitive on servers
- Verify images exist in correct folders

### JavaScript Not Working

- Open browser console (F12)
- Check for errors
- Verify scripts are loaded

### Mobile Menu Not Opening

- Clear browser cache
- Check JavaScript console for errors
- Verify `js/main.js` is loaded

### Styles Not Applied

- Check CSS files are linked in HTML
- Clear browser cache
- Verify CSS file paths

## 12. Next Steps

1. ✅ Run locally and explore
2. 📝 Read full `README.md`
3. 📸 Add your images (see `images/IMAGE_GUIDELINES.md`)
4. ✏️ Customize content
5. 🧪 Test all features
6. 🚀 Deploy (see `DEPLOYMENT.md`)

## 13. Get Help

### Documentation

- `README.md` - Complete documentation
- `DEPLOYMENT.md` - Deployment guide
- `PROJECT_SUMMARY.md` - Implementation details
- `images/IMAGE_GUIDELINES.md` - Image specs

### Resources

- HTML/CSS/JS reference: [MDN Web Docs](https://developer.mozilla.org/)
- Accessibility: [WebAIM](https://webaim.org/)
- SEO: [Google Search Central](https://developers.google.com/search)

## 14. File Checklist

Before going live:

- [ ] Replace placeholder images
- [ ] Update all text content
- [ ] Configure newsletter integration
- [ ] Add Google Analytics
- [ ] Test all links
- [ ] Test on mobile devices
- [ ] Run accessibility check
- [ ] Run Lighthouse audit
- [ ] Update social media links
- [ ] Add favicon

## 15. Development Tips

### VS Code Extensions (Recommended)

- Live Server
- Prettier (code formatter)
- Auto Rename Tag
- CSS Peek
- IntelliSense for CSS

### Keyboard Shortcuts

- `Ctrl/Cmd + /` - Toggle comment
- `Alt + Up/Down` - Move line up/down
- `Shift + Alt + Down` - Duplicate line
- `F12` - Go to definition

### Chrome DevTools

- `F12` - Open DevTools
- `Ctrl/Cmd + Shift + M` - Toggle device toolbar
- `Ctrl/Cmd + Shift + P` - Command palette
- Lighthouse tab - Performance audit

---

## 🎉 You're Ready!

The site should now be running locally. Start customizing and make it your own!

**Questions?** Check the full `README.md` for detailed documentation.

**Ready to deploy?** See `DEPLOYMENT.md` for step-by-step instructions.

---

**Happy coding!** 💚
