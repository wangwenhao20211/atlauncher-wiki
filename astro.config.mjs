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
                    {
                        label: '个人文章',
                        items: [
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
                    },
                ],
                en: [
                    {
                        label: 'Personal Articles',
                        items: [
                            {
                                label: 'Wwhgames',
                                autogenerate: { directory: 'wwhgames' },
                                collapsed: true,
                            },
                            {
                                label: 'Bilibili Creators',
                                autogenerate: { directory: 'bilibili_up' },
                                collapsed: true,
                            },
                        ],
                    },
                ],
            },
            plugins: [starlightImageZoom(), starlightLinksValidatorPlugin()],
        }),
    ],
});
