// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // In a real application, you would send this data to a server
        // Show success message without displaying email address
        showFormMessage(`Thank you for your message, ${name}! I'll get back to you soon.`, 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// Show form message function
function showFormMessage(message, type) {
    if (!contactForm) return; // Ensure form exists
    
    // Create message element if it doesn't exist
    let messageDiv = document.getElementById('formMessage');
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = 'formMessage';
        messageDiv.className = 'form-message';
        contactForm.insertBefore(messageDiv, contactForm.firstChild);
    }
    
    // Sanitize message by using textContent instead of innerHTML
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add animation on scroll with feature detection
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.addEventListener('DOMContentLoaded', () => {
        const animatedElements = document.querySelectorAll('.highlight-card, .project-card, .skill-category');
        
        animatedElements.forEach(el => {
            el.classList.add('animate-element');
            observer.observe(el);
        });
    });
} else {
    // Fallback for browsers without IntersectionObserver support
    document.addEventListener('DOMContentLoaded', () => {
        const animatedElements = document.querySelectorAll('.highlight-card, .project-card, .skill-category');
        animatedElements.forEach(el => {
            el.classList.add('animate-in');
        });
    });
}
