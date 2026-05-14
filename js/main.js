/* =====================================================================
   B.ARFA — pixel scene renderer & interactions
   ====================================================================
   Each scene is a multi-line ASCII grid where each char maps to a color
   in the PALETTE table. Rendered as <rect>s into an SVG with crispEdges.
   ===================================================================== */

const PAL = {
  S:'#5fb6e8', s:'#7cc4ec', p:'#b9e3ff', P:'#8ec8f0',
  c:'#e9f4fb', C:'#ffffff', x:'#cbd6da',
  g:'#3aa05a', G:'#2b8048', t:'#3c6b3a', T:'#244a26',
  d:'#5a3a26', D:'#3a2516',
  y:'#ffd66b', Y:'#f0b13e', o:'#f08a7a', O:'#c95c4a',
  f:'#ffb1a1', F:'#ff7c63',
  w:'#cbd6da', W:'#8c9aa0', k:'#0a1216', K:'#2a3942',
  r:'#e54b4b', R:'#a82d2d',
  b:'#268bd2', B:'#1d6fa6',
  l:'#fdf6e3', L:'#d7c89a',
  m:'#7f8a8e', M:'#4f5b62',
  a:'#cdd5d8', A:'#788a90',
  z:'#dc322f', Z:'#a52a2a',
  e:'#2aa198', E:'#1a7872',
};

const CLOUD_PAL = { C:'#0e4a55', c:'#072e36' };
const CLOUD = `
....CCCCC.....
..CCccccccC...
.CcccccccccC..
CccccccccccccC
.CccccccccccC.
..CCcccccCC...
.....CCC......
`;

const SCENE_BASEL = `
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSCCSSSSSSSSSSSSSSSSCCSSSSSSSSSSSSS
SSCCccCSSSSSSSSSSSSCCccCSSSSSSCCCCSS
SCcccccCSSSSSSSSSCcccccCSSSSCccccCSS
SCccccCSSSSSSSSSSCCcccCSSSSSCccccCSS
SSCCCSSSSSSSSSSSSSCCSSSSSSSSSCCCSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSyySSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSyYYySSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSyySSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSWWSSSSSSSSSSSSSSSSWWSSSSSS
SSSSSSSSSWKKWSSSSSSSWWSSSSSSWKKWSSSS
SSSSSSSWWKKKKWSSSSSWKKWSSSWWKKKKWSSS
SSSSSWWKKKKKKKWWSSWKKKWSSWKKKKKKKWSS
SSSSWKKKKKKKKKKWSWKKKKKWWKKKKKKKKKWS
SSSWKKKWWKKKWKKWWKKWKKKWKKKWKKKKKWSS
SSWKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKWS
SWKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKW
WKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
gGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgG
gggggggggggggggggggggggggggggggggggg
`;

const SCENE_ROCKET = `
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSCCSSSSSSSSSSSSSCSSSSSSSSSSSCCSSSS
SSCccCSSSSSSSSSSCCCCSSSSSSSSCcccCSSS
SCcccCSSSSSSSSCccccCSSSSSSSSCccccCSS
SSCCCSSSSSSSSSCCCCSSSSSSSSSSSCCCSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSWWSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSWLLWSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSWLLWSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSWWLLWWSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSWWRRRRWWSSSSSSSSSSSSSSS
SSSSSSSSSSSSWRRRRRRRRWSSSSSSSSSSSSSS
SSSSSSSSSSSWfffYYYYYffWSSSSSSSSSSSSS
SSSSSSSSSSofyyOOOOOOyyfoSSSSSSSSSSSS
SSSSSSSSSooffyYYOOYYyffooSSSSSSSSSSS
SSSSSSSSofyyYYOOOOOOYYyyfoSSSSSSSSSS
SSSSSSooffyyYYYYOOYYYYyyffooSSSSSSSS
SSSSooffyyYYffffOOOOffffYYyyffooSSSS
SSooffyyYYffOOffOOOOOOffOOffYYyyffoS
DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
gGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgG
gggggggggggggggggggggggggggggggggggg
`;

