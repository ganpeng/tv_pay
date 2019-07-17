import Vue from 'vue';
import '@/assets/css/global.scss';

//  引入fetch库
import 'whatwg-fetch';

//  导入验证码组件
import VueInputCode from 'vue-input-code';
Vue.component('VueInputCode', VueInputCode)

//  全局loading组件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading, {
    color: '#00ABFF'
});

import Vconsole from 'vconsole';
new Vconsole();

//  获取service
import service from '@/service';
import router from '@/router';

import App from './App.vue'

//  初始化svg组件
import './icons';
require('./util/rem');

Vue.prototype.$service = service;
Vue.config.productionTip = false

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');