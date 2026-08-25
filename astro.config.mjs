import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightImageZoom from 'starlight-image-zoom';
import starlightLinksValidatorPlugin from 'starlight-links-validator';

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: 'Wwh Wiki',
            locales: {
                'zh-cn': {
                    label: '简体中文',
                    lang: 'zh-cn',  // 统一小写，与键名一致
                },
                en: {
                    label: 'English',
                    lang: 'en',
                },
            },
            defaultLocale: 'zh-cn',  // 小写，匹配上方的键名
            social: [
                { icon: 'github', label: 'GitHub', href: 'https://github.com/wangwenhao20211/atlauncher-wiki' }
            ],
            pagination: false,
            logo: {
                src: './src/assets/logo.svg',
            },
            editLink: {
                baseUrl: 'https://github.com/wangwenhao20211/atlauncher-wiki/edit/master',  // 保持你的 master 分支
            },
            sidebar: [
                {
                    label: 'Wwhgames',
                    autogenerate: { directory: 'wwhgames' },
                    collapsed: true,
                },
                {
                    label: 'B站UP',
                    autogenerate: { directory: 'bilibili_up' },
                    collapsed: true,
                },
            ],
            plugins: [starlightImageZoom(), starlightLinksValidatorPlugin()],
        }),
    ],
});
