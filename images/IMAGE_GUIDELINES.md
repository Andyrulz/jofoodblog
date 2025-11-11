# 📸 Image Asset Guidelines

This document outlines the required images for the Gentle Eating website.

## Image Specifications

### General Requirements

- **Format**: JPG for photos, PNG for graphics with transparency, WebP for modern browsers
- **Optimization**: Compress all images before upload (TinyPNG, ImageOptim)
- **Naming**: Use lowercase with hyphens (e.g., `banana-oat-pancakes.jpg`)
- **Alt Text**: Always provide descriptive alt text for accessibility

## Required Images

### 1. Hero Section (`images/hero/`)

**File**: `hero-background.jpg`

- **Dimensions**: 1920x1080px (16:9)
- **Subject**: Soft, high-key food photo (oatmeal bowl, herbal tea, gentle breakfast scene)
- **Style**: Bright, calming, soft focus background
- **Color Tone**: Warm, neutral, beige/cream tones
- **Usage**: Hero section background (will be dimmed with opacity)

**Example Sources**:

- Search: "oatmeal breakfast warm light"
- Search: "herbal tea calm morning"
- Search: "gentle breakfast food photography"

---

### 2. Meal Types (`images/meal-types/`)

Each category needs one high-quality image (600x400px, 3:2 ratio):

#### `breakfast.jpg`

- **Subject**: Gentle breakfast foods (oatmeal, bananas, toast, smoothie)
- **Style**: Bright, morning light
- **Avoid**: Citrus fruits, coffee, spicy foods

#### `lunch.jpg`

- **Subject**: Light lunch options (salads, wraps, rice bowls)
- **Style**: Fresh, colorful, appealing
- **Avoid**: Tomatoes, acidic dressings

#### `dinner.jpg`

- **Subject**: Comforting dinner plate (chicken, rice, vegetables)
- **Style**: Warm, cozy lighting
- **Avoid**: Red sauces, spicy dishes

#### `snacks.jpg`

- **Subject**: Healthy snacks (crackers, melon, nuts, smoothies)
- **Style**: Casual, approachable
- **Avoid**: Citrus, chips, spicy snacks

#### `desserts.jpg`

- **Subject**: Gentle desserts (rice pudding, banana bread, cookies)
- **Style**: Sweet but not overly indulgent
- **Avoid**: Chocolate, citrus desserts

#### `soups-drinks.jpg`

- **Subject**: Soup bowl or herbal beverage
- **Style**: Steamy, warm, comforting
- **Avoid**: Tomato-based soups, coffee

---

### 3. Recipes (`images/recipes/`)

Recipe images should be 600x338px (16:9 ratio):

#### Featured Recipes

- `banana-oat-pancakes.jpg` - Stack of fluffy pancakes with berries
- `ginger-chicken-rice.jpg` - Plated chicken with steamed rice
- `soothing-melon-smoothie.jpg` - Glass of green/yellow smoothie

#### Recent Recipes

- `baked-sweet-potato.jpg` - Roasted sweet potato wedges with herbs
- `chamomile-tea.jpg` - Cup of herbal tea with chamomile flowers
- `zucchini-noodles.jpg` - Spiralized zucchini with herbs
- `coconut-rice.jpg` - Bowl of creamy coconut rice

**Photography Tips**:

- Natural lighting preferred
- Clean, simple backgrounds
- Hero angle or 45-degree angle
- Include garnishes for visual appeal
- Show portion size realistically

---

### 4. Articles (`images/articles/`)

Article images should be 400x300px (4:3 ratio):

#### `night-reflux.jpg`

- **Subject**: Person sleeping peacefully or bedroom scene
- **Style**: Calm, restful, evening light
- **Purpose**: Article about preventing nighttime reflux

#### `calming-foods.jpg`

- **Subject**: Variety of gentle foods on a table
- **Style**: Overhead flat lay, colorful but calm
- **Purpose**: Article about foods that calm acidity

#### `cooking-substitutions.jpg`

