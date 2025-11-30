document.addEventListener('DOMContentLoaded', () => {
    // Check if popmotion is loaded
    if (!window.popmotion) {
        console.error('Popmotion not loaded');
        return;
    }

    const { styler, keyframes } = window.popmotion;

    const cards = document.querySelectorAll('article');
    const cardStylers = Array.from(cards).map(styler);

    // Initial state
    cardStylers.forEach(cardStyler => {
        cardStyler.set({
            opacity: 0,
            y: 50
        });
    });

    // Animate each card sequentially with staggered timing
    cards.forEach((card, index) => {
        const delay = index * 150; // 150ms stagger between each card

        setTimeout(() => {
            // Animate opacity
            keyframes({
                values: [0, 1],
                duration: 600
            }).start((v) => {
                cardStylers[index].set('opacity', v);
            });

            // Animate Y position
            keyframes({
                values: [50, 0],
                duration: 600
            }).start((v) => {
                cardStylers[index].set('y', v);
            });
        }, delay);
    });
});
