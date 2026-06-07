// 日语语法指南 — Interactive Script
document.addEventListener('DOMContentLoaded', function() {

  // === Toggle hidden answers ===
  document.querySelectorAll('.hidex').forEach(function(el) {
    el.style.cursor = 'pointer';
    el.style.display = 'none';
    el.parentElement.addEventListener('click', function() {
      el.style.display = el.style.display === 'none' ? 'inline' : 'none';
    });
  });

  // === Toggle all answers button ===
  document.querySelectorAll('[data-toggle-answers]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = btn.getAttribute('data-toggle-answers');
      var container = document.getElementById(target) || document.querySelector(target) || document;
      var hidden = container.querySelectorAll('.hidex');
      var anyHidden = Array.from(hidden).some(function(el) { return el.style.display === 'none'; });
      hidden.forEach(function(el) { el.style.display = anyHidden ? 'inline' : 'none'; });
      btn.textContent = anyHidden ? '隐藏答案' : '显示全部答案';
    });
  });

  // === Global toggle all ===
  var globalBtn = document.createElement('button');
  globalBtn.textContent = '显示全部答案';
  globalBtn.className = 'btn btn-sm btn-outline-primary mb-3';
  globalBtn.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:999;padding:0.5rem 1rem;border-radius:20px;box-shadow:0 2px 10px rgba(0,0,0,.2);';
  var hasAnswers = document.querySelector('.hidex');
  if (hasAnswers) {
    document.body.appendChild(globalBtn);
    globalBtn.addEventListener('click', function() {
      var hidden = document.querySelectorAll('.hidex');
      var anyHidden = Array.from(hidden).some(function(el) { return el.style.display === 'none'; });
      hidden.forEach(function(el) {
        el.style.display = anyHidden ? 'inline' : 'none';
      });
      globalBtn.textContent = anyHidden ? '隐藏全部答案' : '显示全部答案';
    });
  }

  // === Spoiler toggle ===
  document.querySelectorAll('.spoiler').forEach(function(el) {
    el.addEventListener('click', function() {
      el.classList.toggle('reveal');
    });
  });

  // === Smooth scroll for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // === Sidebar active state on scroll ===
  var headings = document.querySelectorAll('.content h2[id], .content h3[id]');
  if (headings.length > 0) {
    var tocLinks = document.querySelectorAll('.toc-section a');
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          tocLinks.forEach(function(link) {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.parentElement.classList.add('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -80% 0px' });
    headings.forEach(function(h) { observer.observe(h); });
  }
});