- **Subject**: Cooking scene with healthy ingredients
- **Style**: Bright kitchen, hands preparing food
- **Purpose**: Article about ingredient substitutions

---

### 5. About (`images/about/`)

#### `profile.jpg`

- **Dimensions**: 500x500px (1:1, square)
- **Subject**: Portrait of blog creator (or stock photo)
- **Style**: Natural light, warm smile, approachable
- **Background**: Soft, neutral, possibly kitchen setting
- **Mood**: Friendly, trustworthy, welcoming

---

### 6. Favicon & Logo

#### Favicon Set

Create multiple sizes:

- `favicon-16x16.png`
- `favicon-32x32.png`
- `favicon-192x192.png` (Android)
- `favicon-512x512.png` (Android)
- `apple-touch-icon.png` (180x180px)

**Design**: Simple icon or letter mark, recognizable at small sizes
**Colors**: Use brand colors (mint green, beige, or accent)

---

## Free Stock Photo Resources

### High-Quality Food Photography

1. **Unsplash** - https://unsplash.com/
   - Search: "healthy breakfast", "gentle food", "herbal tea"
2. **Pexels** - https://www.pexels.com/

   - Large selection of food photography
   - Free for commercial use

3. **Pixabay** - https://pixabay.com/

   - Good variety of lifestyle and food images

4. **Foodiesfeed** - https://www.foodiesfeed.com/
   - Specialized in food photography
   - High quality, free downloads

### Portrait Photography

- **Generated Photos** - https://generated.photos/
  - AI-generated faces (no copyright issues)
- **This Person Does Not Exist** - https://thispersondoesnotexist.com/
  - AI-generated portraits

---

## Image Optimization Tools

### Online Tools

- **TinyPNG** - https://tinypng.com/
  - Best for PNG compression
- **Squoosh** - https://squoosh.app/
  - Google's image optimizer
  - Supports WebP conversion

### Desktop Tools

- **ImageOptim** (Mac) - https://imageoptim.com/
- **FileOptimizer** (Windows) - Free compression tool

---

## WebP Conversion

For better performance, provide WebP versions:

```html
<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" />
</picture>
```

### Conversion Tools

- Use Squoosh.app
- Or command line: `cwebp input.jpg -q 80 -o output.webp`

---

## Image Placeholder Service

During development, you can use placeholder services:

```html
<!-- Placeholder.com -->
<img
  src="https://via.placeholder.com/600x400/f7f3ee/7ab892?text=Recipe+Image"
  alt="Recipe"
/>

<!-- Lorem Picsum -->
<img src="https://picsum.photos/600/400" alt="Random placeholder" />
```

---

## Alt Text Guidelines

Good alt text is:

- **Descriptive**: "Stack of fluffy banana oat pancakes topped with fresh berries"
- **Concise**: Under 125 characters when possible
- **Contextual**: Relevant to the surrounding content
- **Not redundant**: Don't say "image of" or "picture of"

Examples:

```html
<!-- Good -->
<img
  src="pancakes.jpg"
  alt="Stack of fluffy banana oat pancakes topped with fresh berries"
/>

<!-- Bad -->
<img src="pancakes.jpg" alt="Image" />
<img src="pancakes.jpg" alt="pancakes.jpg" />
```

---

## Responsive Images

For high-resolution displays, provide 2x versions:

```html
<img
  src="recipe-400w.jpg"
  srcset="recipe-400w.jpg 400w, recipe-800w.jpg 800w"
  sizes="(max-width: 600px) 100vw, 400px"
  alt="Recipe description"
/>
```

---

## Checklist

Before launching:

- [ ] All hero images added and optimized
- [ ] All 6 meal type images in place
- [ ] All recipe images uploaded
- [ ] All article images added
- [ ] Profile photo added
- [ ] Favicon set created and linked
- [ ] All images have alt text
- [ ] Images compressed (<200KB each)
- [ ] WebP versions created (optional)
- [ ] Tested on mobile devices
- [ ] Verified image loading speed

---

**Note**: Replace all placeholder references in HTML with actual image filenames once uploaded.
