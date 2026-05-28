/**
 * Upvalue.biz - Interactions & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you only want the animation to play once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with the 'fade-in' class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 2. Header background effect on scroll
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
            header.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(15, 23, 42, 0.85)';
        }
    });
});
