/* V49: enforce minimum 20px for readable visible text across all pages. */
(() => {
  'use strict';
  const MIN = 20;
  const IGNORE = 'script,style,svg,svg *,canvas,iframe,template,noscript';
  let scheduled = false;
  function applyMinimum() {
    scheduled = false;
    const all = document.body ? document.body.querySelectorAll('*') : [];
    for (const el of all) {
      if (el.matches(IGNORE)) continue;
      // Only elements with their own text; do not overwrite layout wrappers or icon glyphs.
      if (!Array.from(el.childNodes).some(n => n.nodeType === 3 && n.textContent.trim())) continue;
      const size = parseFloat(getComputedStyle(el).fontSize);
      if (Number.isFinite(size) && size < MIN - .05) {
        el.style.setProperty('font-size', `${MIN}px`, 'important');
      }
    }
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(applyMinimum);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, {once:true});
  else schedule();
  // Translations and editor operations can replace text nodes after initial render.
  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, {subtree:true, childList:true, characterData:true, attributes:true, attributeFilter:['class','style','lang']});
  window.addEventListener('load', schedule);
})();
