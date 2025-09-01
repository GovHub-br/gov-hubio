
(() => {
  // Liga cada carrossel isoladamente, usando o próprio container [data-team-carousel]
  function bindCarousel(container) {
    if (!container || container.dataset.bound === '1') return;
    container.dataset.bound = '1';

    // Dentro do container, acha os elementos correspondentes apenas desse bloco
    const rail = container.querySelector('[id^="teamRail-"]');
    const prev = container.querySelector('button[id^="teamPrev-"]');
    const next = container.querySelector('button[id^="teamNext-"]');
    if (!rail) return;

    // Passo = distância real entre 2 primeiros cards (inclui gap)
    const getStep = () => {
      const cards = rail.querySelectorAll('.team-card');
      if (!cards.length) return 0;
      if (cards.length === 1) return Math.round(cards[0].getBoundingClientRect().width);
      const dx = Math.round(cards[1].offsetLeft - cards[0].offsetLeft);
      if (dx > 0) return dx; // fallback se offsetLeft ainda não estabilizou
      const w = cards[0].getBoundingClientRect().width;
      const cs = getComputedStyle(rail);
      const gap = parseFloat(cs.gap || cs.columnGap || '0') || 0;
      return Math.max(1, Math.round(w + gap));
    };

    let STEP = getStep();
    const recalc = () => { STEP = getStep(); };

    // Recalcular quando layout muda
    window.addEventListener('resize', recalc);
    window.addEventListener('load', recalc);
    document.fonts?.ready?.then(recalc).catch(() => {});
    rail.querySelectorAll('img').forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', recalc, { once: true });
        img.addEventListener('error', recalc, { once: true });
      }
    });
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(recalc);
      ro.observe(rail);
    }

    // Botões: andar 1 card (passo real) pra cada lado
    prev?.addEventListener('click', () => {
      rail.scrollBy({ left: -STEP, behavior: 'smooth' });
    });
    next?.addEventListener('click', () => {
      rail.scrollBy({ left:  STEP, behavior: 'smooth' });
    });

    // Roda do mouse/touchpad: vertical -> horizontal (sem Shift)
    const onWheel = (e) => {
      // se gesto é mais vertical que horizontal, converte para X e impede rolagem da página
      if (Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
        e.preventDefault();
        rail.scrollBy({ left: e.deltaY, behavior: 'smooth' });
      }
      // se deltaX predomina (trackpad), deixa o navegador agir
    };
    // ouvir tanto no trilho quanto no container (cobre a máscara .overflow-hidden)
    rail.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('wheel', onWheel, { passive: false });
  }

  // Inicializa todos os containers já presentes
  document.querySelectorAll('[data-team-carousel]').forEach(bindCarousel);

  // Se futuros carrosséis forem injetados depois, liga automaticamente
  const mo = new MutationObserver((muts) => {
    for (const m of muts) {
      m.addedNodes?.forEach(n => {
        if (!(n instanceof HTMLElement)) return;
        if (n.matches?.('[data-team-carousel]')) bindCarousel(n);
        n.querySelectorAll?.('[data-team-carousel]').forEach(bindCarousel);
      });
    }
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();

