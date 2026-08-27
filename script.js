// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// Stagger siblings in grids
document.querySelectorAll('.membership-grid, .board-grid, .emergency-steps, .articles-grid').forEach(grid => {
  grid.querySelectorAll('.reveal').forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.07}s`;
  });
});

// Formspree AJAX submission
const form = document.getElementById('interest-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        status.textContent = '✓ Thank you! We\'ll be in touch soon.';
        status.style.color = 'rgba(150, 255, 150, 0.8)';
        form.reset();
        btn.textContent = 'Sent!';
      } else {
        throw new Error('Server error');
      }
    } catch {
      status.textContent = '✗ Something went wrong. Please email grick@bu.edu directly.';
      status.style.color = 'rgba(255, 150, 150, 0.8)';
      btn.textContent = 'Express Interest →';
      btn.disabled = false;
    }
  });
}
