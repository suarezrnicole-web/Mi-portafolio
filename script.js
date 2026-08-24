/* ============================================================
   TRAMA 23 — Portafolio
   Lógica del sitio: nav, scroll reveal, mosaico de proyectos
   (imagen o video), contador de resultados y testimonios.
 
   Todos los archivos de imagen y video están en la raíz del
   repositorio (mismo nivel que index.html), así que las rutas
   son solo el nombre del archivo — funcionan igual en local y
   en GitHub Pages.
================================================================ */
 
/* ------------------------------------------------------------
   PROYECTOS DEL PORTAFOLIO
   Para agregar un proyecto nuevo, copia un bloque del array y
   cambia sus valores.
 
   - "size": "normal", "wide", "narrow" o "tall" — controla el
     tamaño del tile en el mosaico.
   - "image": ruta a la foto de portada (siempre requerida, se
     usa también como poster del video).
   - "video": opcional. Nombre del archivo de video (raíz del
     repo). Si se define, el tile reproduce el video en loop al pasar el
     mouse (o directamente en móvil), y el panel de detalle
     muestra el video completo con controles.
   - "categories": arreglo — un proyecto puede aparecer en más
     de un filtro a la vez.
------------------------------------------------------------- */
const projects = [
  {
    client: "GymLab",
    categories: ["Fitness/Deporte", "Fotografía y video fitness"],
    size: "wide",
    image: "gymlab-hero.jpg",
    video: "gymlab-fitness.mp4",
    description: "Gestión integral de contenido para gimnasio: fotografía y video de entrenamiento, sesiones editoriales de socios y campañas de comunidad, con calendario mensual en Facebook e Instagram.",
    services: ["Social Media", "Fotografía", "Videografía"],
    result: "1,116,408 visualizaciones en Instagram · 574 piezas publicadas"
  },
  {
    client: "Motoro",
    categories: ["Fitness/Deporte", "Fotografía social/eventos"],
    size: "tall",
    image: "motoro-evento.jpg",
    video: "motoro-inspiracional.mp4",
    description: "Estrategia de social media y cobertura de eventos deportivos (mercados, competencias, activaciones de marca) para una marca de ropa y accesorios deportivos con el hashtag #AtletaMotoro.",
    services: ["Social Media", "Fotografía de eventos", "Community Management"],
    result: "+391% de alcance en un mes · 108.6 mil visualizaciones"
  },
  {
    client: "Motoro — Boutique",
    categories: ["Fotografía y video de boutique"],
    size: "normal",
    image: "motoro-boutique.jpg",
    video: "motoro-boutique.mp4",
    description: "Fotografía y video de producto para la línea de playeras y prendas Motoro, con enfoque editorial en detalle de tela, estampado y uso en contexto real.",
    services: ["Fotografía de producto", "Videografía"],
    result: "Contenido base para lanzamientos de temporada"
  },
  {
    client: "Motoro — Diseño",
    categories: ["Diseño gráfico"],
    size: "normal",
    image: "motoro-diseno.jpg",
    description: "Piezas gráficas de producto y campaña para redes — catálogo de accesorios, promociones y anuncios de nuevos productos con identidad visual consistente.",
    services: ["Diseño gráfico", "Social Media"],
    result: "Piezas mensuales para feed e historias"
  },
  {
    client: "Motoro — IA",
    categories: ["Creaciones con IA"],
    size: "narrow",
    image: "motoro-ia.jpg",
    video: "motoro-ia.mp4",
    description: "Piezas de producto generadas y editadas con herramientas de inteligencia artificial, usadas como contenido alternativo cuando la producción fotográfica tradicional no es viable.",
    services: ["Creación con IA", "Diseño gráfico"],
    result: "Contenido de producto ágil y de bajo costo"
  },
  {
    client: "IN Uñas & Nails",
    categories: ["Belleza", "Fotografía y video de salón de belleza"],
    size: "wide",
    image: "innails-belleza.jpg",
    video: "innails-flexologia.mp4",
    description: "Fotografía y video dentro del salón de belleza y podología: procedimientos, presentación del equipo y promociones mensuales, con estética rosa/morado pastel.",
    services: ["Fotografía", "Videografía", "Social Media"],
    result: "Contenido semanal de servicios y equipo"
  },
  {
    client: "Charmify",
    categories: ["Fotografía social/eventos"],
    size: "normal",
    image: "charmify-joyeria.jpg",
    description: "Cobertura fotográfica de joyería artesanal en punto de venta — mercados y eventos locales, mostrando piezas, detalle de materiales y la experiencia de compra en vivo.",
    services: ["Fotografía de eventos", "Fotografía de producto"],
    result: "Registro visual de participación en mercados"
  },
  {
    client: "GymLab — Diseño",
    categories: ["Diseño gráfico"],
    size: "normal",
    image: "gymlab-diseno.jpg",
    description: "Piezas gráficas motivacionales y de producto (suplementos, merch, recordatorios) para mantener presencia constante en el feed e historias de GymLab.",
    services: ["Diseño gráfico", "Social Media"],
    result: "Piezas de apoyo para campañas mensuales"
  }
];
 
