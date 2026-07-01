/* ==========================================================================
   SCRIPT.JS — Main application controller.
   Preloader, custom cursor, navigation, dynamic content rendering,
   skill network, project detail panel, about-card tilt, form handling.
   ========================================================================== */

(function () {
  'use strict';

  const isMobile = window.matchMedia('(hover:none)').matches;

  /* ======================================================================
     PRELOADER
     ====================================================================== */
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    const pctEl = document.getElementById('preloader-pct');
    const ringFill = document.getElementById('ringFill');
    const barFill = document.getElementById('preloaderBar');
    const particlesWrap = document.getElementById('preloaderParticles');
    if (!preloader || !pctEl) return;

    const circumference = 377;
    const ringGlow = preloader.querySelector('.ring-glow');
    let progress = 0;

    // Generate background particles
    if (particlesWrap) {
      for (let i = 0; i < 30; i++) {
        const p = document.createElement('span');
        p.classList.add('particle');
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 3 + 's';
        p.style.animationDuration = (2 + Math.random() * 3) + 's';
        p.style.width = p.style.height = (1 + Math.random() * 2) + 'px';
        particlesWrap.appendChild(p);
      }
    }

    function tick() {
      progress += Math.random() * 8 + 2;
      if (progress > 100) progress = 100;

      const p = Math.floor(progress);
      pctEl.textContent = p;

      // Ring fill
      const offset = circumference * (1 - progress / 100);
      if (ringFill) ringFill.style.strokeDashoffset = offset;
      if (ringGlow) ringGlow.style.strokeDashoffset = offset;

      // Bar fill
      if (barFill) barFill.style.width = p + '%';

      if (progress < 100) {
        setTimeout(tick, 100 + Math.random() * 150);
      } else {
        setTimeout(hidePreloader, 500);
      }
    }

    function hidePreloader() {
      preloader.classList.add('is-hidden');
      document.body.style.overflow = '';
      setTimeout(() => {
        preloader.style.display = 'none';
        initApp();
      }, 1000);
    }

    document.body.style.overflow = 'hidden';
    tick();
  }

  /* ======================================================================
     CUSTOM CURSOR
     ====================================================================== */
  function initCursor() {
    if (isMobile) return;

    const reticle = document.getElementById('reticle');
    const dot = document.getElementById('cursorDot');
    if (!reticle || !dot) return;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    }, { passive: true });

    function tick() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      reticle.style.transform = `translate(${rx - 32}px, ${ry - 32}px)`;
      dot.style.transform = `translate(${mx - 2}px, ${my - 2}px)`;
      requestAnimationFrame(tick);
    }
    tick();

    // Hover states for interactive elements
    const interactives = document.querySelectorAll('a, button, .launch-card, .skill-card, input, textarea');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => reticle.classList.add('is-active'));
      el.addEventListener('mouseleave', () => reticle.classList.remove('is-active'));
    });
  }

  /* ======================================================================
     MOBILE NAV
     ====================================================================== */
  function initNav() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', links.classList.contains('is-open'));
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ======================================================================
     SMOOTH SCROLL
     ====================================================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const id = link.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ======================================================================
     FOOTER YEAR
     ====================================================================== */
  function initFooterYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ======================================================================
     STRENGTH CARDS (from data.js STRENGTHS)
     ====================================================================== */
  function renderStrengths() {
    const grid = document.getElementById('strengthsGrid');
    if (!grid || typeof STRENGTHS === 'undefined') return;

    grid.innerHTML = STRENGTHS.map(s => `
      <div class="strength-card">
        <h4>${s.title}</h4>
        <p>${s.desc}</p>
      </div>
    `).join('');
  }

  /* ======================================================================
     PROJECT LAUNCHER CARDS (from data.js PROJECTS)
     ====================================================================== */
  function renderLauncher() {
    const launcher = document.getElementById('launcher');
    if (!launcher || typeof PROJECTS === 'undefined') return;

    launcher.innerHTML = PROJECTS.map(p => `
      <div class="launch-card" data-project="${p.id}">
        <div class="launch-card__bg"></div>
        <div class="launch-card__index">
          <b>${p.index}</b>
          <span>${p.codename}</span>
        </div>
        <div class="launch-card__main">
          <p class="launch-card__genre">${p.genre}</p>
          <h3 class="launch-card__title">${p.title}</h3>
          <p class="launch-card__subtitle">${p.subtitle}</p>
          <div class="launch-card__tags">
            ${p.tags.map(t => `<span>${t}</span>`).join('')}
          </div>
        </div>
        <div class="launch-card__enter">
          <svg viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </div>
      </div>
    `).join('');

    launcher.querySelectorAll('.launch-card').forEach(card => {
      card.addEventListener('click', () => openProjectDetail(card.dataset.project));
    });
  }

  /* ======================================================================
     PROJECT DETAIL PANEL
     ====================================================================== */
  function openProjectDetail(id) {
    const project = PROJECTS.find(p => p.id === id);
    if (!project) return;

    const panel = document.getElementById('projectDetail');
    const scroll = document.getElementById('detailScroll');
    const closeBtn = document.getElementById('detailClose');
    const backdrop = document.getElementById('detailBackdrop');
    if (!panel || !scroll) return;

    scroll.innerHTML = buildDetailHTML(project);
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    scroll.scrollTop = 0;

    // Animate roadmap bars after render
    requestAnimationFrame(() => {
      scroll.querySelectorAll('.detail__roadmap-fill').forEach(fill => {
        const pct = fill.getAttribute('data-pct') || 0;
        fill.style.width = pct + '%';
      });
    });

    // Focus trap
    closeBtn.focus();

    function close() {
      panel.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      closeBtn.removeEventListener('click', close);
      backdrop.removeEventListener('click', close);
      document.removeEventListener('keydown', escHandler);
    }

    function escHandler(e) {
      if (e.key === 'Escape') close();
    }

    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', escHandler);
  }

  function buildDetailHTML(p) {
    const list = arr => arr.map(i => `<li>${i}</li>`).join('');

    return `
      <p class="detail__eyebrow">${p.codename} — ${p.genre}</p>
      <h2 class="detail__title">${p.title}</h2>
      <p class="detail__subtitle">${p.subtitle}</p>

      <div class="detail__meta-row">
        <div class="detail__meta"><span>Status</span><b>${p.status}</b></div>
        <div class="detail__meta"><span>Genre</span><b>${p.genre}</b></div>
        <div class="detail__meta"><span>World</span><b>${p.codename}</b></div>
      </div>

      ${p.heroNote ? `<div class="detail__block"><p style="font-family:var(--f-display);font-size:18px;color:var(--gold-bright);font-weight:500;margin-top:40px;">"${p.heroNote}"</p></div>` : ''}

      <div class="detail__block">
        <h4 class="detail__block-title">Story</h4>
        <p>${p.story}</p>
      </div>

      <div class="detail__block">
        <h4 class="detail__block-title">Gameplay Vision</h4>
        <p>${p.gameplayVision}</p>
      </div>

      <div class="detail__block">
        <h4 class="detail__block-title">Core Loop</h4>
        <p>${p.loop}</p>
      </div>

      <div class="detail__block">
        <h4 class="detail__block-title">Player Motivation</h4>
        <p>${p.motivation}</p>
      </div>

      <div class="detail__block">
        <h4 class="detail__block-title">Key Mechanics</h4>
        <ul class="detail__list">${list(p.mechanics)}</ul>
      </div>

      <div class="detail__block">
        <h4 class="detail__block-title">Unique Selling Points</h4>
        <ul class="detail__list">${list(p.usp)}</ul>
      </div>

      <div class="detail__block">
        <h4 class="detail__block-title">Core Systems</h4>
        <ul class="detail__list">${list(p.systems)}</ul>
      </div>

      <div class="detail__block">
        <h4 class="detail__block-title">Progression</h4>
        <p>${p.progression}</p>
      </div>

      <div class="detail__block">
        <h4 class="detail__block-title">Exploration</h4>
        <p>${p.exploration}</p>
      </div>

      <div class="detail__block">
        <h4 class="detail__block-title">Future Vision</h4>
        <ul class="detail__list">${list(p.future)}</ul>
      </div>

      <div class="detail__block">
        <h4 class="detail__block-title">Development Roadmap</h4>
        <div class="detail__roadmap">
          ${p.roadmap.map(r => `
            <div class="detail__roadmap-item">
              <div class="detail__roadmap-head"><b>${r.phase}</b><span>${r.pct}%</span></div>
              <div class="detail__roadmap-desc">${r.detail}</div>
              <div class="detail__roadmap-bar"><div class="detail__roadmap-fill" data-pct="${r.pct}"></div></div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="detail__gallery" style="margin-top:56px;">
        <div class="detail__gallery-frame"><span>${p.codename} — SCENE 01</span></div>
        <div class="detail__gallery-frame"><span>${p.codename} — SCENE 02</span></div>
        <div class="detail__gallery-frame"><span>${p.codename} — SCENE 03</span></div>
      </div>
    `;
  }

  /* ======================================================================
     SKILL CARDS (from data.js SKILL_NODES)
     ====================================================================== */
  const SKILL_ICONS = {
    core: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
    gdd: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
    worldbuilding: '<path d="M3 21h18M3 7v1a3 3 0 006 0V7m0 0V4h6v3m0 0v1a3 3 0 006 0V7"/><path d="M12 22v-5"/>',
    psychology: '<path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z"/><circle cx="12" cy="9" r="2.5"/>',
    direction: '<circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
    vision: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'
  };

  function renderSkillCards() {
    const grid = document.getElementById('skillsGrid');
    if (!grid || typeof SKILL_NODES === 'undefined') return;

    grid.innerHTML = SKILL_NODES.map(node => {
      const icon = SKILL_ICONS[node.id] || SKILL_ICONS.core;
      const tag = node.core ? 'Core' : 'Design';
      return `
        <div class="skill-card">
          <div class="skill-card__icon">
            <svg viewBox="0 0 24 24">${icon}</svg>
          </div>
          <h4 class="skill-card__title">${node.label}</h4>
          <p class="skill-card__desc">${node.desc}</p>
          <span class="skill-card__tag">${tag}</span>
        </div>
      `;
    }).join('');
  }

  /* ======================================================================
     TIMELINE (from data.js TIMELINE)
     ====================================================================== */
  function renderTimeline() {
    const track = document.getElementById('timelineTrack');
    if (!track || typeof TIMELINE === 'undefined') return;

    track.innerHTML = TIMELINE.map(t => `
      <div class="timeline-item">
        <span class="timeline-item__year">${t.year}</span>
        <h3 class="timeline-item__title">${t.title}</h3>
        <p class="timeline-item__text">${t.text}</p>
      </div>
    `).join('');
  }

  /* ======================================================================
     ABOUT CARD 3D TILT
     ====================================================================== */
  function initAboutCardTilt() {
    if (isMobile) return;

    const card = document.getElementById('aboutCard');
    if (!card) return;

    const wrap = card.closest('.about__card-wrap');
    if (!wrap) return;

    wrap.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });

    wrap.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }

  /* ======================================================================
     CONTACT FORM
     ====================================================================== */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const note = document.getElementById('cfNote');
    const submitLabel = document.getElementById('cfSubmitLabel');
    if (!form || !note) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const name = form.querySelector('#cf-name').value.trim();
      const email = form.querySelector('#cf-email').value.trim();
      const message = form.querySelector('#cf-message').value.trim();

      if (!name || !email || !message) {
        note.textContent = 'Please fill in all required fields.';
        note.style.color = '#e05555';
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        note.textContent = 'Please enter a valid email address.';
        note.style.color = '#e05555';
        return;
      }

      // Build mailto link
      const subject = encodeURIComponent(form.querySelector('#cf-subject').value.trim() || 'Portfolio Contact');
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:world02shop@gmail.com?subject=${subject}&body=${body}`;

      note.textContent = 'Opening your email client...';
      note.style.color = 'var(--gold-bright)';
      submitLabel.textContent = 'Transmission Sent';

      setTimeout(() => {
        submitLabel.textContent = 'Send Transmission';
        note.textContent = '';
      }, 4000);
    });
  }

  /* ======================================================================
     CURSOR HOVER STATES (for dynamically rendered elements)
     ====================================================================== */
  function initDynamicCursorHovers() {
    if (isMobile) return;
    const reticle = document.getElementById('reticle');
    if (!reticle) return;

    document.querySelectorAll('.launch-card, .skill-card').forEach(el => {
      el.addEventListener('mouseenter', () => reticle.classList.add('is-active'));
      el.addEventListener('mouseleave', () => reticle.classList.remove('is-active'));
    });
  }

  /* ======================================================================
     INIT — Called after preloader finishes
     ====================================================================== */
  function initApp() {
    renderStrengths();
    renderLauncher();
    renderSkillCards();
    renderTimeline();
    initSmoothScroll();
    initAboutCardTilt();
    initContactForm();
    initDynamicCursorHovers();

    // Init Three.js and animations after DOM is ready
    if (typeof ThreeScene !== 'undefined') ThreeScene.init();
    if (typeof Animations !== 'undefined') {
      Animations.init();
      // Refresh ScrollTrigger after content is rendered
      setTimeout(() => Animations.refresh(), 100);
    }
  }

  /* ======================================================================
     BOOT
     ====================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCursor();
    initNav();
    initFooterYear();
  });

  /* ---- Resize handler ---- */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (typeof ThreeScene !== 'undefined') ThreeScene.handleResize();
      if (typeof Animations !== 'undefined') Animations.refresh();
    }, 200);
  });

})();
