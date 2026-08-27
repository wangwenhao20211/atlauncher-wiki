import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightImageZoom from 'starlight-image-zoom';
import starlightLinksValidatorPlugin from 'starlight-links-validator';
import starlightGiscus from 'starlight-giscus';
import { sidebar } from './astro.sidebar';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Wwh Wiki',
      locales: {
        root: { label: '简体中文', lang: 'zh-CN' },
        en: { label: 'English', lang: 'en' },
      },
      defaultLocale: 'root',
      sidebar,
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/wangwenhao20211/atlauncher-wiki',
        },
      ],
      pagination: false,
      logo: { src: './src/assets/logo.svg' },
      editLink: {
        baseUrl: 'https://github.com/wangwenhao20211/atlauncher-wiki/edit/master',
      },
      head: [
        {
          tag: 'script',
          attrs: { type: 'module' },
          content: `
            import { createWidget } from 'https://esm.sh/l2d-widget@0.1.1';
            createWidget({
              model: {
                path: '/models/yanwenzi.model3.json',
                scale: 0.35,
                tips: {
                  typing: {
                    param: 'ParamMouthOpenY',
                    speed: 80,
                  },
                  welcomeMessage: ['你好！'],
                  messages: [
                    '去评论区说几句？',
                    'zzzzzzzzzzzzz',
                    '试试搜点什么？',
                    'PlaceholderContent4',
                  ],
                  duration: 3000,
                  interval: 10000,
                },
              },
              position: 'bottom-right',
            });
          `,
        },
        {
          tag: 'script',
          attrs: { type: 'module' },
          content: `
            function addReadingTime() {
              if (window.location.pathname === '/' || window.location.pathname === '/en/') return;
              const content = document.querySelector('.sl-markdown-content, main');
              if (!content) return;
              const isEnglish = window.location.pathname.startsWith('/en/') || 
                                document.documentElement.lang?.startsWith('en');
              const text = content.textContent || '';
              const chineseChars = (text.match(/[\\u4e00-\\u9fa5]/g) || []).length;
              const englishWords = text.trim().split(/\\s+/).filter(w => w.length > 0).length;
              const chineseTime = chineseChars / 350;
              const englishTime = englishWords / 200;
              const totalMinutes = Math.max(chineseTime, englishTime);
              const readingTime = Math.max(1, Math.round(totalMinutes));
              const badge = document.createElement('div');
              badge.style.cssText = \`
                display: inline-block;
                padding: 4px 14px;
                margin-bottom: 16px;
                background: var(--sl-color-gray-6);
                color: var(--sl-color-white);
                border-radius: 20px;
                font-size: 0.85rem;
                opacity: 0.8;
              \`;
              badge.textContent = isEnglish ? \`\${readingTime} min read\` : \`\${readingTime} 分钟阅读\`;
              const title = content.querySelector('h1, h2, h3');
              if (title) {
                title.parentNode.insertBefore(badge, title);
              } else {
                content.prepend(badge);
              }
            }
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', addReadingTime);
            } else {
              addReadingTime();
            }
          `,
        },
      ],
      plugins: [
        starlightImageZoom(),
        starlightLinksValidatorPlugin(),
        starlightGiscus({
          repo: 'wangwenhao20211/atlauncher-wiki',
          repoId: 'R_kgDOUDmcbA',
          category: 'Announcements',
          categoryId: 'DIC_kwDOUDmcbM4DEO0g',
        }),
      ],
    }),
  ],
});