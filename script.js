        /* ── Hamburger ── */
        const navBtn = document.getElementById('hamburger');
        const navMenu = document.getElementById('mobileMenu');
        navBtn.addEventListener('click', () => {
            navBtn.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
        navMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
            navBtn.classList.remove('open');
            navMenu.classList.remove('open');
        }));

        /* ── Scroll reveal ── */
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
            });
        }, { threshold: 0.08 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        /* ── Gallery carousel ── */
        const state = {};

        function initGallery(id) {
            const slides = document.getElementById('slides-' + id);
            const total = slides.children.length;
            state[id] = { current: 0, total };
        }

        function goTo(id, index) {
            const s = state[id];
            if (index < 0 || index >= s.total) return;
            s.current = index;

            // move slides
            document.getElementById('slides-' + id).style.transform = `translateX(-${index * 100}%)`;

            // update dots
            document.querySelectorAll(`#dots-${id} .dot`).forEach((d, i) => {
                d.classList.toggle('active', i === index);
            });

            // update badge
            document.getElementById('badge-' + id).textContent = `${index + 1} / ${s.total}`;

            // update arrow states
            document.querySelectorAll(`[data-gallery="${id}"].prev`).forEach(b => b.disabled = index === 0);
            document.querySelectorAll(`[data-gallery="${id}"].next`).forEach(b => b.disabled = index === s.total - 1);
        }

        // init all galleries
        document.querySelectorAll('.card-gallery').forEach(g => {
            const id = g.dataset.gallery;
            initGallery(id);
            goTo(id, 0);
        });

        // arrow clicks
        document.querySelectorAll('.gallery-arrow').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.gallery;
                const dir = parseInt(btn.dataset.dir);
                goTo(id, state[id].current + dir);
            });
        });

        // dot clicks
        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', () => {
                goTo(dot.dataset.gallery, parseInt(dot.dataset.index));
            });
        });

        // touch/swipe support
        document.querySelectorAll('.card-gallery').forEach(g => {
            let startX = 0;
            g.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
            g.addEventListener('touchend', e => {
                const diff = startX - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 40) {
                    const id = g.dataset.gallery;
                    goTo(id, state[id].current + (diff > 0 ? 1 : -1));
                }
            });
        });

        /* ── Contact form ── */
        // const form = document.getElementById('contactForm');
        // const formMsg = document.getElementById('formMsg');

        // form.addEventListener('submit', e => {
        //     e.preventDefault();

        //     const btn = form.querySelector('.form-submit');
        //     btn.textContent = 'Sending…';
        //     btn.disabled = true;

        //     // Simulate send (replace with real fetch/EmailJS later)
        //     setTimeout(() => {
        //         btn.textContent = 'Send Message';
        //         btn.disabled = false;
        //         form.reset();
        //         formMsg.classList.add('show');
        //         setTimeout(() => formMsg.classList.remove('show'), 4000);
        //     }, 1400);
        // });

        // input floating-label active state
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
            el.addEventListener('focus', () => el.closest('.form-group').classList.add('focused'));
            el.addEventListener('blur', () => el.closest('.form-group').classList.remove('focused'));
        });

        const form = document.getElementById("contactForm");
const msg = document.getElementById("formMsg");
const btn = form.querySelector(".form-submit");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  btn.disabled = true;
  btn.textContent = "Sending...";

  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      msg.classList.add("show");   // ✅ FIXED
      form.reset();

      setTimeout(() => {
        msg.classList.remove("show"); // ✅ smooth hide
      }, 4000);

    } else {
      alert("Something went wrong.");
    }

  } catch (error) {
    alert("Network error.");
  }

  btn.disabled = false;
  btn.textContent = "Send Message →";
});