// Cafe Menu: builds the menu from menu.js, keeps the running total,
// handles hold-to-clear and scales the layout to fit the screen.
(() => {
  const HOLD_MS = 1000;
  const menuEl = document.getElementById('menu');
  const totalEl = document.getElementById('total');
  const countEl = document.getElementById('count');
  const clearBtn = document.getElementById('clear');
  const clearLabel = document.getElementById('clear-label');

  const formatPrice = (pence) => '£' + (pence / 100).toFixed(2);
  const TICK_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12.5l5 5 10-11"/></svg>';

  // ---------- Build ----------
  const checkboxes = [];
  window.MENU.forEach((column, c) => {
    const col = document.createElement('div');
    col.className = 'col';
    column.forEach((section, s) => {
      const box = document.createElement('section');
      box.className = 'section';
      box.style.setProperty('--rows', section.items.length + 1);
      const h2 = document.createElement('h2');
      h2.textContent = section.title;
      const ul = document.createElement('ul');
      section.items.forEach(([name, pence], i) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        label.className = 'item';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = `item-${c}-${s}-${i}`;
        input.dataset.pence = pence;
        const tick = document.createElement('span');
        tick.className = 'tick';
        tick.innerHTML = TICK_SVG;
        const nameEl = document.createElement('span');
        nameEl.className = 'name';
        nameEl.textContent = name;
        const priceEl = document.createElement('span');
        priceEl.className = 'price';
        priceEl.textContent = formatPrice(pence);
        label.append(input, tick, nameEl, priceEl);
        li.append(label);
        ul.append(li);
        checkboxes.push(input);
      });
      box.append(h2, ul);
      col.append(box);
    });
    menuEl.append(col);
  });

  // ---------- Running total ----------
  function update() {
    let pence = 0;
    let count = 0;
    for (const cb of checkboxes) {
      cb.parentElement.classList.toggle('on', cb.checked);
      if (cb.checked) {
        pence += Number(cb.dataset.pence);
        count++;
      }
    }
    totalEl.textContent = formatPrice(pence);
    countEl.textContent = count === 0 ? 'No items' : count === 1 ? '1 item' : `${count} items`;
  }
  menuEl.addEventListener('change', update);

  // ---------- Hold to clear ----------
  const fill = clearBtn.querySelector('.clear-fill');
  const setClearText = (text) => { clearLabel.textContent = text; fill.textContent = text; };
  setClearText(clearLabel.textContent);

  let holdTimer = null;
  let resetTimer = null;

  function startHold(e) {
    if (e.button > 0) return;
    cancelHold();
    clearTimeout(resetTimer);
    clearBtn.classList.remove('done');
    setClearText('Hold to clear all');
    void clearBtn.offsetWidth; // restart the fill transition from empty
    clearBtn.classList.add('holding');
    holdTimer = setTimeout(() => {
      holdTimer = null;
      for (const cb of checkboxes) cb.checked = false;
      update();
      clearBtn.classList.replace('holding', 'done');
      setClearText('Cleared ✓');
      if (navigator.vibrate) navigator.vibrate(40);
      resetTimer = setTimeout(() => {
        clearBtn.classList.remove('done');
        setClearText('Hold to clear all');
      }, 1200);
    }, HOLD_MS);
  }

  function cancelHold() {
    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = null;
    }
    clearBtn.classList.remove('holding');
  }

  clearBtn.addEventListener('pointerdown', startHold);
  ['pointerup', 'pointerleave', 'pointercancel', 'blur'].forEach((ev) => clearBtn.addEventListener(ev, cancelHold));
  clearBtn.addEventListener('contextmenu', (e) => e.preventDefault());
  // Keyboard users: holding Space/Enter behaves like holding a finger down
  clearBtn.addEventListener('keydown', (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); startHold(e); }
  });
  clearBtn.addEventListener('keyup', (e) => {
    if (e.key === ' ' || e.key === 'Enter') cancelHold();
  });
  // Long-press on Android can otherwise trigger the browser's context menu anywhere
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // ---------- Fit to screen ----------
  // Binary-search the root font size for the largest value at which nothing overflows.
  const root = document.documentElement;
  const sections = () => menuEl.querySelectorAll('.section');
  const overflowing = (el) => el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1;

  function fits() {
    if (root.scrollHeight > window.innerHeight + 1 || root.scrollWidth > window.innerWidth + 1) return false;
    for (const box of sections()) if (overflowing(box)) return false;
    for (const el of menuEl.querySelectorAll('.item, h2')) {
      if (el.scrollWidth > el.clientWidth + 1) return false;
    }
    return !overflowing(document.querySelector('.total')) && clearBtn.scrollWidth <= clearBtn.clientWidth + 1;
  }

  function fit() {
    let lo = 6, hi = 64;
    for (let i = 0; i < 14; i++) {
      const mid = (lo + hi) / 2;
      root.style.fontSize = mid + 'px';
      if (fits()) lo = mid; else hi = mid;
    }
    root.style.fontSize = Math.floor(lo * 0.98 * 10) / 10 + 'px';
  }

  let fitQueued = false;
  const queueFit = () => {
    if (fitQueued) return;
    fitQueued = true;
    requestAnimationFrame(() => { fitQueued = false; fit(); });
  };
  window.addEventListener('resize', queueFit);
  window.addEventListener('orientationchange', queueFit);
  if (window.visualViewport) window.visualViewport.addEventListener('resize', queueFit);

  update();
  fit();
  if (document.fonts) document.fonts.ready.then(fit);

  // ---------- Offline support ----------
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js'));
  }
})();
