/* ═══════════════════════════════════════════════════════════
   BORLOTTI BEAN — script.js
   Scroll reveals + ambient floating leaves + sparkles
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. SCROLL REVEAL ── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  /* ── 2. AMBIENT FLOATING LEAVES ── */
  const leafEmojis = ['🍃', '🌿', '🍀', '🌱'];

  function spawnLeaf() {
    const leaf = document.createElement('div');
    leaf.className = 'leaf-float';
    leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
    leaf.style.left = 2 + Math.random() * 90 + 'vw';
    leaf.style.fontSize = 14 + Math.random() * 12 + 'px';
    const duration = 14 + Math.random() * 12;
    leaf.style.animationDuration = duration + 's';
    leaf.style.animationDelay = '0s';
    document.body.appendChild(leaf);
    setTimeout(() => leaf.remove(), duration * 1000);
  }

  // Spawn leaves gently — one every 3.5 seconds
  setInterval(spawnLeaf, 3500);
  // A few on load
  for (let i = 0; i < 4; i++) {
    setTimeout(spawnLeaf, i * 900);
  }

  /* ── 3. SPARKLES on hero + final section ── */
  function spawnSparkle(container) {
    const sp = document.createElement('div');
    sp.className = 'sparkle';
    sp.textContent = Math.random() > 0.5 ? '✦' : '✧';
    const rect = container.getBoundingClientRect();
    sp.style.left = rect.left + Math.random() * rect.width + 'px';
    sp.style.top = rect.top + window.scrollY + Math.random() * rect.height * 0.7 + 'px';
    sp.style.animationDuration = 2.5 + Math.random() * 2 + 's';
    sp.style.animationDelay = '0s';
    sp.style.fontSize = 9 + Math.random() * 7 + 'px';
    document.body.appendChild(sp);
    setTimeout(() => sp.remove(), 5000);
  }

  const hero = document.querySelector('.hero');
  const finalSection = document.querySelector('.section-final');

  function heroSparkleLoop() {
    if (hero) spawnSparkle(hero);
    setTimeout(heroSparkleLoop, 2000 + Math.random() * 1500);
  }
  setTimeout(heroSparkleLoop, 1200);

  function finalSparkleLoop() {
    if (finalSection) {
      const rect = finalSection.getBoundingClientRect();
      // only sparkle when final section is visible
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        spawnSparkle(finalSection);
      }
    }
    setTimeout(finalSparkleLoop, 2500 + Math.random() * 2000);
  }
  setTimeout(finalSparkleLoop, 2000);

  /* ── 4. PARALLAX — infographic drifts slightly on scroll ── */
  const infographic = document.querySelector('.infographic-frame');
  if (infographic && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', () => {
      const rect = infographic.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const shift = center * 0.04;
      infographic.style.transform = `translateY(${shift}px)`;
    }, { passive: true });
  }

  /* ── 5. HIDE SCROLL HINT after first scroll ── */
  const hint = document.querySelector('.scroll-hint');
  if (hint) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) hint.style.opacity = '0';
    }, { passive: true, once: true });
  }

})();
