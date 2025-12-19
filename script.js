// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Variable globale pour stocker le token Turnstile
let turnstileToken = null;

// Callback Turnstile
window.onTurnstileSuccess = function(token) {
    turnstileToken = token;
};

// Form submission
document.querySelector('.contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    // Vérifier que Turnstile est validé
    if (!turnstileToken) {
        alert('⚠️ Please validate the captcha before submitting the form.');
        return;
    }

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
        // Get form data
        const formData = new FormData(form);
        formData.append('cf_turnstile_token', turnstileToken);

        const response = await fetch('send-email.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            alert('✅ ' + result.message);
            form.reset();
            turnstileToken = null; // Reset token
            // Reset Turnstile widget
            if (typeof turnstile !== 'undefined') {
                turnstile.reset();
            }
        } else {
            alert('❌ ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('❌ An error occurred. Please try again later.');
    } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

// Add some interactive hover effects
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

