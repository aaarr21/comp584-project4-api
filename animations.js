// Simple Popmotion keyframes demo
// This file animates each <article> element using Popmotion's global bundle

document.addEventListener('DOMContentLoaded', () => {
  // Check Popmotion
  if (!window.popmotion) {
    console.error('Popmotion not available on window.popmotion');
    return;
  }

  const { keyframes } = window.popmotion;
  console.log('Popmotion available, keyframes:', typeof keyframes === 'function');

  // Info box
  const info = document.createElement('div');
  info.id = 'animation-info';
  info.style.cssText = 'position:fixed;right:16px;top:16px;background:#fff;padding:10px;border-radius:6px;box-shadow:0 6px 18px rgba(0,0,0,0.12);font-family:inherit;z-index:9999;max-width:220px;font-size:14px;color:#222;';
  info.innerHTML = '<strong>Popmotion Function</strong><br><code>keyframes()</code>';
  document.body.appendChild(info);

  const cards = Array.from(document.querySelectorAll('article'));
  console.log('Found article elements:', cards.length);
  if (!cards.length) return;

  // initial state
  cards.forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(30px) scale(0.96)';
    c.style.willChange = 'transform, opacity';
  });

  // animate with stagger
  cards.forEach((card, i) => {
    setTimeout(() => {
      console.log('Animate card', i);
      keyframes({
        values: [
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: -10, scale: 1.03 },
          { opacity: 1, y: 0, scale: 1 }
        ],
        times: [0, 0.7, 1],
        duration: 2000
      }).start(v => {
        const { opacity = 1, y = 0, scale = 1 } = v;
        card.style.opacity = String(opacity);
        card.style.transform = `translateY(${y}px) scale(${scale})`;
      });
    }, i * 350);
  });
});
