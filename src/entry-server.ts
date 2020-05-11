import { RenderContext } from '@fmfe/genesis-core';
import Vue from 'vue';
import App from './app.vue';
import { createRouter } from './router';

export default async (renderContext: RenderContext): Promise<Vue> => {
    // 读取传过来的路由模式
    const mode = renderContext.data.state.routerMode;
    // 创建路由
    const router = await createRouter(mode);
    // 设置渲染的地址
    await router.push(renderContext.data.url);
    // 创建 Vue 实例
    return new Vue({
        // 传入路由对象
        router,
        renderContext,
        render(h) {
            return h(App);
        }
    });
};
