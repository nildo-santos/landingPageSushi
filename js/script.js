const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ratingElement = document.querySelector('.review-score');
const title = document.querySelector('.sushi-title');

if (reduceMotion) {
    ratingElement.textContent = '4.9';
} else {
    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } });
    tl.addLabel('cenario', 0)
        .addLabel('cabecalho', 0.2)
        .addLabel('nome', 0.55)
        .addLabel('prato', 0.85)
        .addLabel('subtitulo', 1.15)
        .addLabel('detalhes', 1.45)
        .addLabel('avaliacao', 1.85)
        .addLabel('contagem', 2.05)
        .addLabel('reflexo', 3.4);

    tl.from('.hero', {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut',
        clearProps: 'opacity',
    }, 'cenario');
    tl.from('.hero > .container', {
        scale: 0.98,
        duration: 2.8,
        clearProps: 'transform',
    }, 'cenario');

    tl.from('.logo, .menu a, .btn-menu, .btn-delivery', {
        opacity: 0,
        y: -12,
        stagger: 0.06,
    }, 'cabecalho');

    tl.from('.sushi-title > span', {
        x: -14,
        y: 14,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
    }, 'nome');

    tl.from('.prato', {
        opacity: 0,
        scale: 0.94,
        duration: 1.1,
        onComplete: () => {
            gsap.to('.prato', {
                rotation: 360,
                duration: 100,
                repeat: -1,
                ease: 'none',
            });
        },
    }, 'prato');

    tl.from('.content-hero h2', {
        y: 16,
        opacity: 0,
    }, 'subtitulo');
    tl.from('.divisor', {
        scaleX: 0,
        transformOrigin: 'left center',
    }, 'detalhes');

    tl.from('.content-hero p, .ctas a', {
        y: 16,
        opacity: 0,
        stagger: 0.1,
    }, 'detalhes');

    tl.from('.review', {
        opacity: 0,
        y: 12,
        scale: 0.97,
    }, 'avaliacao');

    const rating = { value: 0 };
    ratingElement.textContent = '0.0';
    tl.to(rating, {
        value: 4.9,
        duration: 1.2,
        onUpdate: () => {
            ratingElement.textContent = rating.value.toFixed(1);
        },
        onComplete: () => {
            ratingElement.textContent = '4.9';
        },
    }, 'contagem');

    tl.call(() => title.classList.add('is-shining'), [], 'reflexo');
}
