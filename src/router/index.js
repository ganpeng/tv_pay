import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/Login')
    },
    {
        path: '/',
        name: 'GetMessage',
        component: () => import('@/views/GetMessage')
    }
];

const router = new Router({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    next();
});

export default router;
