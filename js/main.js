/* ===========================================
   MAIN.JS - Site Interactivity
   =========================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__mobile-menu');

  // Create backdrop overlay
  var backdrop = document.createElement('div');
  backdrop.className = 'nav__backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  document.body.appendChild(backdrop);

  function openMobileMenu() {
    navToggle.classList.add('active');
    navToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('active');
    mobileMenu.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('active');
    document.body.classList.add('menu-open');
    // Focus first link in mobile menu for keyboard users
    var firstLink = mobileMenu.querySelector('.nav__link');
    if (firstLink) firstLink.focus();
  }

  function closeMobileMenu() {
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function() {
      var isOpen = mobileMenu.classList.contains('active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('.nav__link');
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        closeMobileMenu();
      });
    });

    // Close mobile menu when clicking backdrop
    backdrop.addEventListener('click', closeMobileMenu);

    // Close mobile menu on Escape key + trap focus inside menu
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
        navToggle.focus();
      }

      // Focus trap: keep Tab cycling within mobile menu when open
      if (e.key === 'Tab' && mobileMenu.classList.contains('active')) {
        var focusable = mobileMenu.querySelectorAll('a, button');
        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
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
      link.setAttribute('aria-current', 'page');
    }
  });

  // Set aria-hidden on mobile menu when closed
  if (mobileMenu) {
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.setAttribute('role', 'dialog');
    mobileMenu.setAttribute('aria-label', 'Mobile navigation');
  }

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

  // Card keyboard support: only make cards with links keyboard-interactive
  const cards = document.querySelectorAll('.card');
  cards.forEach(function(card) {
    var cardLink = card.querySelector('a');
    if (cardLink) {
      // Only cards with links get keyboard support
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'group');
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          cardLink.click();
        }
      });
    }
  });

  // =============================================
  // NAV LOGO TEXT SCRAMBLE EFFECT
  // =============================================
  var logo = document.querySelector('.nav__logo');
  if (logo && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var originalText = logo.textContent.trim();
    var scrambleChars = '!@#$%&*<>{}[]=/\\|~^';
    var isScrambling = false;

    function scrambleLogo() {
      if (isScrambling) return;
      isScrambling = true;

      var iterations = 0;
      var maxIterations = originalText.length * 3;

      var interval = setInterval(function() {
        var result = '';
        for (var i = 0; i < originalText.length; i++) {
          if (originalText[i] === '.' || originalText[i] === ' ') {
            result += originalText[i];
          } else if (iterations >= i * 3) {
            result += originalText[i];
          } else {
            result += '<span class="scramble-char scramble-char--active">' +
              scrambleChars[Math.floor(Math.random() * scrambleChars.length)] +
              '</span>';
          }
        }
        logo.innerHTML = result;
        iterations++;

        if (iterations > maxIterations) {
          clearInterval(interval);
          logo.textContent = originalText;
          isScrambling = false;
        }
      }, 35);
    }

    logo.addEventListener('mouseenter', scrambleLogo);
    logo.addEventListener('focus', scrambleLogo);
  }

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
  // SCROLL INDICATOR (hero section)
  // =============================================
  var scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 150) {
        scrollIndicator.classList.add('hidden');
      } else {
        scrollIndicator.classList.remove('hidden');
      }
    });

    scrollIndicator.addEventListener('click', function() {
      var hero = document.querySelector('.hero');
      if (hero && hero.nextElementSibling) {
        hero.nextElementSibling.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    scrollIndicator.style.cursor = 'pointer';
  }

  // =============================================
  // BACK TO TOP BUTTON WITH SCROLL PROGRESS RING
  // =============================================
  var backToTopWrap = document.querySelector('.back-to-top-wrap');
  var backToTopBtn = document.querySelector('.back-to-top');
  var progressFill = document.querySelector('.back-to-top-progress__fill');
  if (backToTopWrap && backToTopBtn) {
    // The SVG circle circumference (r=24, C=2*PI*24 ≈ 150.8)
    var circumference = 150;

    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        backToTopWrap.classList.add('visible');
      } else {
        backToTopWrap.classList.remove('visible');
      }

      // Update scroll progress ring
      if (progressFill) {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = docHeight > 0 ? scrollTop / docHeight : 0;
        var offset = circumference - (progress * circumference);
        progressFill.style.strokeDashoffset = offset;
      }
    });

    backToTopBtn.addEventListener('click', function() {
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
            keyboardHint.innerHTML =
              '<div class="shortcuts-modal">' +
                '<div class="shortcuts-modal__header">' +
                  '<strong>⌨ Keyboard Shortcuts</strong>' +
                  '<span class="shortcuts-modal__close" role="button" tabindex="0" aria-label="Close shortcuts">&times;</span>' +
                '</div>' +
                '<div class="shortcuts-modal__grid">' +
                  '<div class="shortcuts-modal__group">' +
                    '<h4 class="shortcuts-modal__group-title">Navigation</h4>' +
                    '<div class="shortcuts-modal__row"><kbd>H</kbd><span>Home</span></div>' +
                    '<div class="shortcuts-modal__row"><kbd>A</kbd><span>About</span></div>' +
                    '<div class="shortcuts-modal__row"><kbd>S</kbd><span>Services</span></div>' +
                    '<div class="shortcuts-modal__row"><kbd>P</kbd><span>Projects</span></div>' +
                    '<div class="shortcuts-modal__row"><kbd>B</kbd><span>Blog</span></div>' +
                    '<div class="shortcuts-modal__row"><kbd>I</kbd><span>Involvement</span></div>' +
                    '<div class="shortcuts-modal__row"><kbd>C</kbd><span>Contact</span></div>' +
                  '</div>' +
                  '<div class="shortcuts-modal__group">' +
                    '<h4 class="shortcuts-modal__group-title">Actions</h4>' +
                    '<div class="shortcuts-modal__row"><kbd>D</kbd><span>Toggle dark mode</span></div>' +
                    '<div class="shortcuts-modal__row"><kbd>T</kbd><span>Scroll to top</span></div>' +
                    '<div class="shortcuts-modal__row"><kbd>?</kbd><span>Toggle this panel</span></div>' +
                    '<div class="shortcuts-modal__row"><kbd>Esc</kbd><span>Close panel</span></div>' +
                  '</div>' +
                '</div>' +
              '</div>';
            keyboardHint.classList.add('visible', 'shortcuts-expanded');
            // Close button handler
            var closeBtn = keyboardHint.querySelector('.shortcuts-modal__close');
            if (closeBtn) {
              closeBtn.addEventListener('click', function() {
                shortcutsVisible = false;
                keyboardHint.classList.remove('visible', 'shortcuts-expanded');
              });
            }
          } else {
            keyboardHint.classList.remove('visible', 'shortcuts-expanded');
          }
        }
        break;
      case 'Escape':
        if (shortcutsVisible && keyboardHint) {
          shortcutsVisible = false;
          keyboardHint.classList.remove('visible', 'shortcuts-expanded');
        }
        break;
      case 'h': window.location.href = 'index.html'; break;
      case 'a': window.location.href = 'about.html'; break;
      case 's': window.location.href = 'services.html'; break;
      case 'p': window.location.href = 'projects.html'; break;
      case 'b': window.location.href = 'blog.html'; break;
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
  // FOOTER ACCESSIBILITY
  // =============================================
  var footerSections = document.querySelectorAll('.footer__section');
  footerSections.forEach(function(section) {
    var heading = section.querySelector('h4');
    if (heading && heading.textContent.trim() === 'Navigation') {
      var list = section.querySelector('.footer__links');
      if (list) {
        list.setAttribute('role', 'list');
        list.setAttribute('aria-label', 'Footer navigation');
      }
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
  // GITHUB STARS BADGES
  // =============================================
  var starBadges = document.querySelectorAll('[data-github-repo]');
  if (starBadges.length) {
    var starSvg = '<svg viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/></svg>';
    var starsCache = {};

    // Try loading cached stars from sessionStorage
    try {
      var cached = sessionStorage.getItem('github-stars-cache');
      if (cached) starsCache = JSON.parse(cached);
    } catch (e) {}

    starBadges.forEach(function(card) {
      var repo = card.getAttribute('data-github-repo');
      var badge = card.querySelector('.github-stars');
      if (!badge || !repo) return;

      // Use cache if available and fresh (< 10 min)
      if (starsCache[repo] && (Date.now() - starsCache[repo].time < 600000)) {
        badge.innerHTML = starSvg + ' ' + starsCache[repo].count;
        badge.classList.add('loaded');
        return;
      }

      fetch('https://api.github.com/repos/' + repo)
        .then(function(res) { return res.json(); })
        .then(function(data) {
          if (typeof data.stargazers_count === 'number') {
            var count = data.stargazers_count;
            badge.innerHTML = starSvg + ' ' + count;
            badge.classList.add('loaded');
            starsCache[repo] = { count: count, time: Date.now() };
            try {
              sessionStorage.setItem('github-stars-cache', JSON.stringify(starsCache));
            } catch (e) {}
          }
        })
        .catch(function() {
          // Silently fail - badge stays hidden
        });
    });
  }

  // =============================================
  // COPY TO CLIPBOARD FOR CODE BLOCKS
  // =============================================
  var codeBlocks = document.querySelectorAll('pre');
  codeBlocks.forEach(function(pre) {
    var btn = document.createElement('button');
    btn.className = 'code-copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');
    btn.type = 'button';

    btn.addEventListener('click', function() {
      var code = pre.querySelector('code');
      var text = code ? code.textContent : pre.textContent;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
          btn.textContent = 'Copied!';
          btn.classList.add('code-copy-btn--copied');
          setTimeout(function() {
            btn.textContent = 'Copy';
            btn.classList.remove('code-copy-btn--copied');
          }, 2000);
        });
      } else {
        // Fallback for older browsers
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          btn.textContent = 'Copied!';
          btn.classList.add('code-copy-btn--copied');
          setTimeout(function() {
            btn.textContent = 'Copy';
            btn.classList.remove('code-copy-btn--copied');
          }, 2000);
        } catch (err) {
          btn.textContent = 'Error';
        }
        document.body.removeChild(textarea);
      }
    });

    pre.style.position = 'relative';
    pre.appendChild(btn);
  });

  // =============================================
  // LAZY LOADING IMAGES WITH BLUR-UP
  // =============================================
  var lazyImages = document.querySelectorAll('.lazy-image__img[data-src]');
  if (lazyImages.length && 'IntersectionObserver' in window) {
    var lazyObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          var src = img.getAttribute('data-src');
          var srcset = img.getAttribute('data-srcset');

          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
          }
          if (srcset) {
            img.srcset = srcset;
            img.removeAttribute('data-srcset');
          }

          img.addEventListener('load', function() {
            img.classList.add('loaded');
          });

          // If image is already cached
          if (img.complete && img.naturalWidth > 0) {
            img.classList.add('loaded');
          }

          lazyObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px',
      threshold: 0.01
    });

    lazyImages.forEach(function(img) {
      lazyObserver.observe(img);
    });
  } else {
    // Fallback: load all images immediately
    lazyImages.forEach(function(img) {
      var src = img.getAttribute('data-src');
      if (src) {
        img.src = src;
        img.removeAttribute('data-src');
        img.addEventListener('load', function() {
          img.classList.add('loaded');
        });
      }
    });
  }

  // =============================================
  // ANIMATED STATS COUNTER
  // =============================================
  var statCards = document.querySelectorAll('.stat-card');
  if (statCards.length && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var statsObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var card = entry.target;
          var numberEl = card.querySelector('.stat-card__number');
          if (!numberEl || card.classList.contains('counted')) return;

          card.classList.add('counted');
          var target = parseInt(numberEl.getAttribute('data-count'), 10);
          var suffix = numberEl.getAttribute('data-suffix') || '';
          var duration = 1200;
          var startTime = null;

          function animateCount(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease-out cubic for satisfying deceleration
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.round(eased * target);
            numberEl.textContent = current + suffix;
            if (progress < 1) {
              requestAnimationFrame(animateCount);
            }
          }

          requestAnimationFrame(animateCount);
          statsObserver.unobserve(card);
        }
      });
    }, {
      threshold: 0.3
    });

    statCards.forEach(function(card) {
      statsObserver.observe(card);
    });
  } else if (statCards.length) {
    // Fallback: just show final numbers immediately
    statCards.forEach(function(card) {
      var numberEl = card.querySelector('.stat-card__number');
      if (numberEl) {
        var target = numberEl.getAttribute('data-count') || '0';
        var suffix = numberEl.getAttribute('data-suffix') || '';
        numberEl.textContent = target + suffix;
        card.classList.add('counted');
      }
    });
  }

  // =============================================
  // ARTICLE SHARE BUTTONS
  // =============================================
  var shareButtons = document.querySelectorAll('[data-share]');
  if (shareButtons.length) {
    var pageUrl = encodeURIComponent(window.location.href);
    var pageTitle = encodeURIComponent(document.title);

    shareButtons.forEach(function(btn) {
      var type = btn.getAttribute('data-share');

      if (type === 'x') {
        btn.href = 'https://x.com/intent/tweet?url=' + pageUrl + '&text=' + pageTitle;
      } else if (type === 'linkedin') {
        btn.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + pageUrl;
      } else if (type === 'copy') {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          var url = window.location.href;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(function() {
              btn.classList.add('copied');
              btn.querySelector('svg').nextSibling.textContent = ' Copied!';
              setTimeout(function() {
                btn.classList.remove('copied');
                btn.querySelector('svg').nextSibling.textContent = ' Copy Link';
              }, 2000);
            });
          } else {
            var textarea = document.createElement('textarea');
            textarea.value = url;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
              document.execCommand('copy');
              btn.classList.add('copied');
              btn.querySelector('svg').nextSibling.textContent = ' Copied!';
              setTimeout(function() {
                btn.classList.remove('copied');
                btn.querySelector('svg').nextSibling.textContent = ' Copy Link';
              }, 2000);
            } catch (err) {}
            document.body.removeChild(textarea);
          }
        });
      }
    });
  }

  // =============================================
  // SMOOTH PAGE TRANSITIONS — neobrutalist stripe wipe
  // =============================================
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Create overlay with 4 color stripes
    var overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    for (var si = 0; si < 4; si++) {
      var stripe = document.createElement('div');
      stripe.className = 'page-transition-overlay__stripe';
      overlay.appendChild(stripe);
    }
    document.body.appendChild(overlay);

    // Play entrance animation (stripes retract) if we came via a transition
    if (sessionStorage.getItem('page-transition') === '1') {
      sessionStorage.removeItem('page-transition');
      overlay.classList.add('page-transition-overlay--enter');
      // Remove overlay after animation completes
      setTimeout(function() {
        overlay.classList.remove('page-transition-overlay--enter');
      }, 600);
    }

    // Intercept internal link clicks for exit transition
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
      sessionStorage.setItem('page-transition', '1');
      document.body.classList.add('page-transitioning');

      // Navigate after stripes finish covering the screen
      setTimeout(function() {
        window.location.href = href;
      }, 400);
    });
  }

  // =============================================
  // AUTO-GENERATED TABLE OF CONTENTS (Blog Articles)
  // =============================================
  (function() {
    var articleBody = document.querySelector('.article__body');
    if (!articleBody) return;

    var headings = articleBody.querySelectorAll('h2');
    if (headings.length < 2) return; // Only show TOC for articles with 2+ sections

    // Assign IDs to headings
    headings.forEach(function(h, i) {
      if (!h.id) {
        h.id = 'section-' + (i + 1);
      }
    });

    // Build TOC element
    var toc = document.createElement('nav');
    toc.className = 'article-toc';
    toc.setAttribute('aria-label', 'Table of contents');

    var toggleBtn = document.createElement('button');
    toggleBtn.className = 'article-toc__toggle';
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.innerHTML = '<span>Table of Contents</span>' +
      '<svg class="article-toc__toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square">' +
      '<polyline points="6 9 12 15 18 9"/></svg>';

    var list = document.createElement('ol');
    list.className = 'article-toc__list';

    headings.forEach(function(h, i) {
      var li = document.createElement('li');
      li.className = 'article-toc__item';
      var a = document.createElement('a');
      a.className = 'article-toc__link';
      a.href = '#' + h.id;
      a.setAttribute('data-index', String(i + 1).padStart(2, '0'));
      a.textContent = h.textContent;
      li.appendChild(a);
      list.appendChild(li);
    });

    toc.appendChild(toggleBtn);
    toc.appendChild(list);

    // Insert TOC after article header
    var articleHeader = document.querySelector('.article__header');
    if (articleHeader && articleHeader.nextSibling) {
      articleHeader.parentNode.insertBefore(toc, articleHeader.nextSibling);
    }

    // Toggle collapse
    toggleBtn.addEventListener('click', function() {
      var isCollapsed = toc.classList.toggle('article-toc--collapsed');
      toggleBtn.setAttribute('aria-expanded', String(!isCollapsed));
    });

    // Smooth scroll for TOC links
    var tocLinks = list.querySelectorAll('.article-toc__link');
    tocLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          var navHeight = document.querySelector('.nav') ? document.querySelector('.nav').offsetHeight : 0;
          var y = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    });

    // Highlight active section on scroll
    var tocLinkEls = Array.prototype.slice.call(tocLinks);
    var headingEls = Array.prototype.slice.call(headings);

    function updateActiveTocLink() {
      var navHeight = document.querySelector('.nav') ? document.querySelector('.nav').offsetHeight : 0;
      var scrollPos = window.pageYOffset + navHeight + 60;
      var activeIndex = 0;

      for (var i = 0; i < headingEls.length; i++) {
        if (headingEls[i].offsetTop <= scrollPos) {
          activeIndex = i;
        }
      }

      tocLinkEls.forEach(function(link, i) {
        link.classList.toggle('article-toc__link--active', i === activeIndex);
      });
    }

    var tocScrollTimeout;
    window.addEventListener('scroll', function() {
      if (tocScrollTimeout) return;
      tocScrollTimeout = setTimeout(function() {
        tocScrollTimeout = null;
        updateActiveTocLink();
      }, 100);
    });
    updateActiveTocLink();
  })();

  // =============================================
  // AUTO-UPDATE COPYRIGHT YEAR
  // =============================================
  document.querySelectorAll('.copyright-year').forEach(function(el) {
    el.textContent = new Date().getFullYear();
  });
});
