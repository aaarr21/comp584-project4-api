

document.addEventListener('DOMContentLoaded', () => {
    if (!window.popmotion) {
        console.error('Popmotion not loaded (expected window.popmotion)');
        return;
    }

    console.log('window.popmotion keys:', Object.keys(window.popmotion));

    const { keyframes, styler } = window.popmotion;

    // Show which function is being used
    const info = document.createElement('div');
    info.id = 'animation-info';
    info.style.cssText = 'position:fixed;right:16px;top:16px;background:#fff;padding:10px;border-radius:6px;box-shadow:0 6px 18px rgba(0,0,0,0.12);font-family:inherit;z-index:9999;max-width:220px;font-size:14px;color:#222;';
    info.innerHTML = '<strong>Popmotion Function</strong><br><code>keyframes()</code><br><small>Animates through a sequence of values.</small>';
    document.body.appendChild(info);

    const cards = Array.from(document.querySelectorAll('article'));
    if (cards.length === 0) {
        console.warn('No article elements found to animate.');
        return;
    }

    // Initial hidden state for each card
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.96) rotate(0deg)';
        card.style.willChange = 'transform, opacity';
    });

    cards.forEach((card, i) => {
        setTimeout(() => {
            // We'll use direct style updates for maximum compatibility.
            console.log('starting animation for card index', i);

            keyframes({
                values: [
                    { opacity: 0, y: 40, scale: 0.95, rotate: 0 },
                    { opacity: 1, y: -10, scale: 1.04, rotate: 6 },
                    { opacity: 1, y: 0, scale: 1, rotate: 0 }
                ],

                // times must be between 0 and 1 — use 0, 0.7, 1 so the middle pose holds longer
                times: [0, 0.7, 1],

                duration: 2000
            }).start(v => {
                // v is an object with keys opacity, y, scale, rotate
                const { opacity = 1, y = 0, scale = 1, rotate = 0 } = v;
                card.style.opacity = String(opacity);
                card.style.transform = `translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`;
            });
        }, i * 350); // larger stagger (350ms) so cards enter more distinctly
    });
});
