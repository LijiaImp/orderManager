import Vue from 'vue'
import App from './App.vue'
// import Login from './pages/Login.vue'
import router from './router/router.js'
import ElementUI from 'element-ui'
import reset from './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from "echarts";

//1.创建一个全局bus，跨级传值
Vue.prototype.$bus = new Vue()

Vue.prototype.$echarts = echarts;

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    router,
    css: reset,
    render: h => h(App),
}).$mount('#app')