// 日语语法指南 — Interactive Script

// === Theme Toggle (runs immediately to avoid flash) ===
(function() {
  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
  }
  var saved = localStorage.getItem('jpgramma-theme');
  if (!saved) {
    saved = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  }
  applyTheme(saved);
})();

document.addEventListener('DOMContentLoaded', function() {

  // === Theme Toggle Button ===
  (function() {
    var navInner = document.querySelector('.top-nav .nav-inner');
    if (!navInner) return;
    var btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.title = '切换日/夜模式';
    btn.style.cssText = 'background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.3);padding:0.25rem 0.6rem;border-radius:4px;cursor:pointer;font-size:1rem;line-height:1.4;margin-left:0.5rem;transition:background .2s;outline:none';
    function setIcon(t) { btn.textContent = t === 'dark' ? '☀️' : '🌙'; }
    setIcon(document.documentElement.dataset.theme || 'light');
    btn.addEventListener('mouseenter', function() { btn.style.background = 'rgba(255,255,255,.25)'; });
    btn.addEventListener('mouseleave', function() { btn.style.background = 'rgba(255,255,255,.15)'; });
    btn.addEventListener('click', function() {
      var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      setIcon(next);
      localStorage.setItem('jpgramma-theme', next);
    });
    navInner.appendChild(btn);
  })();

  // === Sidebar Toggle ===
  (function() {
    var sidebar = document.querySelector('.main-wrap .row > .col-lg-3');
    var content = document.querySelector('.main-wrap .row > .col-lg-9');
    if (!sidebar || !content) return;

    sidebar.classList.add('sidebar-col');
    content.classList.add('content-col');

    // Add toggle button to the top-nav bar — always visible
    var navInner = document.querySelector('.top-nav .nav-inner');
    if (!navInner) return;

    var btn = document.createElement('button');
    btn.id = 'sidebar-toggle';
    btn.innerHTML = '☰';
    btn.title = '隐藏目录';
    navInner.appendChild(btn);

    var isDesktop = window.matchMedia('(min-width: 992px)').matches;
    var saved = localStorage.getItem('jpgramma-sidebar-hidden');
    var hidden;
    if (saved !== null) {
      hidden = saved === 'true';
    } else {
      hidden = !isDesktop;
    }

    function applyState(h) {
      if (h) {
        document.body.classList.add('sidebar-hidden');
        btn.innerHTML = '☰';
        btn.title = '显示目录';
        btn.style.opacity = '0.6';
      } else {
        document.body.classList.remove('sidebar-hidden');
        btn.innerHTML = '☰';
        btn.title = '隐藏目录';
        btn.style.opacity = '1';
      }
    }
    applyState(hidden);

    btn.addEventListener('click', function() {
      var isHidden = document.body.classList.toggle('sidebar-hidden');
      applyState(isHidden);
      localStorage.setItem('jpgramma-sidebar-hidden', isHidden ? 'true' : 'false');
    });
  })();

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
