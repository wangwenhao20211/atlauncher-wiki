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
                scale: 0.4,
                tips: {
                  typing: { param: 'ParamMouthOpenY', speed: 60 },
                  welcomeMessage: ['你好！'],
                  messages: [
                    '去评论区说几句？',
                    'zzzzzzzzzzzzz',
                    '试试搜点什么？',
                    'PlaceholderContent4',
                  ],
                  duration: 3000,
                  interval: 20000,
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
        {
          tag: 'script',
          attrs: { type: 'module' },
          content: `
            function addCreatePageButton() {
              const isEnglish = window.location.pathname.startsWith('/en/') || 
                                document.documentElement.lang?.startsWith('en');
              const sidebar = document.querySelector('.sidebar, .sl-sidebar, nav.sidebar');
              if (!sidebar) return;
              const container = document.createElement('div');
              container.style.cssText = 'padding: 1rem 0.5rem; border-top: 1px solid var(--sl-color-gray-5); margin-top: 1rem;';
              const button = document.createElement('button');
              button.textContent = isEnglish ? 'Create Page' : '创建页面';
              button.style.cssText = \`
                width: 100%;
                padding: 0.5rem 1rem;
                border: 1px solid var(--sl-color-accent);
                border-radius: 6px;
                background: transparent;
                color: var(--sl-color-accent);
                font-size: 0.9rem;
                cursor: pointer;
                transition: background 0.2s;
              \`;
              button.onmouseover = () => button.style.background = 'var(--sl-color-accent-low)';
              button.onmouseout = () => button.style.background = 'transparent';
              button.onclick = () => {
                const modal = document.createElement('div');
                modal.style.cssText = \`
                  position: fixed;
                  top: 0; left: 0; right: 0; bottom: 0;
                  background: rgba(0,0,0,0.5);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  z-index: 99999;
                \`;
                const panel = document.createElement('div');
                panel.style.cssText = \`
                  background: var(--sl-color-bg);
                  padding: 2rem;
                  border-radius: 12px;
                  max-width: 400px;
                  width: 90%;
                  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                \`;
                const label = document.createElement('label');
                label.textContent = isEnglish ? 'Enter page name (without .md):' : '输入页面名称（不含 .md）：';
                label.style.cssText = 'display: block; margin-bottom: 0.5rem; font-weight: 600;';
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = isEnglish ? 'e.g. hello-world' : '例如：hello-world';
                input.style.cssText = \`
                  width: 100%;
                  padding: 0.6rem 1rem;
                  border: 1px solid var(--sl-color-gray-5);
                  border-radius: 6px;
                  background: var(--sl-color-bg);
                  color: var(--sl-color-text);
                  font-size: 1rem;
                  margin-bottom: 1rem;
                \`;
                const btnGroup = document.createElement('div');
                btnGroup.style.cssText = 'display: flex; gap: 0.5rem; justify-content: flex-end;';
                const cancelBtn = document.createElement('button');
                cancelBtn.textContent = isEnglish ? 'Cancel' : '取消';
                cancelBtn.style.cssText = \`
                  padding: 0.5rem 1.2rem;
                  border: 1px solid var(--sl-color-gray-5);
                  border-radius: 6px;
                  background: transparent;
                  color: var(--sl-color-text);
                  cursor: pointer;
                \`;
                cancelBtn.onclick = () => document.body.removeChild(modal);
                const confirmBtn = document.createElement('button');
                confirmBtn.textContent = isEnglish ? 'Create' : '创建';
                confirmBtn.style.cssText = \`
                  padding: 0.5rem 1.2rem;
                  border: none;
                  border-radius: 6px;
                  background: var(--sl-color-accent);
                  color: white;
                  cursor: pointer;
                \`;
                confirmBtn.onclick = () => {
                  const name = input.value.trim();
                  if (!name) {
                    alert(isEnglish ? 'Please enter a page name.' : '请输入页面名称。');
                    return;
                  }
                  const path = window.location.pathname;
                  const cleanPath = path.replace(/^\\/en\\//, '/');
                  const baseUrl = 'https://github.com/wangwenhao20211/atlauncher-wiki/new/main/src/content/docs';
                  let targetPath = isEnglish ? \`en\${cleanPath}\` : cleanPath;
                  if (targetPath.endsWith('/')) targetPath = targetPath.slice(0, -1);
                  const dir = targetPath.substring(0, targetPath.lastIndexOf('/') + 1);
                  const finalPath = dir + name + '.md';
                  const createUrl = \`\${baseUrl}\${finalPath}\`;
                  window.open(createUrl, '_blank');
                  document.body.removeChild(modal);
                };
                btnGroup.appendChild(cancelBtn);
                btnGroup.appendChild(confirmBtn);
                panel.appendChild(label);
                panel.appendChild(input);
                panel.appendChild(btnGroup);
                modal.appendChild(panel);
                document.body.appendChild(modal);
                input.focus();
                input.addEventListener('keydown', (e) => {
                  if (e.key === 'Enter') confirmBtn.click();
                  if (e.key === 'Escape') document.body.removeChild(modal);
                });
              };
              container.appendChild(button);
              sidebar.appendChild(container);
            }
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', addCreatePageButton);
            } else {
              addCreatePageButton();
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