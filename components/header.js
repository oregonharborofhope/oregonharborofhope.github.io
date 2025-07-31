function updateHitAreas() {
  document.querySelectorAll('a').forEach(link => {
    const group = link.querySelector('g');
    const rect = link.querySelector('rect');
    let bbox = null;

    if (group && rect) {
      bbox = group.getBBox();
    } else {
      const path = link.querySelector('path');
      if (path && rect) {
        bbox = path.getBBox();
      }
    }

    if (bbox && rect) {
      const padding = 5;
      rect.setAttribute('x', bbox.x - padding);
      rect.setAttribute('y', bbox.y - padding);
      rect.setAttribute('width', bbox.width + 2 * padding);
      rect.setAttribute('height', bbox.height + 2 * padding);
    }
  });
}

// Observe DOM changes and run updateHitAreas when header appears
const observer = new MutationObserver(() => {
  if (document.querySelector('.header svg')) {
    updateHitAreas();
  }
});
observer.observe(document.body, { childList: true, subtree: true });

// Also run on DOMContentLoaded in case header is already present
window.addEventListener('DOMContentLoaded', updateHitAreas);
