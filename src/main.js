import Vue from 'vue';
import '@/assets/css/global.scss';

//  获取service
import service from '@/service';
import store from '@/store'
import router from '@/router';
import filterInit from '@/util/filter';
import util from '@/util/index';

import App from './App.vue'

//  初始化svg组件
import './icons';

filterInit(Vue);

Vue.prototype.$service = service;
Vue.prototype.$util = util;
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');