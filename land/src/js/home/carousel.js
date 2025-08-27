(() => {
  const rail = document.getElementById('clientsRail');
  const prev = document.getElementById('clientsPrev');
  const next = document.getElementById('clientsNext');

  function getStep() {
    const cards = rail.querySelectorAll('.client-card');
    if (!cards.length) return 0;
    if (cards.length === 1) return cards[0].offsetWidth;
    // distância exata entre o 2º e o 1º card (inclui gap real)
    return Math.round(cards[1].offsetLeft - cards[0].offsetLeft);
  }

  let STEP = getStep();

  // Recalcula em mudanças de layout
  const recalc = () => { STEP = getStep(); };
  window.addEventListener('resize', recalc);
  window.addEventListener('load', recalc);
  document.fonts?.ready?.then(recalc).catch(() => {});

  // botões
  prev?.addEventListener('click', () => {
    rail.scrollBy({ left: -STEP, behavior: 'smooth' });
  });
  next?.addEventListener('click', () => {
    rail.scrollBy({ left: STEP, behavior: 'smooth' });
  });

  // scroll do mouse (vertical -> horizontal) mantendo snap
  rail.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      rail.scrollBy({ left: e.deltaY, behavior: 'smooth' });
    }
  }, { passive: false });
})();