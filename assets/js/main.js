// ===== Nav toggle (mobile) =====
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    // Close menu when clicking a link
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }

  // Mark active nav link by current path
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();


// ===== Header scroll effect =====
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;
  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ===== Scroll progress bar =====
(function () {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0%';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ===== Back to top button =====
(function () {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
  document.body.appendChild(btn);
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        btn.classList.toggle('visible', window.scrollY > 500);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ===== Enhanced reveal on scroll =====
(function () {
  // Standard reveals
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach((el) => obs.observe(el));

  // Staggered grid items (service cards, portfolio, testimonials)
  const grids = document.querySelectorAll('.services-grid, .portfolio-grid, .testimonials-grid');
  grids.forEach(grid => {
    const children = grid.children;
    const gridObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          // Trigger all children with stagger (CSS handles delays)
          Array.from(children).forEach(child => child.classList.add('in'));
          gridObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    gridObs.observe(grid);
  });
})();

// ===== Lightbox (with optional spec sidebar) =====
(function () {
  const items = document.querySelectorAll('[data-lightbox]');
  if (!items.length) return;
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><div class="lightbox-content"><div class="lightbox-image-wrap"><img alt="" /></div><aside class="lightbox-sidebar"></aside></div>';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img');
  const sidebar = lb.querySelector('.lightbox-sidebar');
  const close = lb.querySelector('.lightbox-close');

  const open = (el) => {
    const img = el.querySelector('img');
    if (!img) return;
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';

    // Build spec sidebar from data attrs if present
    const d = el.dataset;
    if (d.title || d.client || d.material || d.finish || d.qty || d.notes) {
      const dl = [];
      if (d.material) dl.push('<dt>Material</dt><dd>' + d.material + '</dd>');
      if (d.finish)   dl.push('<dt>Finish</dt><dd>' + d.finish + '</dd>');
      if (d.process)  dl.push('<dt>Process</dt><dd>' + d.process + '</dd>');
      if (d.qty)      dl.push('<dt>Quantity</dt><dd>' + d.qty + '</dd>');
      if (d.year)     dl.push('<dt>Year</dt><dd>' + d.year + '</dd>');
      if (d.notes)    dl.push('<dt>Notes</dt><dd>' + d.notes + '</dd>');
      sidebar.innerHTML =
        (d.client ? '<span class="client">' + d.client + '</span>' : '') +
        (d.title ? '<h4>' + d.title + '</h4>' : '') +
        (dl.length ? '<dl>' + dl.join('') + '</dl>' : '');
      sidebar.style.display = '';
      lb.classList.add('has-sidebar');
    } else {
      sidebar.innerHTML = '';
      sidebar.style.display = 'none';
      lb.classList.remove('has-sidebar');
    }

    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const shut = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  };
  items.forEach((el) => el.addEventListener('click', () => open(el)));
  close.addEventListener('click', shut);
  lb.addEventListener('click', (e) => { if (e.target === lb) shut(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') shut(); });
})();

// ===== Contact form (Web3Forms) =====
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'form-status';
    status.textContent = 'Sending...';
    const data = new FormData(form);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        status.className = 'form-status success';
        status.textContent = 'Thank you! Your message has been sent. We will reply within 1 business day.';
        form.reset();
      } else {
        throw new Error(json.message || 'Submission failed');
      }
    } catch (err) {
      status.className = 'form-status error';
      status.textContent = 'Something went wrong. Please email us directly at llsprintinginc@gmail.com';
    }
  });
})();

// ===== Count-up animation for stats =====
(function () {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length || !('IntersectionObserver' in window)) return;
  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      // Smooth elastic easing
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.floor(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else {
        el.textContent = target + suffix;
        // Pop animation on completion
        el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        el.style.transform = 'scale(1.15)';
        setTimeout(() => { el.style.transform = 'scale(1)'; }, 200);
      }
    };
    requestAnimationFrame(step);
  };
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animate(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  els.forEach((el) => obs.observe(el));
})();

