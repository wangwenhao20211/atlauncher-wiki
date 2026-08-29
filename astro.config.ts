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
          tag: 'style',
          content: `
            @font-face {
              font-family: 'Caviar Dreams';
              src: url('/fonts/caviardreams.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
              font-display: swap;
            }
            body {
              font-family: 'Caviar Dreams', sans-serif;
            }
          `,
        },
        {
          tag: 'script',
          attrs: { type: 'module' },
          content: `
            let is404Cache = null;
            window.__is404 = async function() {
              if (is404Cache !== null) return is404Cache;
              try {
                const res = await fetch(window.location.href, { method: 'HEAD' });
                is404Cache = res.status === 404;
                return is404Cache;
              } catch {
                is404Cache = false;
                return false;
              }
            };
          `,
        },
        {
          tag: 'script',
          attrs: { type: 'module' },
          content: `
            import { createWidget } from 'https://esm.sh/l2d-widget@0.1.1';
            
            const htmlLang = document.documentElement.lang || '';
            const isEnglish = htmlLang.startsWith('en') || window.location.pathname.startsWith('/en/');
            
            const welcomeMsg = isEnglish ? ['Hello!'] : ['你好！'];
            const msgs = isEnglish 
              ? ['Leave a comment?', 'zzzzzzzzzzzzz', 'Try searching?', 'awa', 'You can edit this page...', 'Create pages in /src/content/docs/']
              : ['去评论区说几句？', 'zzzzzzzzzzzzz', '试试搜点什么？', 'awa', '你也可以编辑页面...', '在/src/content/docs/下创建页面'];
            
            createWidget({
              model: {
                path: '/models/YWZ/yanwenzi.model3.json',
                scale: 1.3,
                tips: {
                  typing: {
                    param: 'ParamMouthOpenY',
                    speed: 100,
                  },
                  welcomeMessage: welcomeMsg,
                  messages: msgs,
                  duration: 8000,
                  interval: 15000,
                },
              },
              display: {
                hOffset: -40,
                vOffset: -20,
              },
              position: 'bottom-right',
              size: { width: 180, height: 80 },
            });
          `,
        },
        {
          tag: 'script',
          attrs: { type: 'module' },
          content: `
            async function addReadingTime() {
              if (window.location.pathname === '/' || window.location.pathname === '/en/') return;
              
              if (window.__is404) {
                const is404 = await window.__is404();
                if (is404) return;
              }
              
              const content = document.querySelector('.sl-markdown-content, main');
              if (!content) return;
              
              const text = content.textContent || '';
              const chineseChars = (text.match(/[\\u4e00-\\u9fa5]/g) || []).length;
              const englishWords = text.trim().split(/\\s+/).filter(w => w.length > 0).length;
              const chineseTime = chineseChars / 350;
              const englishTime = englishWords / 200;
              const totalMinutes = chineseTime + englishTime;
              const readingTime = Math.max(1, Math.round(totalMinutes));
              
              const htmlLang = document.documentElement.lang || '';
              const isEnglishUI = htmlLang.startsWith('en') || window.location.pathname.startsWith('/en/');
              const label = isEnglishUI ? 'min read' : '分钟阅读';
              
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
              badge.textContent = \`\${readingTime} \${label}\`;
              
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
        {
          tag: 'script',
          attrs: { type: 'module' },
          content: `
            async function hideGiscusOn404() {
              if (window.__is404) {
                const is404 = await window.__is404();
                if (is404) {
                  const style = document.createElement('style');
                  style.textContent = '.giscus, .sl-markdown-content + div { display: none !important; }';
                  document.head.appendChild(style);
                }
              }
            }
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', hideGiscusOn404);
            } else {
              hideGiscusOn404();
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