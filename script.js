/* ============================================
   ARCHISHA GUPTA — PORTFOLIO LANDING PAGE
   script.js — Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================
     1. MOBILE NAV BURGER TOGGLE
     ============================ */
  const burger = document.getElementById('nav-burger');
  const drawer = document.getElementById('nav-drawer');

  if (burger && drawer) {
    burger.addEventListener('click', () => {
      drawer.classList.toggle('open');
      const spans = burger.querySelectorAll('span');
      const isOpen = drawer.classList.contains('open');

      if (isOpen) {
        spans[0].style.transform = 'translateY(7.5px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7.5px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close drawer when a link inside is clicked
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        const spans = burger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  /* ============================
     2. ACTIVE NAV LINK ON SCROLL
     ============================ */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinkEls = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ============================
     3. SCROLL REVEAL ANIMATIONS
     ============================ */
  const reveals = document.querySelectorAll('.reveal');

  // First add animate-in so they start hidden (only when JS runs)
  reveals.forEach(el => el.classList.add('animate-in'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  /* ============================
     4. STICKY NAV SHADOW ON SCROLL
     ============================ */
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.style.boxShadow = '0 4px 0px #0a0a0a';
    } else {
      nav.style.boxShadow = 'none';
    }
  }, { passive: true });

  /* ============================
     5. SPEECH BUBBLE ROTATION
     ============================ */
  const bubbleMessages = [
    'Crafting digital solutions that scale, impact, and look amazing. ✨',
    'Passionate about clean code and stunning design! 💻',
    'Building experiences people love to use. 🚀',
    'Turning ideas into interactive web realities! 🌐',
  ];

  const bubble = document.getElementById('speech-bubble');
  if (bubble) {
    let bubbleIndex = 0;
    setInterval(() => {
      bubbleIndex = (bubbleIndex + 1) % bubbleMessages.length;
      bubble.style.opacity = '0';
      bubble.style.transform = 'translateY(5px) rotate(0deg)';
      setTimeout(() => {
        bubble.textContent = bubbleMessages[bubbleIndex];
        bubble.style.opacity = '1';
        bubble.style.transform = '';
      }, 400);
    }, 4000);

    bubble.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  }

  /* ============================
     6. PROJECT ITEM HOVER TILT
     ============================ */
  document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.background = 'var(--off-white)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.background = '';
    });
  });

  /* ============================
     7. SMOOTH SCROLL FOR ALL #LINKS
     ============================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 64;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ============================
     8. SKILL ITEM MICRO-ANIMATIONS
     ============================ */
  document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-4px) scale(1.03)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });

  /* ============================
     9. AVATAR EMOJI CYCLE
     ============================ */
  const avatarEmojis = ['👩‍💻', '🎨', '🌟', '💡', '🚀', '✨'];
  const avatarEl = document.getElementById('hero-avatar');
  if (avatarEl) {
    let emojiIdx = 0;
    setInterval(() => {
      emojiIdx = (emojiIdx + 1) % avatarEmojis.length;
      avatarEl.style.transform = 'scale(0.85) translateY(0)';
      setTimeout(() => {
        avatarEl.textContent = avatarEmojis[emojiIdx];
        avatarEl.style.transform = '';
      }, 200);
    }, 3000);

    avatarEl.style.transition = 'transform 0.2s ease';
  }

  /* ============================
     10. FOOTER CTA HOVER RIPPLE
     ============================ */
  const ctaBtn = document.getElementById('lets-talk-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', (e) => {
      // Let mailto: handle it natively
    });
  }

  /* ============================
     11. PAGE LOAD ENTRANCE
     ============================ */
  // Stagger hero elements on load
  const heroGreeting = document.querySelector('.hero-greeting');
  const heroName = document.querySelector('.hero-name');
  const heroTitle = document.querySelector('.hero-title');
  const heroBio = document.querySelector('.hero-bio');
  const heroCta = document.querySelector('.hero-cta');
  const heroSocials = document.querySelector('.hero-socials');

  const heroEls = [heroGreeting, heroName, heroTitle, heroBio, heroCta, heroSocials];
  heroEls.forEach((el, i) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = '';
    }, 100 + i * 120);
  });

  // Browser window entrance
  const browserWindow = document.querySelector('.browser-window');
  if (browserWindow) {
    browserWindow.style.opacity = '0';
    browserWindow.style.transform = 'translateY(30px) scale(0.96)';
    browserWindow.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    setTimeout(() => {
      browserWindow.style.opacity = '1';
      browserWindow.style.transform = '';
    }, 600);
  }

});
