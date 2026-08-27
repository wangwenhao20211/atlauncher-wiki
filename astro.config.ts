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
        root: {
          label: '简体中文',
          lang: 'zh-CN',
        },
        en: {
          label: 'English',
          lang: 'en',
        },
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
      logo: {
        src: './src/assets/logo.svg',
      },
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
              },
              position: 'bottom-right',
              scale: 0.6,
            });
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
