// EmailJS Configuration
// Remplacez ces valeurs par les vôtres depuis https://www.emailjs.com/
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'VOTRE_PUBLIC_KEY_ICI',  // Depuis Account > General
    SERVICE_ID: 'VOTRE_SERVICE_ID_ICI',   // Depuis Email Services
    TEMPLATE_ID: 'VOTRE_TEMPLATE_ID_ICI'  // Depuis Email Templates
};

// Initialiser EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
})();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Enhanced skill card hover effects
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
});

// Project card enhanced hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Variable globale pour stocker le token Turnstile
let turnstileToken = null;

// Callback Turnstile
window.onTurnstileSuccess = function(token) {
    turnstileToken = token;
};

// Contact form submission handler with EmailJS
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // Vérifier que EmailJS est configuré
    if (EMAILJS_CONFIG.PUBLIC_KEY === 'VOTRE_PUBLIC_KEY_ICI') {
        alert('⚠️ Veuillez configurer EmailJS dans script-emailjs.js\n\n' +
              'Voir le fichier emailjs-setup.html pour les instructions détaillées.');
        return;
    }

    // Vérifier que Turnstile est validé
    if (!turnstileToken) {
        alert('⚠️ Veuillez valider le captcha avant de soumettre le formulaire.');
        return;
    }

    submitButton.textContent = 'Envoi en cours...';
    submitButton.disabled = true;

    // Préparer les paramètres du template
    const templateParams = {
        from_name: this.querySelector('[name="name"]').value,
        from_email: this.querySelector('[name="email"]').value,
        subject: this.querySelector('[name="subject"]').value,
        message: this.querySelector('[name="message"]').value,
        to_name: 'Ash Destin' // Votre nom
    };

    // Envoyer l'email via EmailJS
    emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
    )
    .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('✅ Message envoyé avec succès!\n\nJe vous répondrai dans les plus brefs délais.');
        this.reset();
        turnstileToken = null; // Reset token
        // Reset Turnstile widget
        if (typeof turnstile !== 'undefined') {
            turnstile.reset();
        }
    })
    .catch((error) => {
        console.error('FAILED...', error);
        alert('❌ Erreur lors de l\'envoi du message.\n\n' +
              'Veuillez réessayer ou me contacter directement par email.');
    })
    .finally(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Animation utilities
function revealSection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}

// Console message for developers
console.log('%c👋 Hello Developer!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cSi vous voyez cette page, le formulaire de contact est configuré avec EmailJS.', 'font-size: 14px; color: #764ba2;');
console.log('%cPour configurer: Ouvrez emailjs-setup.html pour les instructions.', 'font-size: 12px; color: #666;');

