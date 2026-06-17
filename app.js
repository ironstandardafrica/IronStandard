/* ================================================================
   IRON MINT STEWARDSHIP LIMITED — app.js v4
   Nav · Scroll · Reveal · Counters · WhatsApp · Forms · Dropdown
   ================================================================ */
(() => {
  'use strict';

  const WA_NUMBER = '2347042776167';

  /* ── NAV SCROLL ── */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const tick = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', tick, { passive: true });
    tick();
  }

  /* ── MOBILE NAV TOGGLE ── */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      links.classList.toggle('open', !open);
    });
    links.querySelectorAll('a:not(.nav-dropdown-toggle)').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── ENTITIES DROPDOWN (mobile tap) ── */
  const dropToggle = document.querySelector('.nav-dropdown-toggle');
  const dropMenu   = document.querySelector('.nav-dropdown-menu');
  if (dropToggle && dropMenu) {
    dropToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropMenu.classList.toggle('open');
      dropToggle.setAttribute('aria-expanded', String(dropMenu.classList.contains('open')));
    });
    document.addEventListener('click', () => dropMenu.classList.remove('open'));
  }

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76;
        window.scrollTo({ top: target.offsetTop - navH - 16, behavior: 'smooth' });
      }
    });
  });

  /* ── SCROLL REVEAL ── */
  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
    document.querySelectorAll('[data-reveal]').forEach(el => ro.observe(el));
  } else {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('visible'));
  }

  /* ── ANIMATED COUNTERS ── */
  function animateCount(el) {
    const target   = parseFloat(el.dataset.target);
    const suffix   = el.dataset.suffix  || '';
    const prefix   = el.dataset.prefix  || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = 2200;
    const steps    = Math.ceil(duration / 16);
    let step = 0;
    const tick = () => {
      step++;
      const p     = step / steps;
      const eased = 1 - Math.pow(1 - p, 3);
      const current = target * eased;
      el.textContent = prefix + (decimals ? current.toFixed(decimals) : Math.floor(current).toLocaleString()) + suffix;
      if (step < steps) requestAnimationFrame(tick);
      else el.textContent = prefix + (decimals ? target.toFixed(decimals) : target.toLocaleString()) + suffix;
    };
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-target]').forEach(c => co.observe(c));
  }

  /* ── CEO EXPAND / COLLAPSE ── */
  const expandBtn = document.getElementById('ceo-expand-btn');
  const expandContent = document.getElementById('ceo-expand-content');
  if (expandBtn && expandContent) {
    expandBtn.addEventListener('click', () => {
      const open = expandContent.classList.toggle('open');
      expandBtn.classList.toggle('open', open);
      expandBtn.querySelector('.expand-text').textContent = open ? 'Show Less' : 'View Full Profile';
      if (open) {
        setTimeout(() => {
          expandContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    });
  }

  /* ── TASARA PILLAR SELECTOR ── */
  const pillarBtns   = document.querySelectorAll('.pillar-seg-btn');
  const pillarDetail = document.getElementById('pillar-detail');
  const pillarData   = {
    identity:     'Identity Infrastructure: TASARA assigns every participant an economic ID and Passport — creating verifiable, persistent economic identity that persists across borders and systems.',
    activity:     'Economic Activity Layer: Every transaction, service rendered, and contribution is tracked and validated within the TASARA system — making the invisible economy visible.',
    value:        'Value Systems: Credibility scores, access to structured capital, and economic reputation that compounds over time — rewarding consistent stewards.',
    continental:  'Continental Integration: Cross-border identity, trade coordination, and value exchange systems connecting Africa\'s 54 markets into a unified economic layer.',
    stewardship:  'Stewardship Economy: TASARA\'s first active expression — a governed, closed-loop commercial ecosystem operating on the Omni, a stable internal exchange standard.',
  };
  pillarBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      pillarBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      if (pillarDetail && pillarData[this.dataset.pillar]) {
        pillarDetail.innerHTML = '<p>' + pillarData[this.dataset.pillar] + '</p>';
      }
    });
  });

  /* ── WHATSAPP FLOATING BUTTON ── */
  function buildWaUrl(message) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
  }
  const waBtn = document.createElement('a');
  waBtn.className = 'wa-float';
  waBtn.href = buildWaUrl('Hello Iron Mint Stewardship Limited, I would like to enquire about your work.');
  waBtn.target = '_blank';
  waBtn.rel = 'noopener noreferrer';
  waBtn.setAttribute('aria-label', 'Chat on WhatsApp');
  waBtn.innerHTML = `
    <span class="wa-float-tip">Chat with us</span>
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>`;
  document.body.appendChild(waBtn);

  /* ── WHATSAPP FUNNEL — wire all data-wa-message elements ── */
  document.querySelectorAll('[data-wa-message]').forEach(el => {
    const msg = el.dataset.waMessage;
    if (el.tagName === 'A') {
      el.href = buildWaUrl(msg);
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    } else {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => window.open(buildWaUrl(msg), '_blank'));
    }
  });

  /* ── NEWSLETTER FORMS ── */
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        const msg = document.createElement('p');
        msg.textContent = '✓ You are now part of The Terraformation Brief.';
        msg.style.cssText = 'color:var(--gold);font-size:0.85rem;margin-top:0.5rem;font-family:var(--font-display);letter-spacing:0.1em;';
        form.replaceWith(msg);
      }
    });
  });

  /* ── CONTACT FORM ── */
  const contactForm = document.getElementById('contact-form');
  const contactMsg  = document.getElementById('contact-msg');
  if (contactForm && contactMsg) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const name = data.get('name') || 'there';
      const type = data.get('inquiry') || 'General Inquiry';
      const country = data.get('country') || '';
      const waMessage = `Hello Iron Mint,\n\nName: ${name}\nCountry: ${country}\nInquiry: ${type}\n\nMessage: ${data.get('message') || ''}`;
      const waLink    = buildWaUrl(waMessage);
      contactMsg.innerHTML = `
        <div style="border-left:3px solid var(--gold);padding:var(--sp-md);background:rgba(201,168,44,0.05);margin-top:var(--sp-md);border:1px solid rgba(201,168,44,0.2);">
          <p style="font-family:var(--font-display);font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);margin-bottom:0.5rem;">Inquiry Received</p>
          <p style="font-size:0.9rem;color:var(--white-70);">A member of our team will be in touch with you shortly, ${name}. For faster response, continue directly on WhatsApp.</p>
          <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="wa-funnel-link" style="margin-top:var(--sp-sm);display:inline-flex;">
            <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Continue on WhatsApp
          </a>
        </div>`;
      contactForm.reset();
      contactMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  /* ── NEWS FILTER ── */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.news-card[data-category]').forEach(card => {
        card.style.display = (f === 'all' || (card.dataset.category||'').includes(f)) ? '' : 'none';
      });
    });
  });

  /* ── CURRENT YEAR ── */
  document.querySelectorAll('.current-year').forEach(el => { el.textContent = new Date().getFullYear(); });

  console.log('Iron Mint Stewardship Limited — Structuring Value. Sustaining Nations.');
})();