const SCENE_ALPS = `
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSCCCCSSSSSSSSSSSSSSSSSS
SSSSSCCSSSSSCCccccCSSSSSSSCCSSSSSSSS
SSSCCccCSSSCccccccCSSSSSCCccCSSSSSSS
SSSCCCCSSSSSCCccCCSSSSSSSCCCSSSSSSSS
SSSSSSSSSSSSSSCCSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSlllSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSlllllSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSlllmmmlSSSSSSSSSSSSSSSSSS
SSSSSSSSSSlllmmmmllSSSSSSSSSSSSSSSSS
SSSSSSSSSlllmmmmmmllSSSSSSSSSSSSSSSS
SSSSSSSSmlmmmmmmmmmmlSSSSSSSSSlSSSSS
SSSSSSSmmmmMMmmmmmmmmlSSSSSSllllSSSS
SSSSSSmmmMMMMMmmmmmmmmlSSSlllmmmllSS
SSSSSmmMMMMMMMmmmmmmmmmlSlmmmMMMmmlS
SSSSmmMMMMMMMMMmmmmmmmmmmmmMMMMMmmml
SSSmmMMMMMMMMMMMmmmmmmmmmmMMMMMMMmmm
SSmmMMMMMMMMMMMMMmmmmmmmmmMMMMMMMMmm
ggggggggggggggggggggggggggggggGggggg
gGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgG
gggggggggggggggggggggggggggggggggggg
`;

// Matterhorn-only (about page hero scene)
const SCENE_MATTERHORN = `
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSCCSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSCCccCSSSSSSSSSSSSSSSSSSCCSSSSSSS
SSSCcccccCSSSSSSSSSSSSSSSCCccCSSSSSS
SSSSCCccCSSSSSSSSSSSSSSSSSCCSSSSSSSS
SSSSSCCSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSlSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSlllSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSlllmlSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSlllmmllSSSSSSSSSSSSSSSS
SSSSSSSSSSSSlllmmmmlSSSSSSSSSSSSSSSS
SSSSSSSSSSSlllmmmmmmlSSSSSSSSSSSSSSS
SSSSSSSSSSlllmmmMMmmlSSSSSSSSSSSSSSS
SSSSSSSSSlllmMMMMMmmllSSSSSSSSSSSSSS
SSSSSSSSlllmMMMMMMMmmllSSSSSSSSSSSSS
SSSSSSSlllmmMMMMMMMMmmmllSSSSSSSSSSS
SSSSSSlllmmMMMMMMMMMMmmmmllSSSSSSSSS
SSSSSlllmmMMMMMMMMMMMMMmmmmllSSSSSSS
SSSSlllmmMMMMMMMMMMMMMMMMmmmmllSSSSS
ggggggggggggggggggggggggggggggggggGg
gGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgG
`;

// Database / data center pulsing — for services
const SCENE_DATA = `
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSCCSSSSSSSSSSSSSSCCSSSSSSSSSSCCSSS
SSCCccCSSSSSSSSSSCCccCSSSSSSSCCccCSS
SSSCCCSSSSSSSSSSSSCCSSSSSSSSSSCCSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSWWWWWWWWSSSSSSSSSSSSWWWWWWWWSSSS
SSSWaaaaaaaaWSSSSSSSSSSWaaaaaaaaWSSS
SSSWaeeeeeeeWSSSSSSSSSSWaeeeeeeeWSSS
SSSWaaaaaaaaWSSSSSSSSSSWaaaaaaaaWSSS
SSSWaeeeeeeeWSSSSSSSSSSWaeeeeeeeWSSS
SSSWaaaaaaaaWSSSSSSSSSSWaaaaaaaaWSSS
SSSWabbbbbbbWSSSSSSSSSSWabbbbbbbWSSS
SSSWaaaaaaaaWSSSSSSSSSSWaaaaaaaaWSSS
SSSWWWWWWWWWWSSSSSSSSSSWWWWWWWWWWSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
gGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgG
gggggggggggggggggggggggggggggggggggg
`;

