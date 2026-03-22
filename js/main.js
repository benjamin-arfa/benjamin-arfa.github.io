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

  // Add scroll-based nav background opacity
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
  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    function showError(input, message) {
      var error = input.parentElement.querySelector('.form-error');
      input.classList.add('error');
      input.classList.remove('valid');
      if (error) error.textContent = message;
    }

    function showValid(input) {
      var error = input.parentElement.querySelector('.form-error');
      input.classList.remove('error');
      input.classList.add('valid');
      if (error) error.textContent = '';
    }

    function validateField(input) {
      if (input.required && !input.value.trim()) {
        showError(input, 'This field is required');
        return false;
      }
      if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        showError(input, 'Please enter a valid email address');
        return false;
      }
      if (input.tagName === 'TEXTAREA' && input.required && input.value.trim().length < 10) {
        showError(input, 'Please enter at least 10 characters');
        return false;
      }
      if (input.value.trim()) {
        showValid(input);
      }
      return true;
    }

    // Live validation on blur
    contactForm.querySelectorAll('.form-input, .form-textarea').forEach(function(input) {
      input.addEventListener('blur', function() { validateField(input); });
    });

    // Character counter
    var messageField = document.getElementById('message');
    var charcount = document.getElementById('charcount');
    if (messageField && charcount) {
      messageField.addEventListener('input', function() {
        charcount.textContent = messageField.value.length;
      });
    }

    contactForm.addEventListener('submit', function(e) {
      var valid = true;
      contactForm.querySelectorAll('.form-input[required], .form-textarea[required]').forEach(function(input) {
        if (!validateField(input)) valid = false;
      });
      if (!valid) {
        e.preventDefault();
        contactForm.querySelector('.error').focus();
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

  // =============================================
  // DARK MODE TOGGLE
  // =============================================
  function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    updateThemeIcon();
  }

  function updateThemeIcon() {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.textContent = isDark ? '\u2600\uFE0F' : '\uD83C\uDF19';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      var newTheme = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon();
    });
  }

  initTheme();

  // =============================================
  // BACK TO TOP BUTTON
  // =============================================
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =============================================
  // SCROLL REVEAL ANIMATIONS
  // =============================================
  var revealElements = document.querySelectorAll('.card, .section-header, .page__header, .grid > *');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function(el) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }

  // =============================================
  // TYPEWRITER EFFECT
  // =============================================
  var typewriters = document.querySelectorAll('.typewriter');
  typewriters.forEach(function(el) {
    var texts = JSON.parse(el.getAttribute('data-texts'));
    var textIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var delay = 100;

    function type() {
      var current = texts[textIndex];
      if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        delay = 50;
      } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        delay = 100;
      }

      if (!isDeleting && charIndex === current.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        delay = 500;
      }

      setTimeout(type, delay);
    }

    type();
  });

  // =============================================
  // SKILLS FILTER (About page)
  // =============================================
  var filterBtns = document.querySelectorAll('.skills-filter__btn');
  var skillsGrid = document.getElementById('skills-grid');

  if (filterBtns.length && skillsGrid) {
    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var filter = btn.getAttribute('data-filter');

        // Update active button
        filterBtns.forEach(function(b) {
          b.classList.remove('active');
          b.classList.remove('btn--primary');
          b.classList.add('btn--outline');
        });
        btn.classList.add('active');
        btn.classList.remove('btn--outline');
        btn.classList.add('btn--primary');

        // Filter items
        var items = skillsGrid.children;
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = '';
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            setTimeout((function(el) {
              return function() {
                el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
              };
            })(item), 50);
          } else {
            item.style.display = 'none';
          }
        }
      });
    });
  }

  // =============================================
  // READING PROGRESS BAR
  // =============================================
  var progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', function() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    });
  }

  // =============================================
  // KEYBOARD NAVIGATION
  // =============================================
  var keyboardHint = document.getElementById('keyboard-hint');
  var shortcutsVisible = false;
  var hintTimeout;

  // Show hint briefly on page load
  if (keyboardHint) {
    setTimeout(function() {
      keyboardHint.classList.add('visible');
      hintTimeout = setTimeout(function() {
        keyboardHint.classList.remove('visible');
      }, 3000);
    }, 2000);
  }

  document.addEventListener('keydown', function(e) {
    // Don't trigger when typing in inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;

    switch (e.key) {
      case '?':
        if (keyboardHint) {
          shortcutsVisible = !shortcutsVisible;
          if (shortcutsVisible) {
            clearTimeout(hintTimeout);
            keyboardHint.innerHTML = '<strong>Keyboard Shortcuts</strong><br>' +
              '<kbd>H</kbd> Home &nbsp; <kbd>A</kbd> About &nbsp; <kbd>S</kbd> Services<br>' +
              '<kbd>P</kbd> Projects &nbsp; <kbd>I</kbd> Involvement &nbsp; <kbd>C</kbd> Contact<br>' +
              '<kbd>D</kbd> Toggle dark mode &nbsp; <kbd>T</kbd> Scroll to top';
            keyboardHint.classList.add('visible');
          } else {
            keyboardHint.classList.remove('visible');
          }
        }
        break;
      case 'h': window.location.href = 'index.html'; break;
      case 'a': window.location.href = 'about.html'; break;
      case 's': window.location.href = 'services.html'; break;
      case 'p': window.location.href = 'projects.html'; break;
      case 'i': window.location.href = 'involvement.html'; break;
      case 'c': window.location.href = 'contact.html'; break;
      case 'd':
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        var newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
        break;
      case 't':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
    }
  });

  // =============================================
  // DYNAMIC COPYRIGHT YEAR
  // =============================================
  var footerYear = document.querySelector('.footer__bottom p');
  if (footerYear) {
    var currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace(/\u00a9\s*\d{4}/, '\u00a9 ' + currentYear);
  }

  // =============================================
  // COOKIE CONSENT BANNER (GDPR)
  // =============================================
  var cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner && !localStorage.getItem('cookie-consent')) {
    // Show banner after a short delay
    setTimeout(function() {
      cookieBanner.classList.add('visible');
    }, 1000);

    var acceptBtn = document.getElementById('cookie-accept');
    var declineBtn = document.getElementById('cookie-decline');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookie-consent', 'accepted');
        cookieBanner.classList.remove('visible');
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', function() {
        localStorage.setItem('cookie-consent', 'declined');
        cookieBanner.classList.remove('visible');
      });
    }
  }

  // =============================================
  // SMOOTH PAGE TRANSITIONS
  // =============================================
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.addEventListener('click', function(e) {
      var link = e.target.closest('a');
      if (!link) return;

      var href = link.getAttribute('href');
      // Only intercept internal navigation links (not anchors, external, or special)
      if (!href) return;
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (link.target === '_blank' || link.hasAttribute('download')) return;
      if (link.origin && link.origin !== window.location.origin) return;

      e.preventDefault();
      document.body.classList.add('page-transitioning');

      setTimeout(function() {
        window.location.href = href;
      }, 250);
    });
  }
});
