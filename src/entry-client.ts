import { ClientOptions } from '@fmfe/genesis-core';
import Vue from 'vue';
import App from './app.vue';
import { createRouter } from './router';

export default async (clientOptions: ClientOptions): Promise<Vue> => {
    // 读取服务端下发的路由模式
    const mode = clientOptions.state.routerMode;
    // 创建路由
    const router = await createRouter(mode);
    // 设置渲染的地址
    await router.push(clientOptions.url);
    // 创建 Vue 实例
    return new Vue({
        // 传入路由对象
        router,
        clientOptions,
        render(h) {
            return h(App);
        }
    });
};