// Antenna / radar dish — for blog
const SCENE_ANTENNA = `
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSCCSSSSSSSSSSSSSSSSSSS
SSSSSSSCSSSSSCCCCCSSSSSSSSSSSSCSSSSS
SSSSSCCCCSSSCCCCCCSSSSSSSSSSCCCCSSSS
SSSSCCCCCSSSSCCCCSSSSSSSSSSCCCCCSSSS
SSSSSCCCSSSSSSSCSSSSSSSSSSSSCCCSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSWWWWWWWWWWWWWWWWSSSSSSSSSSSSSSSS
SSSWWWWWWWWWWWWWWWWWWSSSSSSSSSSSSSSS
SSSWWWWWlllllllllWWWWSSSSSSSSSSSSSSS
SSSSWWWWlllllllllWWWSSSSSSSSSSSSSSSS
SSSSSWWWlllllllllWWSSSSSSSSSSSSSSSSS
SSSSSSWWWWWWWWWWWSSSSSSSSSSSSSSSSSSS
SSSSSSSSSWWKKWWSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSWKWSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSWKWSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSWKWSSSSSSSSSSSSSSSSSSSSSSS
oooooooooooKoooooooooooooooooooooooo
oOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoOoO
oooooooooooooooooooooooooooooooooooo
`;

// Hands shaking / community (for involvement)
const SCENE_COMMUNITY = `
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSCCSSSSSSSSSSSSSSSSSCCSSSSSSSCCCSSS
SCccCSSSSSSSSSCCSSSCCccCSSSSCCcccCSS
SCccCSSSSSSSSCccCSSCccCSSSSSCccccCSS
SSCSSSSSSSSSSSCCSSSSCCSSSSSSSCCCSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSffSSSSSSSSSSSSSSSffSSSSSSSSS
SSSSSSSfFFfSSSSSSSSSSSSSfFFfSSSSSSSS
SSSSSSfFFFFfSSSSSSSSSSSfFFFFfSSSSSSS
SSSSSfFFFFFFfSSSSSSSSSfFFFFFFfSSSSSS
SSSSfFFFFFFFFfSSSSSSSfFFFFFFFFfSSSSS
SSSSfFFFFFFFFFffSSSffFFFFFFFFFfSSSSS
SSSSSfFFFFFFFFFFfffFFFFFFFFFFfSSSSSS
SSSSSSfFFFFFFFFFFFFFFFFFFFFFfSSSSSSS
SSSSSSSffFFFFFFFFFFFFFFFFFffSSSSSSSS
SSSSSSSSSffFFFFFFFFFFFFFffSSSSSSSSSS
SSSSSSSSSSSffffffffffffSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
gGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgG
gggggggggggggggggggggggggggggggggggg
`;

// Mail / envelope (for contact)
const SCENE_MAIL = `
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSCCSSSSSSSSSSSSCCSSSSSSSSSSSSCCSSSS
SCccCSSSSSSSSSCccCSSSSSSSSSSCccCSSSS
SCccCSSSSSSSSSCccCSSSSSSSSSSCccCSSSS
SSCSSSSSSSSSSSSCSSSSSSSSSSSSSCSSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSWWWWWWWWWWWWWWWWWWWWWWWWWWWWSSSS
SSSWllllllllllllllllllllllllllWSSSS
SSSWlLLLLLLLLLLLLLLLLLLLLLLLLLLWSSS
SSSWlLkkkkkkkkkkkkkkkkkkkkkkkkLWSSS
SSSWlLkLLLLLLLLLLLLLLLLLLLLLkkLWSSS
SSSWlLLkLLLLLLLLLLLLLLLLLLkkLLLWSSS
SSSWlLLLkkLLLLLLLLLLLLLLkkLLLLLWSSS
SSSWlLLLLLkkkLLLLLLLLkkkLLLLLLLWSSS
SSSWlLLLLLLLLkkkkkkkkLLLLLLLLLLWSSS
SSSWlLLLLLLLLLLLLLLLLLLLLLLLLLLWSSS
SSSWWWWWWWWWWWWWWWWWWWWWWWWWWWWWSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
gGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgGgG
`;

