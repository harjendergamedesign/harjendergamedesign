/* ==========================================================================
   THREE.JS SCENE — Hero particle field + Contact subtle canvas particles.
   White theme: subtle gold + purple particles on white background.
   ========================================================================== */

const ThreeScene = (() => {
  let heroRenderer, heroScene, heroCamera, heroParticles, heroAnimId;
  let contactCanvas, contactCtx, contactParticles, contactAnimId;
  let mouse = { x: 0, y: 0, nx: 0, ny: 0 };
  let heroW, heroH;
  const isMobile = window.matchMedia('(hover:none)').matches;

  /* ---- Hero Three.js Scene ---- */
  function initHero() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    heroW = window.innerWidth;
    heroH = window.innerHeight;

    heroRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    heroRenderer.setSize(heroW, heroH);
    heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    heroScene = new THREE.Scene();
    heroCamera = new THREE.PerspectiveCamera(60, heroW / heroH, 0.1, 1000);
    heroCamera.position.z = 300;

    const count = isMobile ? 800 : 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    // Subtle palette for white bg: gold, muted gold, soft purple, light blue
    const palette = [
      { r: 0.72, g: 0.53, b: 0.04 },  // dark gold
      { r: 0.83, g: 0.63, b: 0.09 },  // gold
      { r: 0.60, g: 0.45, b: 0.06 },  // muted gold
      { r: 0.42, g: 0.36, b: 0.91 },  // purple
      { r: 0.55, g: 0.48, b: 0.82 },  // soft purple
      { r: 0.35, g: 0.50, b: 0.78 },  // soft blue
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 700;
      positions[i3 + 1] = (Math.random() - 0.5) * 700;
      positions[i3 + 2] = (Math.random() - 0.5) * 400;

      sizes[i] = Math.random() < 0.05 ? Math.random() * 3.0 + 1.0 : Math.random() * 1.5 + 0.3;
      alphas[i] = Math.random() * 0.35 + 0.1;

      // 65% gold variants, 35% purple/blue
      let c;
      const roll = Math.random();
      if (roll < 0.65) {
        c = palette[Math.floor(Math.random() * 3)];
      } else {
        c = palette[3 + Math.floor(Math.random() * 3)];
      }
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      velocities[i3] = (Math.random() - 0.5) * 0.12;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.12;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.06;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

    const vertexShader = `
      attribute float aSize;
      attribute float aAlpha;
      attribute vec3 aColor;
      varying float vAlpha;
      varying vec3 vColor;
      void main() {
        vAlpha = aAlpha;
        vColor = aColor;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * (200.0 / -mvPos.z);
        gl_Position = projectionMatrix * mvPos;
      }
    `;
    const fragmentShader = `
      varying float vAlpha;
      varying vec3 vColor;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float glow = 1.0 - smoothstep(0.0, 0.5, d);
        float alpha = vAlpha * glow * 0.6;
        gl_FragColor = vec4(vColor, alpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });

    heroParticles = new THREE.Points(geometry, material);
    heroParticles._velocities = velocities;
    heroScene.add(heroParticles);

    if (!isMobile) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
    }

    animateHero();
  }

  function onMouseMove(e) {
    mouse.nx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ny = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  function animateHero() {
    heroAnimId = requestAnimationFrame(animateHero);

    mouse.x += (mouse.nx - mouse.x) * 0.03;
    mouse.y += (mouse.ny - mouse.y) * 0.03;

    const pos = heroParticles.geometry.attributes.position.array;
    const vels = heroParticles._velocities;
    const len = pos.length;

    for (let i = 0; i < len; i += 3) {
      pos[i] += vels[i];
      pos[i + 1] += vels[i + 1];
      pos[i + 2] += vels[i + 2];

      if (pos[i] > 350) pos[i] = -350;
      if (pos[i] < -350) pos[i] = 350;
      if (pos[i + 1] > 350) pos[i + 1] = -350;
      if (pos[i + 1] < -350) pos[i + 1] = 350;
      if (pos[i + 2] > 200) pos[i + 2] = -200;
      if (pos[i + 2] < -200) pos[i + 2] = 200;
    }

    heroParticles.geometry.attributes.position.needsUpdate = true;

    heroCamera.position.x += (mouse.x * 20 - heroCamera.position.x) * 0.02;
    heroCamera.position.y += (mouse.y * 15 - heroCamera.position.y) * 0.02;
    heroCamera.lookAt(0, 0, 0);

    heroParticles.rotation.y += 0.0002;

    heroRenderer.render(heroScene, heroCamera);
  }

  function onHeroResize() {
    heroW = window.innerWidth;
    heroH = window.innerHeight;
    heroCamera.aspect = heroW / heroH;
    heroCamera.updateProjectionMatrix();
    heroRenderer.setSize(heroW, heroH);
  }

  /* ---- Contact Canvas 2D Particles ---- */
  function initContact() {
    contactCanvas = document.getElementById('contact-canvas');
    if (!contactCanvas) return;

    contactCtx = contactCanvas.getContext('2d');
    resizeContact();

    const count = isMobile ? 30 : 60;
    const goldColors = ['rgba(184,134,11,', 'rgba(212,160,23,'];
    const purpleColors = ['rgba(108,92,231,', 'rgba(90,75,200,'];

    contactParticles = [];
    for (let i = 0; i < count; i++) {
      const isGold = Math.random() < 0.6;
      const colors = isGold ? goldColors : purpleColors;
      contactParticles.push({
        x: Math.random() * contactCanvas.width,
        y: Math.random() * contactCanvas.height,
        r: Math.random() * 1.2 + 0.3,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.2 + 0.05,
        colorBase: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    animateContact();
  }

  function resizeContact() {
    const section = contactCanvas.parentElement;
    contactCanvas.width = section.offsetWidth;
    contactCanvas.height = section.offsetHeight;
  }

  function animateContact() {
    contactAnimId = requestAnimationFrame(animateContact);
    contactCtx.clearRect(0, 0, contactCanvas.width, contactCanvas.height);

    for (let i = 0; i < contactParticles.length; i++) {
      const p = contactParticles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = contactCanvas.width;
      if (p.x > contactCanvas.width) p.x = 0;
      if (p.y < 0) p.y = contactCanvas.height;
      if (p.y > contactCanvas.height) p.y = 0;

      contactCtx.beginPath();
      contactCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      contactCtx.fillStyle = p.colorBase + p.alpha + ')';
      contactCtx.fill();
    }

    contactCtx.lineWidth = 0.5;
    for (let i = 0; i < contactParticles.length; i++) {
      for (let j = i + 1; j < contactParticles.length; j++) {
        const dx = contactParticles[i].x - contactParticles[j].x;
        const dy = contactParticles[i].y - contactParticles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          contactCtx.globalAlpha = (1 - dist / 120) * 0.3;
          contactCtx.strokeStyle = contactParticles[i].colorBase + '1)';
          contactCtx.beginPath();
          contactCtx.moveTo(contactParticles[i].x, contactParticles[i].y);
          contactCtx.lineTo(contactParticles[j].x, contactParticles[j].y);
          contactCtx.stroke();
        }
      }
    }
    contactCtx.globalAlpha = 1;
  }

  /* ---- Public ---- */
  function init() {
    initHero();
    initContact();
  }

  function handleResize() {
    if (heroRenderer) onHeroResize();
    if (contactCanvas) resizeContact();
  }

  function destroy() {
    cancelAnimationFrame(heroAnimId);
    cancelAnimationFrame(contactAnimId);
    window.removeEventListener('mousemove', onMouseMove);
    if (heroRenderer) heroRenderer.dispose();
  }

  return { init, handleResize, destroy };
})();
