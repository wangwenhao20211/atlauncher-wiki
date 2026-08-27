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
                scale: 0.5,   // 尝试缩放（如果库支持）
                tips: {
                  typing: {
                    param: 'PARAM_MOUTH_OPEN_Y',
                    speed: 200,
                  },
                  welcomeMessage: ['你好！', '欢迎来到 Wwh Wiki！'],
                  messages: [
                    'messagestestcontent1',
                    'messagestestcontent2',
                    'messagestestcontent3',
                  ],
                  duration: 4000,
                  interval: 6000,
                },
              },
              position: 'bottom-right',   // 位置在根选项，不在 model 内
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
