import type { StarlightConfig } from '@astrojs/starlight';

export const head: StarlightConfig['head'] = [
  { tag: 'script', attrs: { type: 'module', src: '/scripts/l2d.js' } },
  { tag: 'script', attrs: { type: 'module', src: '/scripts/reading-time.js' } },
];
