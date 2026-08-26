export function group(label: string, items: any[], translations?: Record<string, string>) {
  return { label, items, ...(translations && { translations }) };
}

export const sidebar = [
  group(
    '🎮 Wwhgames',
    [
      {
        label: 'Wwhgames',
        translations: { en: 'Wwhgames' },
        autogenerate: { directory: 'wwhgames' },
        collapsed: true,
      },
    ],
    { en: '🎮 Wwhgames' }
  ),
  group(
    '📺 B站UP',
    [
      {
        label: 'B站UP',
        translations: { en: 'Bilibili Creators' },
        autogenerate: { directory: 'bilibili_up' },
        collapsed: true,
      },
    ],
    { en: '📺 Bilibili Creators' }
  ),
];