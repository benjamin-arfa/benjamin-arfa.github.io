/* ARFA DIGITAL — pointer
 *
 * A dot that tracks the pointer exactly and a ring that trails it and
 * reacts to what is underneath. This file writes nothing but the two
 * outer elements' transforms; every visual state is a class on <html>
 * so CSS owns the transitions.
 *
 * Guards, in the order they matter:
 *   - fine pointer with hover only, so touch is left alone
 *   - `cursor-on` (which is what hides the native cursor) is added on
 *     the first real mouse movement, never at load: a keyboard visitor
 *     who never touches the mouse keeps the system cursor, and there is
 *     no moment where the native one is gone and this one not yet drawn
 *   - reduced motion drops the trail, not the cursor
 */
(function(){
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  if(!fine.matches) return;

  const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;

  const INTERACTIVE = 'a[href],button,[role="button"],summary,label[for],.faq-q,[data-copy-link]';
  const TEXT = 'input:not([type="button"]):not([type="submit"]):not([type="checkbox"])'
             + ':not([type="radio"]),textarea,select';

  const make = cls => {
    const el = document.createElement('div');
    el.className = 'cursor ' + cls;
    el.setAttribute('aria-hidden', 'true');
    el.appendChild(document.createElement('span'));
    return el;
  };

  const dot  = make('cursor--dot');
  const ring = make('cursor--ring');
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let tx = 0, ty = 0,          // where the pointer is
      rx = 0, ry = 0,          // where the ring has caught up to
      lastX = 0, lastY = 0,
      raf = 0, scrollRaf = 0, placed = false;

  /* The loop stops as soon as the ring converges, so a still pointer
     costs nothing. A move restarts it. */
  function frame(){
    const e = calm.matches ? 1 : 0.19;
    rx += (tx - rx) * e;
    ry += (ty - ry) * e;
    const settled = Math.abs(tx - rx) < 0.1 && Math.abs(ty - ry) < 0.1;
    if(settled){ rx = tx; ry = ty; }
    ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
    raf = settled ? 0 : requestAnimationFrame(frame);
  }

  function move(x, y){
    tx = x; ty = y;
    dot.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
    if(!placed){
      rx = x; ry = y; placed = true;
      root.classList.add('cursor-on', 'cursor-ready');
    }
    if(!raf) raf = requestAnimationFrame(frame);
  }

  /* `el` is the topmost element under the pointer. closest() walks up
     from it, so a click on the <span> inside a button still counts. */
  function evaluate(el){
    if(!el || !el.closest) return;
    const text = el.closest(TEXT);
    const hit  = text ? null : el.closest(INTERACTIVE);
    root.classList.toggle('cursor-text', !!text);
    root.classList.toggle('cursor-hover', !!hit);
    root.classList.toggle('cursor-ext', !!(hit && hit.target === '_blank'));
    root.classList.toggle('cursor-invert', !!el.closest('.section--invert'));
  }

  document.addEventListener('mousemove', e => {
    lastX = e.clientX; lastY = e.clientY;
    move(e.clientX, e.clientY);
    evaluate(e.target);
  }, {passive:true});

  /* Scrolling moves the page under a stationary pointer without firing
     mousemove, which would otherwise leave the ring stuck in a hover or
     inverted state it has scrolled out of. */
  window.addEventListener('scroll', () => {
    if(scrollRaf || !placed) return;
    scrollRaf = requestAnimationFrame(() => {
      scrollRaf = 0;
      evaluate(document.elementFromPoint(lastX, lastY));
    });
  }, {passive:true});

  document.addEventListener('mousedown', () => root.classList.add('cursor-down'));
  document.addEventListener('mouseup',   () => root.classList.remove('cursor-down'));

  const hide = () => root.classList.remove('cursor-ready');
  root.addEventListener('mouseleave', hide);
  root.addEventListener('mouseenter', () => { if(placed) root.classList.add('cursor-ready'); });

  /* Alt-tabbing away can swallow the mouseup, which would otherwise
     leave the ring stuck in its pressed state. */
  window.addEventListener('blur', () => {
    hide();
    root.classList.remove('cursor-down');
  });

  /* Hybrid machines can switch from a mouse to a touchscreen mid-visit.
     Hand the native cursor back if that happens. */
  const onChange = () => {
    if(fine.matches) return;
    root.classList.remove('cursor-on', 'cursor-ready', 'cursor-hover',
                          'cursor-down', 'cursor-ext', 'cursor-invert', 'cursor-text');
  };
  if(fine.addEventListener) fine.addEventListener('change', onChange);
})();