// ===== Subtle 3D tilt on service cards =====
(function () {
  if (!window.matchMedia('(hover: hover)').matches) return;
  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -6;
      const rotateY = (x - centerX) / centerX * 6;
      card.style.transform = `translateY(-8px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// ===== Hero mouse-follow glow =====
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
    hero.style.setProperty('--mouse-x', x + '%');
    hero.style.setProperty('--mouse-y', y + '%');
  });
})();

// ===== Product page filter chips =====
(function () {
  const chips = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');
  if (!chips.length || !cards.length) return;
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      cards.forEach((card) => {
        const cats = (card.dataset.category || '').split(' ');
        const show = filter === 'all' || cats.includes(filter);
        if (show) {
          card.style.display = '';
          card.style.animation = 'reveal-child 0.4s cubic-bezier(0.4,0,0.2,1) both';
        } else {
          card.style.display = 'none';
          card.style.animation = '';
        }
      });
    });
  });
})();

// ===== Contact form URL-param prefill (from Shop page) =====
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const params = new URLSearchParams(location.search);
  const product = params.get('product');
  const qty = params.get('qty');

  if (product) {
    const select = form.querySelector('[name="product"]');
    if (select) {
      const match = Array.from(select.options).find((o) => product.toLowerCase().includes(o.value.toLowerCase()) && o.value);
      if (match) {
        select.value = match.value;
      } else {
        const opt = new Option(product, product, true, true);
        select.add(opt, 0);
        select.value = product;
      }
    }
    const msg = form.querySelector('[name="message"]');
    if (msg && !msg.value) {
      msg.value = `I'd like to request a quote for: ${product}\n\nDetails:\n- Quantity: ${qty || '(please advise)'}\n- Branding: (logo, color, finish)\n- Deadline: \n- Additional notes: `;
    }
  }
  if (qty) {
    const qtyInput = form.querySelector('[name="quantity"]');
    if (qtyInput) qtyInput.value = qty;
  }
  if (product) {
    setTimeout(() => form.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
  }
})();

// ===== Hero inline quick quote =====
(function () {
  const f = document.getElementById('hero-quick-quote');
  if (!f) return;
  const status = f.querySelector('.hqf-status');
  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'hqf-status';
    status.textContent = 'Sending...';
    try {
      const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(f) });
      const j = await r.json();
      if (!j.success) throw 0;
      status.className = 'hqf-status success';
      status.textContent = "Got it! We'll email a quote within 1 business day.";
      f.reset();
    } catch {
      status.className = 'hqf-status error';
      status.textContent = 'Failed. Try WhatsApp or email llsprintinginc@gmail.com';
    }
  });
})();

// ===== Quote cart (Shop) =====
(function () {
  const KEY = 'lls_quote_cart_v1';
  const drawer = document.getElementById('quote-cart');
  const toggleBtn = document.getElementById('quote-cart-toggle');
  if (!drawer || !toggleBtn) return;
  const overlay = document.createElement('div');
  overlay.className = 'qc-overlay';
  document.body.appendChild(overlay);
  const itemsEl = drawer.querySelector('.qc-items');
  const countEls = document.querySelectorAll('.qc-count, .qc-toggle-count');
  const totalEl = drawer.querySelector('.qc-total');
  const submitBtn = document.getElementById('qc-submit');

  let cart = JSON.parse(localStorage.getItem(KEY) || '[]');
  const save = () => localStorage.setItem(KEY, JSON.stringify(cart));
  const peso = (n) => '₱' + n.toLocaleString('en-PH', { maximumFractionDigits: 0 });

  const render = () => {
    itemsEl.innerHTML = '';
    let total = 0;
    cart.forEach((item, i) => {
      const line = item.qty * item.price;
      total += line;
      const li = document.createElement('li');
      li.innerHTML =
        '<span class="qc-name">' + item.name + '</span>' +
        '<span class="qc-qty"><input type="number" min="1" value="' + item.qty + '" data-i="' + i + '" />pcs × ₱' + item.price + '</span>' +
        '<span class="qc-line">' + peso(line) + '</span>' +
        '<button class="qc-remove" data-i="' + i + '">Remove</button>';
      itemsEl.appendChild(li);
    });
    totalEl.textContent = peso(total);
    countEls.forEach(el => el.textContent = cart.length);
    drawer.classList.toggle('empty', cart.length === 0);
  };

  const addItem = (data) => {
    const existing = cart.find(c => c.id === data.id);
    if (existing) existing.qty += parseInt(data.qty);
    else cart.push({ id: data.id, name: data.name, qty: parseInt(data.qty), price: parseFloat(data.price) });
    save(); render();
  };

  const openCart = () => { drawer.classList.add('open'); overlay.classList.add('open'); };
  const closeCart = () => { drawer.classList.remove('open'); overlay.classList.remove('open'); };

  toggleBtn.addEventListener('click', openCart);
  drawer.querySelector('.qc-close').addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);

  itemsEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('qc-remove')) {
      cart.splice(+e.target.dataset.i, 1);
      save(); render();
    }
  });
  itemsEl.addEventListener('input', (e) => {
    if (e.target.tagName === 'INPUT') {
      cart[+e.target.dataset.i].qty = Math.max(1, parseInt(e.target.value) || 1);
      save(); render();
    }
  });

  document.querySelectorAll('.add-to-quote').forEach(btn => {
    btn.addEventListener('click', () => {
      addItem(btn.dataset);
      btn.classList.add('added');
      const original = btn.textContent;
      btn.textContent = 'Added';
      setTimeout(() => { btn.classList.remove('added'); btn.textContent = original; }, 1500);
      openCart();
    });
  });

  submitBtn && submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!cart.length) return;
    const lines = cart.map(c => '- ' + c.name + ' — ' + c.qty + ' pcs @ ₱' + c.price + '/pc = ₱' + (c.qty * c.price).toLocaleString('en-PH'));
    const total = cart.reduce((s, c) => s + c.qty * c.price, 0);
    const msg = 'Quote request for ' + cart.length + ' item(s):\n\n' + lines.join('\n') + '\n\nEstimated subtotal: ₱' + total.toLocaleString('en-PH') + '\n\n(Estimate only — please send firm quote.)';
    location.href = 'contact.html?product=' + encodeURIComponent('Multi-item Quote (' + cart.length + ' items)') + '&qty=' + encodeURIComponent('See message') + '&message=' + encodeURIComponent(msg);
  });

  render();
})();

