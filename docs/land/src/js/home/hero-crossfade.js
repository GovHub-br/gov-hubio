(function () {
      const scope = document.getElementById('hero');
      if (!scope) return;

      const imgA = scope.querySelector('#heroVizA');
      const imgB = scope.querySelector('#heroVizB');
      const tabs = Array.from(scope.querySelectorAll('[data-hero-tab]'));
      if (!imgA || !imgB || !tabs.length) return;

      let showing = 'A'; // imagem atualmente visível (A ou B)

      function setActive(btn) {
        tabs.forEach(b => {
          b.classList.remove('ring-2', 'ring-[#7A34F3]', 'font-bold');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('ring-2', 'ring-[#7A34F3]', 'font-bold');
        btn.setAttribute('aria-selected', 'true');
      }

      function crossfadeTo(src) {
        const showEl = (showing === 'A') ? imgA : imgB;
        const hideEl = (showing === 'A') ? imgB : imgA;

        hideEl.onload = () => {
          hideEl.classList.remove('opacity-0');
          showEl.classList.add('opacity-0');
          showing = (showing === 'A') ? 'B' : 'A';
        };

        if (hideEl.src !== src) hideEl.src = src;
        else hideEl.onload?.(); // força o fade se o arquivo for o mesmo (cache)
      }

      tabs.forEach(btn => {
        btn.addEventListener('click', () => {
          setActive(btn);
          const src = btn.getAttribute('data-src');
          if (src) crossfadeTo(src);
        });
      });
    })();