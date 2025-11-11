/**
 * Newsletter Form Handling
 * Includes validation, submission, and success handling
 */

(function() {
    'use strict';

    // ==========================================
    // Form Elements
    // ==========================================
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('newsletter-email');
    const consentCheckbox = document.getElementById('newsletter-consent');
    const emailError = document.getElementById('email-error');
    const submitButton = form ? form.querySelector('button[type="submit"]') : null;

    // ==========================================
    // Email Validation
    // ==========================================
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ==========================================
    // Show Error Message
    // ==========================================
    function showError(message) {
        if (!emailError) return;
        emailError.textContent = message;
        emailInput.setAttribute('aria-invalid', 'true');
        emailInput.classList.add('input-error');
    }

    // ==========================================
    // Clear Error Message
    // ==========================================
    function clearError() {
        if (!emailError) return;
        emailError.textContent = '';
        emailInput.setAttribute('aria-invalid', 'false');
        emailInput.classList.remove('input-error');
    }

    // ==========================================
    // Validate Form
    // ==========================================
    function validateForm() {
        let isValid = true;

        // Clear previous errors
        clearError();

        // Validate email
        const email = emailInput.value.trim();
        if (!email) {
            showError('Please enter your email address.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('Please enter a valid email address.');
            isValid = false;
        }

        // Validate consent
        if (!consentCheckbox.checked) {
            // Show consent error (you might want to add a dedicated error element)
            alert('Please agree to receive emails and accept our privacy policy.');
            isValid = false;
        }

        return isValid;
    }

    // ==========================================
    // Show Success Message
    // ==========================================
    function showSuccess() {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'newsletter__success show';
        successMessage.setAttribute('role', 'alert');
        successMessage.innerHTML = `
            <p><strong>Thank you for subscribing!</strong></p>
            <p>Check your email for your free 7-Day Reflux-Friendly Meal Plan.</p>
        `;

        // Insert success message before form
        form.parentNode.insertBefore(successMessage, form);

        // Hide form
        form.style.display = 'none';

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // ==========================================
    // Submit Form
    // ==========================================
    async function submitForm(e) {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Disable submit button to prevent double submission
        submitButton.disabled = true;
        submitButton.textContent = 'Subscribing...';

        const email = emailInput.value.trim();

        try {
            // IMPORTANT: Replace this with your actual newsletter service integration
            // Examples: Mailchimp API, ConvertKit API, custom backend endpoint
            
            // Simulated API call (replace with actual implementation)
            const response = await simulateNewsletterSubmission(email);

            if (response.success) {
                // Show success message
                showSuccess();

                // Track conversion (Google Analytics)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'newsletter_signup', {
                        'event_category': 'engagement',
                        'event_label': 'Newsletter Form'
                    });
                }

                // Optional: Redirect to thank you page after delay
                setTimeout(() => {
                    window.location.href = 'pages/thank-you.html';
                }, 3000);
            } else {
                throw new Error('Subscription failed');
            }

        } catch (error) {
            console.error('Newsletter subscription error:', error);
            showError('An error occurred. Please try again later.');
            submitButton.disabled = false;
            submitButton.textContent = 'Subscribe Now';
        }
    }

    // ==========================================
    // Simulate Newsletter Submission (REPLACE WITH ACTUAL API)
    // ==========================================
    function simulateNewsletterSubmission(email) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Newsletter subscription for:', email);
                resolve({ success: true });
            }, 1500);
        });
    }

    // ==========================================
    // Real-time Email Validation
    // ==========================================
    function initRealTimeValidation() {
        if (!emailInput) return;

        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && !isValidEmail(email)) {
                showError('Please enter a valid email address.');
            }
        });

        emailInput.addEventListener('input', function() {
            if (emailError.textContent) {
                clearError();
            }
        });
    }

    // ==========================================
    // Initialize Newsletter Form
    // ==========================================
    function init() {
        if (!form) {
            console.log('Newsletter form not found on this page');
            return;
        }

        // Add form submit event listener
        form.addEventListener('submit', submitForm);

        // Initialize real-time validation
        initRealTimeValidation();

        console.log('📧 Newsletter form initialized');
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

// ==========================================
// CSS for Error States
// ==========================================
const style = document.createElement('style');
style.textContent = `
    .input-error {
        border-color: #d32f2f !important;
    }
    
    .input-error:focus {
        border-color: #d32f2f !important;
        box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.1) !important;
    }
`;
document.head.appendChild(style);

// ==========================================
// Integration Guide (Remove in production)
// ==========================================
/*
MAILCHIMP INTEGRATION EXAMPLE:
-------------------------------
Replace the simulateNewsletterSubmission function with:

async function submitToMailchimp(email) {
    const response = await fetch('YOUR_MAILCHIMP_FORM_ACTION_URL', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'EMAIL': email,
            'b_YOUR_USER_ID_YOUR_LIST_ID': '' // Anti-bot field
        })
    });
    return response.ok;
}

CONVERTKIT INTEGRATION EXAMPLE:
--------------------------------
async function submitToConvertKit(email) {
    const response = await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            api_key: 'YOUR_API_KEY',
            email: email
        })
    });
    return response.ok;
}

CUSTOM BACKEND EXAMPLE:
-----------------------
async function submitToBackend(email) {
    const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
    });
    const data = await response.json();
    return { success: response.ok, data };
}
*/
