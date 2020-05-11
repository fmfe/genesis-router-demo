import Vue from 'vue';
import Router, { RouterMode } from 'vue-router';

Vue.use(Router);

export const createRouter = (mode: RouterMode = 'history') => {
    return new Router({
        mode: mode,
        routes: [
            // 配置你的路由
            {
                path: '/',
                component: () =>
                    import('./views/home.vue').then((m) => m.default)
            },
            {
                path: '/about',
                component: () =>
                    import('./views/about.vue').then((m) => m.default)
            }
        ]
    });
};