// ===== Contact form: persistence + URL message =====
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const KEY = 'lls_contact_draft_v1';
  const params = new URLSearchParams(location.search);
  const urlMsg = params.get('message');
  if (urlMsg) {
    const msgField = form.querySelector('[name="message"]');
    if (msgField) msgField.value = urlMsg;
  }
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    Object.entries(saved).forEach(([k, v]) => {
      const field = form.elements[k];
      if (field && !field.value && !['access_key','subject','from_name','botcheck'].includes(k)) field.value = v;
    });
  } catch (e) {}
  let t;
  form.addEventListener('input', () => {
    clearTimeout(t);
    t = setTimeout(() => {
      const data = {};
      Array.from(form.elements).forEach(el => {
        if (el.name && el.value && !['access_key','subject','from_name','botcheck','attachment'].includes(el.name)) data[el.name] = el.value;
      });
      localStorage.setItem(KEY, JSON.stringify(data));
    }, 400);
  });
  form.addEventListener('submit', () => {
    setTimeout(() => {
      if (form.querySelector('.form-status.success')) {
        localStorage.removeItem(KEY);
        localStorage.removeItem('lls_quote_cart_v1');
      }
    }, 1500);
  });
})();

// ===== Exit-intent modal =====
(function () {
  if (sessionStorage.getItem('lls_exit_seen')) return;
  if (location.pathname.includes('contact')) return;
  const modal = document.getElementById('exit-modal');
  if (!modal) return;
  const bg = document.getElementById('exit-modal-bg');
  const form = modal.querySelector('.exit-modal-form');
  const status = modal.querySelector('.exit-modal-status');
  let shown = false;
  const show = () => {
    if (shown) return;
    shown = true;
    sessionStorage.setItem('lls_exit_seen', '1');
    modal.classList.add('open');
    bg.classList.add('open');
  };
  const hide = () => {
    modal.classList.remove('open');
    bg.classList.remove('open');
  };
  document.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget && e.clientY < 10) show();
  });
  setTimeout(show, 25000);
  modal.querySelector('.exit-modal-close').addEventListener('click', hide);
  bg.addEventListener('click', hide);
  form && form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'exit-modal-status';
    status.textContent = 'Sending...';
    try {
      const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) });
      const j = await r.json();
      if (!j.success) throw 0;
      status.className = 'exit-modal-status success';
      status.textContent = "Thanks! We'll email your discount code shortly.";
      form.reset();
      setTimeout(hide, 2200);
    } catch (err) {
      status.className = 'exit-modal-status error';
      status.textContent = 'Try again or email llsprintinginc@gmail.com';
    }
  });
})();
