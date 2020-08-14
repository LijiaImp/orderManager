//在router文件中，配置项目路由切换
import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../pages/Main.vue'
import Login from '../pages/Login.vue'
// import Us from './homework/Us.vue'
import {
    istoken
} from '@/api/apis'


//在当前Vue项目里使用Vuerouter
Vue.use(VueRouter)

//创建一个路由对象并且暴露此对象
const router = new VueRouter({
    routes: [{
            path: '/', //要监听的hash值
            name: 'default', //当前路由名字，不要重复
            component: Login //此hash切换到哪个页面
        },
        {
            path: '/Main', //要监听的hash值
            name: 'Main', //当前路由名字，不要重复
            component: Main, //此hash切换到哪个页面
            children: [{
                    path: '/Main/Index',
                    name: 'Index',
                    component: () =>
                        import ('../pages/Main/Index.vue'),
                    meta: {
                        breadlist: ["首页"]
                    }
                }, {
                    path: '/Main/Account',
                    name: 'Account',
                    component: () =>
                        import ('../pages/Main/Account.vue'),
                    meta: { breadlist: ["账号管理", "添加用户"] }
                },
                {
                    path: '/Main/AccList',
                    name: 'AccList',
                    component: () =>
                        import ('../pages/Main/AccList.vue'),
                    meta: { breadlist: ["账号管理", "用户列表"] }
                },
                {
                    path: '/Main/AccPwd',
                    name: 'Changepwd',
                    component: () =>
                        import ('../pages/Main/AccPwd.vue'),
                    meta: { breadlist: ["账号管理", "修改密码"] }

                },
                {
                    path: '/Main/GoodAdd',
                    name: 'GoodAdd',
                    component: () =>
                        import ('../pages/Main/GoodAdd.vue'),
                    meta: { breadlist: ["商品管理", "添加商品"] }

                },
                {
                    path: '/Main/GoodPart',
                    name: 'GoodPart',
                    component: () =>
                        import ('../pages/Main/GoodPart.vue'),
                    meta: { breadlist: ["商品管理", "商品分类"] }

                },
                {
                    path: '/Main/GoodList',
                    name: 'GoodList',
                    component: () =>
                        import ('../pages/Main/GoodList.vue'),
                    meta: { breadlist: ["商品管理", "商品列表"] }

                },

                {
                    path: '/Main/OrderManage',
                    name: 'OrderManage',
                    component: () =>
                        import ('../pages/Main/OrderManage.vue'),
                    meta: { breadlist: ["订单管理"] }

                },
                {
                    path: '/Main/Personal',
                    name: 'Personal',
                    component: () =>
                        import ('../pages/Main/Personal.vue'),
                    meta: { breadlist: ["个人中心"] }

                },
                {
                    path: '/Main/Store',
                    name: 'Store',
                    component: () =>
                        import ('../pages/Main/Store.vue'),
                    meta: { breadlist: ["店铺管理"] }

                },
                {
                    path: '/Main/ProductAll',
                    name: 'ProductAll',
                    component: () =>
                        import ('../pages/Main/ProductAll.vue'),
                    meta: { breadlist: ["销售管理", "商品统计"] }

                },
                {
                    path: '/Main/OrderAll',
                    name: 'OrderAll',
                    component: () =>
                        import ('../pages/Main/OrderAll.vue'),
                    meta: { breadlist: ["销售管理", "订单统计"] }

                },


            ]
        },

    ]
})

//切换路由之前
router.beforeEach((to, from, next) => {

    if (to.path != '/') {
        istoken(localStorage.token).then(res => {
            if (res.data.code == 0) {
                next()
            } else next('/')
        })
    } else next()
})
export default router;