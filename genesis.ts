import express from 'express';
import { SSR, Renderer, RenderOptions, RenderMode } from '@fmfe/genesis-core';

/**
 * 创建一个应用程序
 */
export const app = express();

/**
 * 创建一个 SSR 实例
 */
export const ssr = new SSR();

/**
 * 拿到渲染器后，启动应用程序
 */
export const startApp = (renderer: Renderer) => {
    const render = (options: RenderOptions = {}) => {
        return renderer.render(options).catch((err: Error) => {
            // 打印渲染失败的错误信息
            console.error(err);
            const mode: RenderMode = options.mode || 'ssr-html';
            return renderer.render({
                ...options,
                mode: mode.indexOf('html') ? 'csr-html' : 'csr-json'
            });
        });
    };
    app.use(async (req, res, next) => {
        const result = await render({ req, res, url: req.url });
        res.send(result.data);
    });
    /**
     * 监听端口
     */
    app.listen(3000, () => console.log(`http://localhost:3000`));
};