// Strip scenes (32×8 mini) — for archive cards & decorative dividers
const STRIP_ANTENNA = `
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSSSSSWWWWWWWWWWWWWWSSSSSCSSSS
SSSSSSWWWWWWWWWWWWWWWWWWSSCCCSSS
SSSSSWWWWWLLLLLLLLLWWWWWSCCCCCSS
SSSSSSWWWLLLLLLLLLLLWWWSSSCCCSSS
SSSSSSSWWWWWWWWWWWWWWSSSSSSSSSSS
SSSSSSSSSSSWWKKWWSSSSSSSSSSSSSSS
DDDDDDDDDDDDKDDDDDDDDDDDDDDDDDDD
`;
const STRIP_EYE = `
SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
SSSSCCSSSSSSSSSSSCSSSSSSCSSSSSSS
SSCCccCSSSSSSSCCCCCSSSCCCCCSSSSS
SSSCCCSSSSSSSCCWWWCCSSSCCCSSSSSS
SSSSSSSSSSSSSCWbbbWCSSSSSSSSSSSS
SSSSSSSSSSSSSCWbKbWCSSSSSSSSSSSS
SSSSSSSSSSSSSCCWWWCCSSSSSSSSSSSS
DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
`;
const STRIP_ASTEROID = `
KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
KKKKKKlKKKKKKKKKKKlKKKKKKKKKKlKK
KKKKWWWKKKKKKWWWKKKKKKKKKWWWKKKK
KKKWWWWWKKKWWWWWWWKKKKKWWWWWWWKK
KKWWmmWWWKWWWmmmWWKKKWWWmmmmWWKK
KKWWmmmWWKWWmmmmWWKKKWmmmmmmWWKK
KKKWWWWWKKKKWWWWKKKKKKWWWWWWKKKK
KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
`;
const STRIP_GRID = `
KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
KbKbKbKbKbKbKbKbKbKbKbKbKbKbKbKb
KbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbK
KbKbKbKbKbKbKbKbKbKbKbKbKbKbKbKb
KbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbK
KbKbKbKbKbKbKbKbKbKbKbKbKbKbKbKb
KbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbK
KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
`;

const SCENES = {
  basel:           SCENE_BASEL,
  rocket:          SCENE_ROCKET,
  alps:            SCENE_ALPS,
  matterhorn:      SCENE_MATTERHORN,
  data:            SCENE_DATA,
  antenna:         SCENE_ANTENNA,
  community:       SCENE_COMMUNITY,
  mail:            SCENE_MAIL,
  'strip-antenna': STRIP_ANTENNA,
  'strip-eye':     STRIP_EYE,
  'strip-asteroid':STRIP_ASTEROID,
  'strip-grid':    STRIP_GRID,
};

function renderScene(target, grid, palette){
  const rows = grid.trim().split('\n');
  const h = rows.length;
  const w = Math.max(...rows.map(r=>r.length));
  const svgns='http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgns,'svg');
  svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
  svg.setAttribute('preserveAspectRatio','xMidYMid slice');
  svg.setAttribute('shape-rendering','crispEdges');
  const bg = document.createElementNS(svgns,'rect');
  bg.setAttribute('x',0);bg.setAttribute('y',0);
  bg.setAttribute('width',w);bg.setAttribute('height',h);
  bg.setAttribute('fill', palette.S || '#5fb6e8');
  svg.appendChild(bg);
  for(let y=0;y<h;y++){
    const row = rows[y];
    for(let x=0;x<row.length;x++){
      const ch = row[x];
      if(ch === ' ' || ch === '.' || ch === 'S') continue;
      const col = palette[ch];
      if(!col) continue;
      const r = document.createElementNS(svgns,'rect');
      r.setAttribute('x',x);r.setAttribute('y',y);
      r.setAttribute('width',1);r.setAttribute('height',1);
      r.setAttribute('fill',col);
      svg.appendChild(r);
    }
  }
  target.innerHTML='';
  target.appendChild(svg);
}

