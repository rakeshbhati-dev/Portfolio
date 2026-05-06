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