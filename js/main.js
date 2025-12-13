/* ===========================================
   MAIN.JS - Site Interactivity
   =========================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__mobile-menu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('active');

      // Animate hamburger to X
      const spans = navToggle.querySelectorAll('span');
      if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('.nav__link');
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
        mobileMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Add active class to current page link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav__link');

  navLinks.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('nav__link--active');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
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

  // Add scroll-based nav background opacity (optional enhancement)
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        nav.style.boxShadow = 'var(--shadow-md)';
      } else {
        nav.style.boxShadow = 'none';
      }
    });
  }

  // Form validation (for contact page)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const email = contactForm.querySelector('input[type="email"]');
      const message = contactForm.querySelector('textarea');

      if (email && !email.value.includes('@')) {
        e.preventDefault();
        alert('Please enter a valid email address.');
        email.focus();
        return;
      }

      if (message && message.value.trim().length < 10) {
        e.preventDefault();
        alert('Please enter a message with at least 10 characters.');
        message.focus();
        return;
      }
    });
  }

  // Card hover effects with keyboard support
  const cards = document.querySelectorAll('.card');
  cards.forEach(function(card) {
    card.setAttribute('tabindex', '0');

    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        const link = card.querySelector('a');
        if (link) {
          link.click();
        }
      }
    });
  });
});
