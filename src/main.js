import Vue from 'vue';
import '@/assets/css/global.scss';

//  导入验证码组件
import VueInputCode from 'vue-input-code';
Vue.component('VueInputCode', VueInputCode)

//  获取service
import service from '@/service';
import router from '@/router';
import util from '@/util/index';

import App from './App.vue'

//  初始化svg组件
import './icons';
require('./util/rem');

Vue.prototype.$service = service;
Vue.prototype.$util = util;
Vue.config.productionTip = false

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');