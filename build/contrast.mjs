// WCAG contrast verifier for the token palettes. Run after any colour edit.
const lin = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const L = h => { h = h.replace('#', ''); const n = i => parseInt(h.slice(i, i + 2), 16);
  return 0.2126 * lin(n(0)) + 0.7152 * lin(n(2)) + 0.0722 * lin(n(4)); };
export const ratio = (a, b) => { const x = L(a), y = L(b), hi = Math.max(x, y), lo = Math.min(x, y);
  return (hi + 0.05) / (lo + 0.05); };

const THEMES = {
  light: { surfaces: { paper: '#E9E7E1', raise: '#F2F0EB', deep: '#DFDCD4' },
           text: { ink: '#1F2A44', 'ink-soft': '#4A5468', 'ink-faint': '#545C6C' },
           nonText: { accent: '#8A6A3B' } },
  dark:  { surfaces: { paper: '#151B2A', raise: '#1D2435', deep: '#111624' },
           text: { ink: '#E9E7E1', 'ink-soft': '#B7BECD', 'ink-faint': '#8F97A8' },
           nonText: { accent: '#C39A5F' } },
  'dark invert band': { surfaces: { paper: '#E9E7E1' },
           text: { ink: '#1F2A44', 'ink-soft': '#4A5468', 'ink-faint': '#545C6C' },
           nonText: { accent: '#8A6A3B' } },
  'light invert band': { surfaces: { paper: '#1F2A44' },
           text: { ink: '#E9E7E1', 'ink-soft': '#B9BECB', 'ink-faint': '#8D95A6' },
           nonText: { accent: '#C39A5F' } },
};

let bad = 0;
for (const [name, th] of Object.entries(THEMES)) {
  console.log(`\n${name}`);
  for (const [tn, tv] of Object.entries(th.text)) {
    const rs = Object.entries(th.surfaces).map(([sn, sv]) => [sn, ratio(tv, sv)]);
    const worst = Math.min(...rs.map(r => r[1]));
    const ok = worst >= 4.5;
    if (!ok) bad++;
    console.log(`  ${tn.padEnd(10)} ${tv}  ${rs.map(([s, r]) => `${s} ${r.toFixed(2)}`).join('  ')}` +
      `   worst ${worst.toFixed(2)}  ${ok ? 'PASS' : 'FAIL (text needs 4.5)'}`);
  }
  for (const [tn, tv] of Object.entries(th.nonText)) {
    const worst = Math.min(...Object.values(th.surfaces).map(sv => ratio(tv, sv)));
    const ok = worst >= 3;
    if (!ok) bad++;
    console.log(`  ${tn.padEnd(10)} ${tv}  worst ${worst.toFixed(2)}  ${ok ? 'PASS (non-text, 3:1)' : 'FAIL'}`);
  }
}
console.log(bad ? `\n${bad} token(s) FAIL` : '\nall tokens pass');
process.exit(bad ? 1 : 0);
