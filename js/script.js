        /* ── Scroll reveal ── */
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
            });
        }, { threshold: 0.08 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
       
        // input floating-label active state
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
            el.addEventListener('focus', () => el.closest('.form-group').classList.add('focused'));
            el.addEventListener('blur', () => el.closest('.form-group').classList.remove('focused'));
        });

        