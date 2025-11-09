// Simple portfolio filter and small accessibility helpers
document.addEventListener('DOMContentLoaded', function () {
  // Filter items
  const filters = document.querySelectorAll('.filter-list li');
  const boxes = document.querySelectorAll('.our-work .box');

  filters.forEach(filter => {
    filter.addEventListener('click', function () {
      // update active state
      filters.forEach(f => f.classList.remove('active'));
      this.classList.add('active');

      let key = this.getAttribute('data-filter');
      if (!key) {
        key = this.textContent.trim().toLowerCase();
      }
      boxes.forEach(box => {
        const bf = (box.getAttribute('data-filter') || box.getAttribute('data-work') || 'all').toString().toLowerCase();
        if (key === 'all' || bf === key) {
          box.style.display = '';
        } else {
          box.style.display = 'none';
        }
      });
    });
  });

  // Navbar toggler: ensure aria-expanded toggles when clicked (Bootstrap normally handles this)
  const toggler = document.querySelector('.navbar-toggler');
  if (toggler) {
    toggler.addEventListener('click', () => {
      const expanded = toggler.getAttribute('aria-expanded') === 'true';
      toggler.setAttribute('aria-expanded', String(!expanded));
    });
  }

  // Subscribe form: prevent default and show a quick confirmation (placeholder behavior)
  const subscribeForm = document.querySelector('.subscribe form');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('subscribe-email');
      if (!email || !email.value) {
        email?.focus();
        return;
      }
      // simple visual feedback
      const btn = subscribeForm.querySelector('input[type="submit"]');
      const old = btn.value;
      btn.value = 'Subscribed!';
      setTimeout(() => btn.value = old, 2000);
      email.value = '';
    });
  }

    // Prevent anchor jump for placeholder links (href="#") and support optional data-scroll targets
    document.querySelectorAll('a[href="#"]').forEach(a => {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('data-scroll');
        if (target) {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
});
