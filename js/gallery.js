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

    document.getElementById('slides-' + id).style.transform = `translateX(-${index * 100}%)`;

    document.querySelectorAll(`#dots-${id} .dot`).forEach((d, i) => {
        d.classList.toggle('active', i === index);
    });

    document.getElementById('badge-' + id).textContent = `${index + 1} / ${s.total}`;

    document.querySelectorAll(`[data-gallery="${id}"].prev`).forEach(b => b.disabled = index === 0);
    document.querySelectorAll(`[data-gallery="${id}"].next`).forEach(b => b.disabled = index === s.total - 1);
}