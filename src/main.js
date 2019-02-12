// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import store from './store'
import '@/assets/css/animate.css'

// import global from './common/global/global.vue'
import { AlertPlugin, ToastPlugin, LoadingPlugin, ConfirmPlugin } from 'vux' //引入插件


//增加Vue原型链,Vue的实例也能调用
Vue.prototype.$axios = axios
Vue.prototype.bus = new Vue()
    // Vue.prototype.url = '/api' //本地调试时
Vue.prototype.url = 'http://222.88.22.68:8081/dukang' //上线时
    // Vue.prototype.url = 'http://100.100.1.46:9999/dukang' //46测试

Vue.use(AlertPlugin) //使用alert插件
Vue.use(ToastPlugin) //使用toast插件
Vue.use(LoadingPlugin) //使用loading插件
Vue.use(ConfirmPlugin) //使用confirm插件

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})