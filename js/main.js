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

  // =============================================
  // BASEL LOCAL TIME (Contact Page)
  // =============================================
  var baselTimeEl = document.getElementById('basel-time');
  if (baselTimeEl) {
    function updateBaselTime() {
      try {
        var now = new Date();
        var formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Zurich',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
        var timeStr = formatter.format(now);
        baselTimeEl.textContent = timeStr;

        // Determine business hours (Mon-Fri 9:00-18:00 CET/CEST)
        var dayFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Europe/Zurich',
          weekday: 'short'
        });
        var hourFormatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Zurich',
          hour: 'numeric',
          hour12: false
        });
        var day = dayFormatter.format(now);
        var hour = parseInt(hourFormatter.format(now), 10);
        var isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].indexOf(day) !== -1;
        var isBusinessHours = isWeekday && hour >= 9 && hour < 18;

        // Add or update status badge
        var statusEl = baselTimeEl.parentElement.querySelector('.local-time__status');
        if (!statusEl) {
          statusEl = document.createElement('span');
          statusEl.className = 'local-time__status';
          baselTimeEl.parentElement.appendChild(statusEl);
        }
        if (isBusinessHours) {
          statusEl.className = 'local-time__status local-time__status--available';
          statusEl.textContent = '● Available';
        } else {
          statusEl.className = 'local-time__status local-time__status--off-hours';
          statusEl.textContent = 'Off hours';
        }
      } catch (e) {
        baselTimeEl.textContent = '--:--';
      }
    }

    updateBaselTime();
    setInterval(updateBaselTime, 30000); // Update every 30 seconds
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

      // Enable smooth color transition, then remove after animation
      document.documentElement.classList.add('theme-transitioning');
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon();

      // Update theme-color meta tag to match current theme
      var themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (!themeColorMeta) {
        themeColorMeta = document.createElement('meta');
        themeColorMeta.name = 'theme-color';
        document.head.appendChild(themeColorMeta);
      }
      themeColorMeta.setAttribute('content', newTheme === 'dark' ? '#1A1A1A' : '#FFE500');

      setTimeout(function() {
        document.documentElement.classList.remove('theme-transitioning');
      }, 450);
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
  // BLOG POST FILTER (Blog page)
  // =============================================
  var blogFilterBtns = document.querySelectorAll('.blog-filter__btn');
  var blogGrid = document.getElementById('blog-grid');

  if (blogFilterBtns.length && blogGrid) {
    blogFilterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var filter = btn.getAttribute('data-filter');

        // Update active button
        blogFilterBtns.forEach(function(b) {
          b.classList.remove('active');
          b.classList.remove('btn--primary');
          b.classList.add('btn--outline');
        });
        btn.classList.add('active');
        btn.classList.remove('btn--outline');
        btn.classList.add('btn--primary');

        // Filter blog cards
        var cards = blogGrid.querySelectorAll('.blog-card');
        var visibleCount = 0;

        cards.forEach(function(card, index) {
          var categories = (card.getAttribute('data-categories') || '').split(/\s+/);
          var show = filter === 'all' || categories.indexOf(filter) !== -1;

          if (show) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout((function(el) {
              return function() {
                el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
              };
            })(card), 50 + (visibleCount * 80));
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        // Show "no posts" message if nothing matches
        var emptyMsg = blogGrid.querySelector('.blog-grid__empty');
        if (visibleCount === 0) {
          if (!emptyMsg) {
            emptyMsg = document.createElement('p');
            emptyMsg.className = 'blog-grid__empty';
            emptyMsg.style.cssText = 'grid-column: 1/-1; text-align: center; padding: var(--space-xl); font-size: var(--text-lg); color: var(--color-text-muted); font-family: var(--font-heading); font-weight: 700; border: var(--border-thick); border-style: dashed;';
            emptyMsg.textContent = 'No posts in this category yet — stay tuned!';
            blogGrid.appendChild(emptyMsg);
          }
          emptyMsg.style.display = '';
        } else if (emptyMsg) {
          emptyMsg.style.display = 'none';
        }
      });
    });
  }

  // =============================================
  // BLOG SEARCH
  // =============================================
  var blogSearchInput = document.getElementById('blog-search');
  var blogSearchClear = document.getElementById('blog-search-clear');
  var blogSearchCount = document.getElementById('blog-search-count');

  if (blogSearchInput && blogGrid) {
    // Store original HTML for each card so we can restore after highlight
    var blogCards = blogGrid.querySelectorAll('.blog-card');
    var cardData = [];
    blogCards.forEach(function(card) {
      var titleEl = card.querySelector('.blog-card__title');
      var excerptEl = card.querySelector('.blog-card__excerpt');
      cardData.push({
        el: card,
        titleEl: titleEl,
        excerptEl: excerptEl,
        titleText: titleEl ? titleEl.textContent : '',
        excerptText: excerptEl ? excerptEl.textContent : '',
        titleHTML: titleEl ? titleEl.innerHTML : '',
        excerptHTML: excerptEl ? excerptEl.innerHTML : ''
      });
    });

    var searchNoResults = null;
    var searchDebounce = null;

    function highlightText(text, query) {
      if (!query) return text;
      var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      var re = new RegExp('(' + escaped + ')', 'gi');
      return text.replace(re, '<span class="blog-search-highlight">$1</span>');
    }

    function performBlogSearch(query) {
      query = query.trim().toLowerCase();

      // Show/hide clear button
      if (blogSearchClear) {
        blogSearchClear.hidden = !query;
      }

      // Reset highlights if no query
      if (!query) {
        cardData.forEach(function(d) {
          d.el.style.display = '';
          d.el.style.opacity = '1';
          d.el.style.transform = '';
          if (d.titleEl) d.titleEl.innerHTML = d.titleHTML;
          if (d.excerptEl) d.excerptEl.innerHTML = d.excerptHTML;
        });
        if (searchNoResults) {
          searchNoResults.style.display = 'none';
        }
        if (blogSearchCount) blogSearchCount.textContent = '';
        return;
      }

      var visibleCount = 0;
      // Also check active category filter
      var activeFilter = 'all';
      var activeBtn = document.querySelector('.blog-filter__btn.active');
      if (activeBtn) {
        activeFilter = activeBtn.getAttribute('data-filter') || 'all';
      }

      cardData.forEach(function(d, index) {
        var categories = (d.el.getAttribute('data-categories') || '').split(/\s+/);
        var categoryMatch = activeFilter === 'all' || categories.indexOf(activeFilter) !== -1;
        var titleMatch = d.titleText.toLowerCase().indexOf(query) !== -1;
        var excerptMatch = d.excerptText.toLowerCase().indexOf(query) !== -1;
        var textMatch = titleMatch || excerptMatch;

        if (categoryMatch && textMatch) {
          d.el.style.display = '';
          d.el.style.opacity = '0';
          d.el.style.transform = 'translateY(10px)';
          setTimeout((function(el) {
            return function() {
              el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            };
          })(d.el), 50 + (visibleCount * 80));
          visibleCount++;

          // Highlight matches
          if (d.titleEl && titleMatch) {
            // Preserve the link inside title
            var titleLink = d.titleEl.querySelector('a');
            if (titleLink) {
              titleLink.innerHTML = highlightText(d.titleText, query);
            }
          } else if (d.titleEl) {
            var tLink = d.titleEl.querySelector('a');
            if (tLink) tLink.innerHTML = d.titleText;
          }
          if (d.excerptEl) {
            d.excerptEl.innerHTML = excerptMatch
              ? highlightText(d.excerptText, query)
              : d.excerptHTML;
          }
        } else {
          d.el.style.display = 'none';
          // Reset highlights on hidden cards
          if (d.titleEl) {
            var tl = d.titleEl.querySelector('a');
            if (tl) tl.textContent = d.titleText;
          }
          if (d.excerptEl) d.excerptEl.innerHTML = d.excerptHTML;
        }
      });

      // Update count
      if (blogSearchCount) {
        var total = cardData.length;
        blogSearchCount.textContent = visibleCount + ' of ' + total + ' article' + (total !== 1 ? 's' : '') + ' match' + (visibleCount !== 1 ? '' : 'es');
      }

      // No results message
      if (visibleCount === 0) {
        if (!searchNoResults) {
          searchNoResults = document.createElement('div');
          searchNoResults.className = 'blog-search__no-results';
          searchNoResults.innerHTML = '<span>🔍</span>No articles found for "<strong></strong>"<br><small>Try a different search term</small>';
          blogGrid.appendChild(searchNoResults);
        }
        searchNoResults.querySelector('strong').textContent = query;
        searchNoResults.style.display = '';
        // Hide the category empty msg if present
        var catEmpty = blogGrid.querySelector('.blog-grid__empty');
        if (catEmpty) catEmpty.style.display = 'none';
      } else if (searchNoResults) {
        searchNoResults.style.display = 'none';
      }
    }

    blogSearchInput.addEventListener('input', function() {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(function() {
        performBlogSearch(blogSearchInput.value);
      }, 200);
    });

    if (blogSearchClear) {
      blogSearchClear.addEventListener('click', function() {
        blogSearchInput.value = '';
        performBlogSearch('');
        blogSearchInput.focus();
      });
    }

    // Re-run search when category filter changes
    blogFilterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (blogSearchInput.value.trim()) {
          setTimeout(function() {
            performBlogSearch(blogSearchInput.value);
          }, 50);
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

  // Resolve base path so shortcuts work from any subdirectory (e.g. /blog/)
  function getBasePath() {
    var path = window.location.pathname;
    // If we're in a subdirectory (e.g. /blog/some-article.html), go up
    var depth = (path.match(/\//g) || []).length - 1;
    if (depth <= 0) return '';
    var prefix = '';
    for (var d = 0; d < depth; d++) prefix += '../';
    return prefix;
  }

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
      case 'h': window.location.href = getBasePath() + 'index.html'; break;
      case 'a': window.location.href = getBasePath() + 'about.html'; break;
      case 's': window.location.href = getBasePath() + 'services.html'; break;
      case 'p': window.location.href = getBasePath() + 'projects.html'; break;
      case 'b': window.location.href = getBasePath() + 'blog.html'; break;
      case 'i': window.location.href = getBasePath() + 'involvement.html'; break;
      case 'c': window.location.href = getBasePath() + 'contact.html'; break;
      case 'd':
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        var newTheme = isDark ? 'light' : 'dark';
        document.documentElement.classList.add('theme-transitioning');
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
        setTimeout(function() {
          document.documentElement.classList.remove('theme-transitioning');
        }, 450);
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
  // HEADING ANCHOR LINKS
  // =============================================
  (function() {
    // Add anchor links to h2 and h3 headings inside main content
    var main = document.getElementById('main-content');
    if (!main) return;

    var headings = main.querySelectorAll('h2, h3');
    var usedIds = {};

    headings.forEach(function(heading) {
      // Skip headings inside nav, breadcrumb, or that already have anchors
      if (heading.closest('.breadcrumb, nav, .article-toc')) return;
      if (heading.querySelector('.heading-anchor')) return;

      // Generate a slug from text content
      var text = heading.textContent.trim();
      var slug = text.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 60);

      if (!slug) return;

      // Ensure unique IDs
      if (usedIds[slug]) {
        usedIds[slug]++;
        slug = slug + '-' + usedIds[slug];
      } else {
        usedIds[slug] = 1;
      }

      heading.id = slug;

      var anchor = document.createElement('a');
      anchor.className = 'heading-anchor';
      anchor.href = '#' + slug;
      anchor.setAttribute('aria-label', 'Link to section: ' + text);
      anchor.textContent = '#';
      heading.appendChild(anchor);
    });
  })();

  // =============================================
  // AUTO-GENERATED TABLE OF CONTENTS (Blog Articles)
  // Runs after heading anchors so we get proper slug-based IDs
  // =============================================
  (function() {
    var articleBody = document.querySelector('.article__body');
    if (!articleBody) return;

    var headings = articleBody.querySelectorAll('h2:not(.related-posts__title)');
    if (headings.length < 2) return; // Only show TOC for articles with 2+ sections

    // Fallback IDs if heading anchors didn't assign them
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
      // Strip the anchor '#' symbol appended by heading-anchor links
      var anchorEl = h.querySelector('.heading-anchor');
      a.textContent = anchorEl
        ? h.textContent.replace(/\s*#$/, '').trim()
        : h.textContent.trim();
      li.appendChild(a);
      list.appendChild(li);
    });

    toc.appendChild(toggleBtn);
    toc.appendChild(list);

    // Insert TOC at the start of article body (before first paragraph)
    articleBody.insertBefore(toc, articleBody.firstChild);

    // Toggle collapse/expand
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
  // FONT SIZE ADJUSTER (Blog Articles)
  // =============================================
  (function() {
    var articleBody = document.querySelector('.article__body');
    var articleMeta = document.querySelector('.article__meta');
    if (!articleBody || !articleMeta) return;

    var sizes = ['small', 'normal', 'large', 'xlarge'];
    var labels = ['A−', 'A', 'A+', 'A++'];
    var stored = localStorage.getItem('article-font-size');
    var currentSize = sizes.indexOf(stored) !== -1 ? stored : 'normal';

    // Apply stored preference immediately
    articleBody.setAttribute('data-font-size', currentSize);

    // Create toolbar wrapper
    var toolbar = document.createElement('div');
    toolbar.className = 'article__toolbar';

    // Move existing meta content into toolbar
    var metaParent = articleMeta.parentNode;
    metaParent.insertBefore(toolbar, articleMeta.nextSibling);

    // Build the adjuster
    var adjuster = document.createElement('div');
    adjuster.className = 'font-size-adjuster';
    adjuster.setAttribute('role', 'group');
    adjuster.setAttribute('aria-label', 'Adjust font size');

    var adjLabel = document.createElement('span');
    adjLabel.className = 'font-size-adjuster__label';
    adjLabel.textContent = 'Size';
    adjuster.appendChild(adjLabel);

    var buttons = [];
    sizes.forEach(function(size, i) {
      var btn = document.createElement('button');
      btn.className = 'font-size-adjuster__btn';
      btn.textContent = labels[i];
      btn.setAttribute('aria-label', 'Font size: ' + size);
      btn.setAttribute('aria-pressed', size === currentSize ? 'true' : 'false');
      btn.setAttribute('type', 'button');
      btn.addEventListener('click', function() {
        currentSize = size;
        articleBody.setAttribute('data-font-size', size);
        localStorage.setItem('article-font-size', size);
        buttons.forEach(function(b, j) {
          b.setAttribute('aria-pressed', sizes[j] === size ? 'true' : 'false');
        });
      });
      buttons.push(btn);
      adjuster.appendChild(btn);
    });

    toolbar.appendChild(adjuster);
  })();

  // =============================================
  // AUTO-UPDATE COPYRIGHT YEAR
  // =============================================
  document.querySelectorAll('.copyright-year').forEach(function(el) {
    el.textContent = new Date().getFullYear();
  });

  // =============================================
  // FAQ ACCORDION
  // =============================================
  document.querySelectorAll('.faq-toggle').forEach(function(toggle) {
    var item = toggle.closest('.faq-item');
    var panel = item.querySelector('.faq-panel');
    if (!panel) return;

    // Generate unique ID for ARIA relationship
    var id = 'faq-panel-' + Math.random().toString(36).substr(2, 6);
    panel.id = id;
    toggle.setAttribute('aria-controls', id);

    toggle.addEventListener('click', function() {
      var isOpen = item.hasAttribute('open');

      if (isOpen) {
        // Collapse: animate max-height to 0, then remove open
        panel.style.maxHeight = panel.scrollHeight + 'px';
        // Force reflow
        panel.offsetHeight;
        panel.style.maxHeight = '0';
        toggle.setAttribute('aria-expanded', 'false');

        var onTransitionEnd = function() {
          item.removeAttribute('open');
          panel.removeEventListener('transitionend', onTransitionEnd);
        };
        panel.addEventListener('transitionend', onTransitionEnd);
      } else {
        // Expand: set open, then animate max-height
        item.setAttribute('open', '');
        toggle.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';

        // After animation, remove inline max-height so content can reflow
        var onOpen = function() {
          panel.style.maxHeight = 'none';
          panel.removeEventListener('transitionend', onOpen);
        };
        panel.addEventListener('transitionend', onOpen);
      }
    });
  });
});
