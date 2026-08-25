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
                root: {
                    label: '简体中文',
                    lang: 'zh-CN',
                },
            },
            social: [
                { icon: 'github', label: 'GitHub', href: 'https://github.com/wangwenhao20211/atlauncher-wiki/edit/main' }
            ],
            pagination: false,
            logo: {
                src: './src/assets/logo.svg',
            },
            editLink: {
                baseUrl: 'https://github.com/wangwenhao20211/atlauncher-wiki/edit/main',
            },
            sidebar:[
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