function renderCloud(svg){
  const rows = CLOUD.trim().split('\n');
  const h = rows.length;
  const w = Math.max(...rows.map(r=>r.length));
  svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
  svg.setAttribute('shape-rendering','crispEdges');
  for(let y=0;y<h;y++){
    for(let x=0;x<rows[y].length;x++){
      const ch = rows[y][x];
      if(!CLOUD_PAL[ch]) continue;
      const r = document.createElementNS('http://www.w3.org/2000/svg','rect');
      r.setAttribute('x',x);r.setAttribute('y',y);
      r.setAttribute('width',1);r.setAttribute('height',1);
      r.setAttribute('fill',CLOUD_PAL[ch]);
      svg.appendChild(r);
    }
  }
}

const ROLES = [
  'DATA &amp; SOFTWARE ENGINEER',
  'HEALTHCARE INTEROPERABILITY',
  'METADATA ARCHITECTURE',
  'BASEL, SWITZERLAND',
];

function initRoleRotator(){
  const rot = document.getElementById('role-rotator');
  if(!rot) return;
  let i = 0;
  rot.style.transition = 'opacity .2s ease';
  setInterval(()=>{
    i = (i+1) % ROLES.length;
    rot.style.opacity = 0;
    setTimeout(()=>{ rot.innerHTML = ROLES[i]; rot.style.opacity = 1; }, 200);
  }, 3000);
}

function initSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if(!id) return;
      const el = document.getElementById(id);
      if(!el) return;
      e.preventDefault();
      window.scrollTo({top: el.offsetTop - 70, behavior:'smooth'});
    });
  });
}

function initBlogFilters(){
  const buttons = document.querySelectorAll('.blog-filter button');
  if(!buttons.length) return;
  buttons.forEach(b => b.addEventListener('click', () => {
    const filter = b.dataset.filter;
    buttons.forEach(x => x.classList.toggle('active', x === b));
    document.querySelectorAll('.post[data-categories]').forEach(post => {
      const cats = (post.dataset.categories || '').split(' ');
      post.style.display = (filter === 'all' || cats.includes(filter)) ? '' : 'none';
    });
  }));
}

function initBlogSearch(){
  const input = document.getElementById('blog-search');
  if(!input) return;
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    document.querySelectorAll('.post').forEach(post => {
      const text = post.innerText.toLowerCase();
      post.style.display = (q === '' || text.includes(q)) ? '' : 'none';
    });
  });
}

function initFAQ(){
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if(!q) return;
    q.addEventListener('click', () => item.classList.toggle('open'));
  });
}

function initSkillsFilter(){
  const buttons = document.querySelectorAll('.skills-filter button');
  if(!buttons.length) return;
  buttons.forEach(b => b.addEventListener('click', () => {
    const filter = b.dataset.filter;
    buttons.forEach(x => x.classList.toggle('active', x === b));
    document.querySelectorAll('.skill-col').forEach(col => {
      col.style.display = (filter === 'all' || col.dataset.category === filter) ? '' : 'none';
    });
  }));
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.pixel-bg svg').forEach(renderCloud);
  document.querySelectorAll('[data-art]').forEach(el => {
    const key = el.getAttribute('data-art');
    if(SCENES[key]) renderScene(el, SCENES[key], PAL);
  });
  initRoleRotator();
  initSmoothScroll();
  initBlogFilters();
  initBlogSearch();
  initFAQ();
  initSkillsFilter();
});
