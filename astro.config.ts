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
            import Live2d from 'https://unpkg.com/@tomiaa/live2d@latest/es/index.js';

            // 创建看板娘实例
            const live2d = new Live2d({
              el: '#live2d-widget',           // 容器 ID
              model: '/models/yanwenzi.model3.json',  // 你的模型路径
              allowDrag: true,                // 开启拖拽
              width: 200,                     // 宽度
              height: 300,                    // 高度
              // 消息配置（如果需要说话功能）
              // hitokoto: true,              // 启用一言
              // messages: ['你好！', '欢迎来玩~'],
              // messageInterval: 20000,      // 间隔 20s
            });

            // 如果不想自动显示一言，可以这样配置
            // 或者用自定义消息列表
            // live2d.setMessages(['你好！', '欢迎来到我的 Wiki~']);
          `,
        },
        // 添加看板娘容器样式（确保显示在右下角）
        {
          tag: 'style',
          content: `
            #live2d-widget {
              position: fixed;
              bottom: 20px;
              right: 20px;
              z-index: 9999;
              cursor: grab;
              pointer-events: auto;
            }
            #live2d-widget:active {
              cursor: grabbing;
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