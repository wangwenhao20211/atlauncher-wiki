import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightImageZoom from 'starlight-image-zoom';
import starlightLinksValidatorPlugin from 'starlight-links-validator';

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
            social: [
                { icon: 'github', label: 'GitHub', href: 'https://github.com/wangwenhao20211/atlauncher-wiki' }
            ],
            pagination: false,
            logo: {
                src: './src/assets/logo.svg',
            },
            editLink: {
                baseUrl: 'https://github.com/wangwenhao20211/atlauncher-wiki/edit/master',
            },
            sidebar: {
    root: [
        group('Wwhgames', [
            { label: '游戏介绍', autogenerate: { directory: 'wwhgames' } },
        ]),
        group('B站UP', [
            { label: 'UP主列表', autogenerate: { directory: 'bilibili_up' } },
        ]),
    ],
    en: [
        group('Wwhgames', [
            { label: 'Game Info', autogenerate: { directory: 'wwhgames' } },
        ]),
        group('Bilibili Creators', [
            { label: 'Creator List', autogenerate: { directory: 'bilibili_up' } },
        ]),
    ],
},
            plugins: [starlightImageZoom(), starlightLinksValidatorPlugin()],
        }),
    ],
});
