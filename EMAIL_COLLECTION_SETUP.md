# 📧 Email Collection Setup Guide

## Overview

Your website has **3 email collection points**:

1. **Top Announcement Banner** - "Gentle Recipes, Your Inbox. Sign Up"
2. **Newsletter Section** (Homepage) - "Get Reflux-Friendly Recipes in Your Inbox"
3. **Contact Page** - Contact form with message submission

---

## Current Status: ⚠️ SIMULATION MODE

Right now, the forms are in **simulation mode** - they don't actually send emails anywhere. You need to integrate with a real email service provider.

---

## Recommended Email Service Providers

### 🥇 **Option 1: Mailchimp** (Most Popular)

- **Best for**: Beginners, visual email builders
- **Free Tier**: Up to 500 contacts, 1,000 emails/month
- **Pricing**: Starts at $13/month for 500+ contacts
- **Features**: Automation, templates, analytics, landing pages

**Setup Steps:**

1. Create account at https://mailchimp.com
2. Create an "Audience" (email list)
3. Get your API key (Account → Extras → API keys)
4. Get your Audience ID (Audience → Settings → Audience name and defaults)
5. Update `js/newsletter.js` (see code below)

---

### 🥈 **Option 2: ConvertKit** (Creator-Focused)

- **Best for**: Content creators, bloggers
- **Free Tier**: Up to 300 subscribers
- **Pricing**: Starts at $9/month for 300-1,000 subscribers
- **Features**: Simple automation, landing pages, forms

**Setup Steps:**

1. Create account at https://convertkit.com
2. Create a "Form"
3. Get your API Secret (Settings → Advanced → API Secret)
4. Get your Form ID (Forms → Edit form → Settings)
5. Update `js/newsletter.js`

---

### 🥉 **Option 3: EmailOctopus** (Budget-Friendly)

- **Best for**: Tight budgets
- **Free Tier**: Up to 2,500 subscribers, 10,000 emails/month
- **Pricing**: Starts at $8/month
- **Features**: Basic automation, templates, analytics

---

### 💻 **Option 4: Custom Backend** (Most Control)

- **Best for**: Developers who want full control
- **Cost**: Depends on hosting (can be free)
- **Setup**: Create your own API endpoint to save emails to database

---

## Implementation Examples

### 📮 **Mailchimp Integration**

Replace the `simulateNewsletterSubmission` function in `js/newsletter.js`:

```javascript
// ==========================================
// Mailchimp API Integration
// ==========================================
async function submitToMailchimp(email) {
  const MAILCHIMP_API_KEY = "your-api-key-here"; // Get from Mailchimp
  const MAILCHIMP_AUDIENCE_ID = "your-audience-id"; // Get from Mailchimp
  const MAILCHIMP_SERVER = "us1"; // e.g., us1, us2, etc. (check your API key)

  const url = `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;

  const data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      SOURCE: "Website Newsletter Form",
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return { success: true };
  } else {
    const error = await response.json();
    throw new Error(error.detail || "Subscription failed");
  }
}
```

**⚠️ Security Note**: Don't expose your API key in frontend code! Use a backend proxy or serverless function.

---

### 🔒 **Secure Backend Proxy (Recommended)**

**Better approach**: Create a serverless function (Netlify, Vercel, AWS Lambda) to hide your API key.

**Frontend Code** (`js/newsletter.js`):

```javascript
async function submitNewsletter(email) {
  const response = await fetch("/api/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return await response.json();
}
```

**Backend Function** (e.g., Netlify Functions - `netlify/functions/subscribe.js`):

```javascript
const mailchimp = require("@mailchimp/mailchimp_marketing");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { email } = JSON.parse(event.body);

  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER,
  });

  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
```

---

### 📨 **ConvertKit Integration**

Replace in `js/newsletter.js`:

```javascript
async function submitToConvertKit(email) {
  const API_SECRET = "your-api-secret"; // Get from ConvertKit
  const FORM_ID = "your-form-id"; // Get from ConvertKit

  const url = `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_secret: API_SECRET,
      email: email,
    }),
  });

  if (response.ok) {
    return { success: true };
  } else {
    throw new Error("Subscription failed");
  }
}
```

---

## Contact Form Setup

The contact form in `pages/contact.html` currently uses **Formspree** (see form action URL).

### Current Setup:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST"></form>
```

### Steps to Activate:

1. Go to https://formspree.io
2. Create free account
3. Create a new form
4. Copy your form endpoint
5. Replace `YOUR_FORM_ID` in `pages/contact.html`

**Free Tier**: 50 submissions/month

### Alternative Contact Form Services:

- **Netlify Forms** (if hosting on Netlify) - Free, easy
- **Formsubmit.co** - Free, no registration needed
- **Basin** - Free tier available
- **Custom backend** - Store in your own database

---

## Quick Setup Checklist

### For Newsletter (Mailchimp):

- [ ] Create Mailchimp account
- [ ] Create audience/list
- [ ] Get API key and Audience ID
- [ ] Create backend proxy function (recommended)
- [ ] Update `js/newsletter.js` with API integration
- [ ] Test subscription flow
- [ ] Set up welcome email automation in Mailchimp

### For Contact Form:

- [ ] Create Formspree account
- [ ] Create new form
- [ ] Get form endpoint URL
- [ ] Update `pages/contact.html` with your form ID
- [ ] Test form submission
- [ ] Set up email notifications in Formspree

---

## Testing Your Setup

### Test Newsletter Signup:

1. Open browser console (F12)
2. Fill out newsletter form
3. Submit
4. Check console for API responses
5. Verify email appears in Mailchimp/ConvertKit dashboard

### Test Contact Form:

1. Fill out contact form
2. Submit
3. Check your email for notification
4. Verify submission in Formspree dashboard

---

## Privacy & Compliance

### ✅ Required Actions:

1. **Privacy Policy** - Add email collection disclosure
2. **GDPR Compliance** - Add consent checkbox for EU visitors
3. **CAN-SPAM** - Include physical address and unsubscribe link in emails
4. **Cookie Notice** - If using tracking cookies

**Sample Consent Checkbox HTML:**

```html
<label class="newsletter__consent">
  <input type="checkbox" required />
  I agree to receive email updates. You can unsubscribe at any time.
  <a href="privacy-policy.html">Privacy Policy</a>
</label>
```

---

## Cost Comparison

| Service      | Free Tier            | Paid Plans Start At | Best For      |
| ------------ | -------------------- | ------------------- | ------------- |
| Mailchimp    | 500 contacts         | $13/month           | Beginners     |
| ConvertKit   | 300 subscribers      | $9/month            | Creators      |
| EmailOctopus | 2,500 subscribers    | $8/month            | Budget        |
| Formspree    | 50 submissions/month | $10/month           | Contact forms |

---

## Next Steps

1. **Choose your email service provider** (Mailchimp recommended for beginners)
2. **Create account and get API credentials**
3. **Update code** with API integration (use backend proxy for security)
4. **Test thoroughly** before launch
5. **Set up welcome email** in your email service
6. **Create email templates** for your newsletters
7. **Plan your content schedule** (weekly/monthly emails)

---

## Support Resources

- **Mailchimp Docs**: https://mailchimp.com/developer/
- **ConvertKit Docs**: https://developers.convertkit.com/
- **Formspree Docs**: https://help.formspree.io/
- **Netlify Functions**: https://docs.netlify.com/functions/overview/

---

**Need Help?** The code is ready to integrate - just follow the steps above for your chosen provider!
