// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
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

// Fade in elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Audio player enhancements
document.querySelectorAll('audio').forEach(audio => {
    audio.addEventListener('play', function() {
        // Pause other audio players when this one starts playing
        document.querySelectorAll('audio').forEach(otherAudio => {
            if (otherAudio !== audio && !otherAudio.paused) {
                otherAudio.pause();
            }
        });
    });
});

// Mobile menu toggle (if needed)
const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        const logo = document.querySelector('.logo');
        
        // Create mobile menu button if it doesn't exist
        if (!document.querySelector('.mobile-menu-btn')) {
            const menuBtn = document.createElement('button');
            menuBtn.classList.add('mobile-menu-btn');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            menuBtn.style.cssText = `
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                display: block;
            `;
            
            menuBtn.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            });
            
            nav.insertBefore(menuBtn, navLinks);
        }
        
        // Hide nav links initially on mobile
        if (!navLinks.style.display) {
            navLinks.style.display = 'none';
        }
    }
};

// Call on load and resize
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

// Add loading animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});