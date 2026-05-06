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