const testimonials = [
  { quote: "Nicole entendió nuestra marca desde la primera llamada. El contenido por fin se siente como nosotros.", name: "Equipo", role: "GymLab" },
  { quote: "El alcance subió muchísimo en un solo mes y no tuvimos que cambiar nada más que nuestras redes.", name: "Equipo", role: "Motoro" },
  { quote: "Profesional, puntual y con ideas que realmente funcionan para nuestro tipo de cliente.", name: "Equipo", role: "IN Uñas & Nails" },
  { quote: "Cada campaña tiene un objetivo claro. No es contenido por llenar calendario, es contenido que vende.", name: "Equipo", role: "Charmify" }
];
 
/* ---------- Header scroll state ---------- */
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });
 
/* ---------- Mobile menu ---------- */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
 
/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));
 
/* ---------- Mosaic render ---------- */
const mosaicEl = document.getElementById('mosaic');
const filtersEl = document.getElementById('filters');
const categories = ["Todos", ...new Set(projects.flatMap(p => p.categories))];
 
const playIcon = `<span class="tile-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>`;
 
function renderFilters(){
  filtersEl.innerHTML = categories.map((c,i) =>
    `<button class="filter-btn ${i===0?'active':''}" data-cat="${c}">${c}</button>`
  ).join('');
  filtersEl.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filtersEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterMosaic(btn.dataset.cat);
    });
  });
}
 
function renderMosaic(){
  mosaicEl.innerHTML = projects.map((p, i) => `
    <div class="tile size-${p.size}" data-cats="${p.categories.join('|')}" data-index="${i}">
      ${p.video
        ? `<video class="tile-bg" src="${p.video}" poster="${p.image}" muted loop playsinline preload="metadata"></video>`
        : `<img class="tile-bg" src="${p.image}" alt="${p.client}" loading="lazy">`
      }
      ${p.video ? playIcon : ''}
      <span class="tile-label-static">${p.categories[0]}</span>
      <div class="tile-overlay">
        <span class="tile-cat">${p.categories.join(' · ')}</span>
        <span class="tile-client">${p.client}</span>
        <span class="tile-result">${p.result}</span>
      </div>
    </div>
  `).join('');
 
  mosaicEl.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', () => openDetail(projects[tile.dataset.index]));
 
    const vid = tile.querySelector('video.tile-bg');
    if (vid) {
      tile.addEventListener('mouseenter', () => vid.play().catch(() => {}));
      tile.addEventListener('mouseleave', () => { vid.pause(); vid.currentTime = 0; });
    }
  });
}
 
function filterMosaic(cat){
  mosaicEl.querySelectorAll('.tile').forEach(tile => {
    const cats = tile.dataset.cats.split('|');
    tile.classList.toggle('hide', cat !== "Todos" && !cats.includes(cat));
  });
}
 
renderFilters();
renderMosaic();
 
/* ---------- Detail panel ---------- */
const detailPanel = document.getElementById('detailPanel');
const detailCard = document.getElementById('detailCard');
 
function openDetail(p){
  const media = p.video
    ? `<video src="${p.video}" poster="${p.image}" controls playsinline></video>`
    : `<img src="${p.image}" alt="${p.client}">`;
 
  detailCard.innerHTML = `
    ${media}
    <button class="detail-close" id="detailClose">Cerrar</button>
    <div class="detail-card-body">
      <span class="eyebrow tile-cat">${p.categories.join(' · ')}</span>
      <h3>${p.client}</h3>
      <p class="desc">${p.description}</p>
      <div class="detail-services">${p.services.map(s => `<span class="tag">${s}</span>`).join('')}</div>
      <div class="detail-result">Resultado — ${p.result}</div>
    </div>
  `;
  detailPanel.classList.add('open');
  document.getElementById('detailClose').addEventListener('click', closeDetail);
}
function closeDetail(){
  const vid = detailCard.querySelector('video');
  if (vid) vid.pause();
  detailPanel.classList.remove('open');
}
detailPanel.addEventListener('click', (e) => { if (e.target === detailPanel) closeDetail(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDetail(); });
 
/* ---------- Stat count-up ---------- */
const stats = document.querySelectorAll('.stat b');
const statIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(eased * target);
      el.textContent = val + (progress >= 1 ? suffix : '');
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
    statIO.unobserve(el);
  });
}, { threshold: 0.5 });
stats.forEach(s => statIO.observe(s));
 
/* ---------- Testimonials ---------- */
const testiTrack = document.getElementById('testiTrack');
testiTrack.innerHTML = testimonials.map(t => `
  <div class="testi-card">
    <span class="quote-mark">&ldquo;</span>
    <p class="quote">${t.quote}</p>
    <div class="testi-who">
      <div><b>${t.name}</b><span>${t.role}</span></div>
    </div>
  </div>
`).join('');
 
document.getElementById('testiNext').addEventListener('click', () => {
  testiTrack.scrollBy({ left: testiTrack.clientWidth * 0.85, behavior: 'smooth' });
});
document.getElementById('testiPrev').addEventListener('click', () => {
  testiTrack.scrollBy({ left: -testiTrack.clientWidth * 0.85, behavior: 'smooth' });
});
