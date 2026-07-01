/* ==========================================================================
   ANIMATIONS.JS — GSAP + ScrollTrigger orchestration.
   All reveal animations, scroll compass, nav state, parallax, and
   section-specific entrance effects.
   ========================================================================== */

const Animations = (() => {
  let scrollTriggerInstances = [];

  function init() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    heroReveals();
    sectionReveals();
    scrollCompass();
    navScrollState();
    coordTracker();
    roadmapBarFills();
  }

  /* ---- Hero entrance (scoped to hero section only) ---- */
  function heroReveals() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(hero.querySelectorAll('[data-reveal-line]'), {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: 'power3.out',
      stagger: 0.15
    })
    .to(hero.querySelectorAll('[data-reveal]'), {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.1
    }, '-=0.6');
  }

  /* ---- Section reveal on scroll ---- */
  function sectionReveals() {
    const reveals = document.querySelectorAll('section [data-reveal]');
    reveals.forEach(el => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      });
      scrollTriggerInstances.push(st);
    });
  }

  /* ---- Scroll compass progress ---- */
  function scrollCompass() {
    const compass = document.getElementById('scrollCompass');
    const progress = document.getElementById('compassProgress');
    if (!compass || !progress) return;

    const circumference = 276.5;

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => {
        const p = self.progress;
        progress.style.strokeDashoffset = circumference * (1 - p);

        if (p > 0.02) {
          compass.classList.add('is-visible');
        } else {
          compass.classList.remove('is-visible');
        }
      }
    });
    scrollTriggerInstances.push(st);
  }

  /* ---- Nav scroll state ---- */
  function navScrollState() {
    const nav = document.getElementById('siteNav');
    if (!nav) return;

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: '80px top',
      onEnter: () => nav.classList.add('is-scrolled'),
      onLeaveBack: () => nav.classList.remove('is-scrolled')
    });
    scrollTriggerInstances.push(st);

    // Active nav link tracking
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.site-nav__links a');

    sections.forEach(section => {
      const sst = ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onToggle: self => {
          if (self.isActive) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
              link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
            });
          }
        }
      });
      scrollTriggerInstances.push(sst);
    });
  }

  /* ---- Hero coords tracker ---- */
  function coordTracker() {
    const coordX = document.getElementById('coordX');
    const coordY = document.getElementById('coordY');
    if (!coordX || !coordY) return;

    document.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth * 100).toFixed(2);
      const y = (e.clientY / window.innerHeight * 100).toFixed(2);
      coordX.textContent = `X ${x}`;
      coordY.textContent = `Y ${y}`;
    }, { passive: true });
  }

  /* ---- Roadmap progress bar fills ---- */
  function roadmapBarFills() {
    const fills = document.querySelectorAll('.detail__roadmap-fill');
    fills.forEach(fill => {
      const pct = fill.getAttribute('data-pct') || 0;
      const st = ScrollTrigger.create({
        trigger: fill,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(fill, { width: pct + '%', duration: 1.2, ease: 'power2.out' });
        }
      });
      scrollTriggerInstances.push(st);
    });
  }

  /* ---- Refresh all ScrollTriggers (call after DOM changes) ---- */
  function refresh() {
    ScrollTrigger.refresh();
  }

  function destroy() {
    scrollTriggerInstances.forEach(st => st.kill());
    scrollTriggerInstances = [];
    ScrollTrigger.getAll().forEach(st => st.kill());
  }

  return { init, refresh, destroy };
})();
