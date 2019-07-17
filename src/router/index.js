import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('@/views/Index')
    },
    {
        path: '/phone',
        name: 'Phone',
        component: () => import('@/views/Phone')
    },
    {
        path: '/openid',
        name: 'OpenId',
        component: () => import('@/views/OpenId')
    },
    {
        path: '/verification_code',
        name: 'VerificationCode',
        component: () => import('@/views/VerificationCode')
    },
    {
        path: '/login_success',
        name: 'LoginSuccess',
        component: () => import('@/views/LoginSuccess')
    },
    {
        path: '/payment_success',
        name: 'PaymentSuccess',
        component: () => import('@/views/PaymentSuccess')
    },
    {
        path: '/bought_before',
        name: 'BoughtBefore',
        component: () => import('@/views/BoughtBefore')
    },
    {
        path: '/pay',
        name: 'Pay',
        component: () => import('@/views/Pay')
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
