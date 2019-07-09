import Vue from 'vue';
import '@/assets/css/global.scss';

//  导入验证码组件
import VueInputCode from 'vue-input-code';
Vue.component('VueInputCode', VueInputCode)

//  导入倒计时组件
import geCode from 'vue-gecode';
Vue.component('geCode', geCode);

//  获取service
import service from '@/service';
import store from '@/store'
import router from '@/router';
import filterInit from '@/util/filter';
import util from '@/util/index';

import App from './App.vue'

//  初始化svg组件
import './icons';
require('./util/rem');

filterInit(Vue);

Vue.prototype.$service = service;
Vue.prototype.$util = util;
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');