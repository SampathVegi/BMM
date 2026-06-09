/* =============================================
   BEACH MONKEYS MEDIA — CAREERS JS
   Handles: particle canvas, navbar scroll,
   mobile menu, magnetic buttons, scroll reveal,
   job filters, FAQ accordion, form validation
   & submission
============================================= */

(function () {
  'use strict';

  /* ── 1. PARTICLE CANVAS ─────────────────── */
  (function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    const COLORS = [
      'rgba(29,174,255,',
      'rgba(255,138,61,',
      'rgba(255,200,61,',
      'rgba(60,179,113,'
    ];
    const cursor = document.getElementById('custom-cursor');

  window.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.12,
    ease: 'power2.out',
    overwrite: true
  });
});
    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function Particle() {
      this.reset = function () {
        this.x     = Math.random() * W;
        this.y     = Math.random() * H;
        this.r     = Math.random() * 1.5 + 0.5;
        this.vx    = (Math.random() - 0.5) * 0.3;
        this.vy    = -(Math.random() * 0.5 + 0.2);
        this.alpha = Math.random() * 0.25 + 0.05;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.life  = 0;
        this.maxLife = Math.random() * 200 + 150;
      };
      this.reset();
    }

    function init() {
      particles = [];
      const count = Math.min(120, Math.floor((W * H) / 14000));
      for (let i = 0; i < count; i++) {
        const p = new Particle();
        p.life = Math.random() * p.maxLife; // scatter initial ages
        particles.push(p);
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(function (p) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // fade in / fade out
        const progress = p.life / p.maxLife;
        let a;
        if (progress < 0.1)      a = p.alpha * (progress / 0.1);
        else if (progress > 0.85) a = p.alpha * (1 - (progress - 0.85) / 0.15);
        else                      a = p.alpha;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + a + ')';
        ctx.fill();

        if (p.life >= p.maxLife) p.reset();
      });
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', function () {
      resize();
      init();
    });

    resize();
    init();
    draw();
  }());


  /* ── 2. NAVBAR SCROLL EFFECT ────────────── */
  (function initNavbar() {
    const header = document.getElementById('cnHeader');
    if (!header) return;

    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }());


  /* ── 3. MOBILE MENU ──────────────────────── */
  (function initMobileMenu() {
  const btn = document.getElementById('cnHamburger');
  const menu = document.getElementById('cnMobileMenu');
  const header = document.getElementById('cnHeader');

  if (!btn || !menu || !header) return;

  // Toggle menu
  btn.addEventListener('click', function (e) {
    e.stopPropagation();

    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Prevent clicks inside menu from closing it
  menu.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  // Close when clicking outside
  document.addEventListener('click', function (e) {
    if (
      !header.contains(e.target) &&
      !menu.contains(e.target)
    ) {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}());


  /* ── 4. SCROLL REVEAL ────────────────────── */
  (function initScrollReveal() {
    const items = document.querySelectorAll('.reveal-up');
    if (!items.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach(function (el) { observer.observe(el); });
  }());


  /* ── 5. MAGNETIC BUTTONS ─────────────────── */
  (function initMagneticBtns() {
    const btns = document.querySelectorAll('.magnetic-btn');
    btns.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        const r   = btn.getBoundingClientRect();
        const x   = e.clientX - r.left - r.width  / 2;
        const y   = e.clientY - r.top  - r.height / 2;
        const mag = 0.25;
        btn.style.transform = 'translate(' + (x * mag) + 'px,' + (y * mag) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }());


  /* ── 6. JOB FILTERS ──────────────────────── */
 (function initFilters() {
  const filterBtns = document.querySelectorAll('.opening-filters button');
  const cards = document.querySelectorAll('.opening-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) {
        b.classList.remove('active');
      });

      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(function (card) {
        const show =
          filter === 'all' ||
          card.classList.contains(filter);

        if (show) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}());


  /* ── 7. FAQ ACCORDION ────────────────────── */
  (function initFAQ() {
    const items = document.querySelectorAll('.cn-faq-item');
    items.forEach(function (item) {
      const trigger = item.querySelector('.cn-faq-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // close all
        items.forEach(function (i) {
          i.classList.remove('open');
          i.querySelector('.cn-faq-trigger').setAttribute('aria-expanded', 'false');
        });

        // open clicked if it was closed
        if (!isOpen) {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }());


  /* ── 8. FORM VALIDATION & SUBMISSION ─────── */
  (function initForm() {
    const form       = document.getElementById('careerForm');
    const successBox = document.getElementById('formSuccess');
    const resetBtn   = document.getElementById('resetFormBtn');
    if (!form) return;

    /* helpers */
    function getField(id) { return document.getElementById(id); }
    function getGroup(id) { return document.getElementById('fg-' + id); }
    function getError(id) { return document.getElementById('err-' + id); }

    function setValid(id) {
      var g = getGroup(id); var e = getError(id);
      if (!g || !e) return;
      g.classList.remove('invalid'); g.classList.add('valid');
      e.textContent = '';
    }
    function setInvalid(id, msg) {
      var g = getGroup(id); var e = getError(id);
      if (!g || !e) return;
      g.classList.remove('valid'); g.classList.add('invalid');
      e.textContent = msg;
    }
    function clearState(id) {
      var g = getGroup(id); var e = getError(id);
      if (!g || !e) return;
      g.classList.remove('valid', 'invalid');
      e.textContent = '';
    }

    /* validators */
    function validateFirstName() {
      var v = getField('firstName').value.trim();
      if (!v)              { setInvalid('firstName', 'First name is required.'); return false; }
      if (v.length < 2)    { setInvalid('firstName', 'Minimum 2 characters.'); return false; }
      if (!/^[A-Za-z\s]+$/.test(v)) { setInvalid('firstName', 'Only letters and spaces allowed.'); return false; }
      setValid('firstName'); return true;
    }
    function validateLastName() {
      var v = getField('lastName').value.trim();
      if (!v)              { setInvalid('lastName', 'Last name is required.'); return false; }
      if (v.length < 2)    { setInvalid('lastName', 'Minimum 2 characters.'); return false; }
      if (!/^[A-Za-z\s]+$/.test(v)) { setInvalid('lastName', 'Only letters and spaces allowed.'); return false; }
      setValid('lastName'); return true;
    }
    function validateEmail() {
      var v = getField('email').value.trim();
      if (!v) { setInvalid('email', 'Email address is required.'); return false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { setInvalid('email', 'Please enter a valid email address.'); return false; }
      setValid('email'); return true;
    }
    function validatePhone() {
      var v = getField('phone').value.trim();
      if (!v)           { setInvalid('phone', 'Phone number is required.'); return false; }
      if (!/^\d{10}$/.test(v)) { setInvalid('phone', 'Must be exactly 10 digits.'); return false; }
      setValid('phone'); return true;
    }
    function validateRole() {
      var v = getField('role').value;
      if (!v) { setInvalid('role', 'Please select a role.'); return false; }
      setValid('role'); return true;
    }
    function validatePortfolio() {
      var v = getField('portfolio').value.trim();
      if (!v) { clearState('portfolio'); return true; } // optional
      try { new URL(v); setValid('portfolio'); return true; }
      catch (_) { setInvalid('portfolio', 'Please enter a valid URL (e.g. https://...).'); return false; }
    }
    function validateAbout() {
      var v = getField('about').value.trim();
      if (!v)           { setInvalid('about', 'Please tell us about yourself.'); return false; }
      if (v.length < 30) { setInvalid('about', 'Minimum 30 characters required (' + v.length + ' so far).'); return false; }
      setValid('about'); return true;
    }

    /* real-time listeners */
    var fields = ['firstName','lastName','email','phone','role','portfolio','about'];
    var validatorMap = {
      firstName: validateFirstName,
      lastName:  validateLastName,
      email:     validateEmail,
      phone:     validatePhone,
      role:      validateRole,
      portfolio: validatePortfolio,
      about:     validateAbout
    };

    fields.forEach(function (id) {
      var el = getField(id);
      if (!el) return;
      var evt = (el.tagName === 'SELECT') ? 'change' : 'input';
      el.addEventListener(evt, function () {
        // only validate if user has started typing or field was already touched
        if (getGroup(id).classList.contains('invalid') || el.value.trim()) {
          validatorMap[id]();
        }
      });
    });

    // phone: only allow digits
    var phoneEl = getField('phone');
    if (phoneEl) {
      phoneEl.addEventListener('keypress', function (e) {
        if (!/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
          e.preventDefault();
        }
      });
    }

    // char count for about
    var aboutEl    = getField('about');
    var charCount  = document.getElementById('charCount');
    if (aboutEl && charCount) {
      aboutEl.addEventListener('input', function () {
        var len = aboutEl.value.trim().length;
        charCount.textContent = len + ' / 30 min';
        charCount.style.color = len >= 30 ? 'var(--green)' : 'rgba(255,255,255,0.3)';
      });
    }

    /* submit */
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = [
        validateFirstName(),
        validateLastName(),
        validateEmail(),
        validatePhone(),
        validateRole(),
        validatePortfolio(),
        validateAbout()
      ].every(Boolean);

      if (!valid) {
        // scroll to first invalid field
        var firstInvalid = form.querySelector('.invalid input, .invalid select, .invalid textarea');
        if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // loading state
      var submitBtn = document.getElementById('submitBtn');
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');

      var formData = {};
      fields.forEach(function (id) {
        formData[id] = getField(id).value.trim();
      });

      fetch(
        'https://script.google.com/macros/s/AKfycbxrTSrhC_YAb2ky047ywOeGuS5dzJjHXO0kVhgpfft3nVLHskhzB7znkTTWnLfsz8VYVw/exec',
        {
          method:  'POST',
          mode:    'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(formData)
        }
      )
      .then(function () {
        // show success
        form.classList.add('hidden');
        successBox.classList.add('show');
      })
      .catch(function () {
        alert('Something went wrong. Please try again or email us directly.');
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
      });
    });

    /* reset / submit another */
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        form.reset();
        fields.forEach(function (id) { clearState(id); });
        if (charCount) {
          charCount.textContent = '0 / 30 min';
          charCount.style.color = 'rgba(255,255,255,0.3)';
        }
        form.classList.remove('hidden');
        successBox.classList.remove('show');
        var submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
      });
    }
  }());

}());
