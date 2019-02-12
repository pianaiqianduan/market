import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'
import state from '../store/state';
//引入路由组件


Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            name: 'enter',
            meta: {
                login_require: true,

            },
            component: (resolve) => {
                require(['@/pages/enter/enter'], resolve); //订单录入页面
            }
        },
        {
            path: '/login',
            name: 'login',
            component: (resolve) => {
                require(['@/pages/login/login'], resolve);
            }
        },
        {
            path: '/searc',
            name: 'searc',
            meta: {
                login_require: true,
            },
            component: (resolve) => {
                require(['@/pages/searc/searc'], resolve);
            }
        },
        {
            path: '/listval',
            name: 'listval',
            meta: {
                login_require: true,
            },
            component: (resolve) => {
                require(['@/pages/listval/listval'], resolve);
            }
        },
        {
            path: '/mine',
            name: 'mine',
            meta: {
                login_require: true,
            },
            component: (resolve) => {
                require(['@/pages/mine/mine'], resolve);
            }
        },
        {
            path: '/profile',
            name: 'profile',
            meta: {
                login_require: true,
            },
            component: (resolve) => {
                require(['@/pages/profile/profile'], resolve);
            }
        },
        {
            path: '/addres',
            name: 'addres',
            meta: {
                login_require: true,
            },
            component: (resolve) => {
                require(['@/pages/profile/children/addres'], resolve);
            },

        },
        {
            path: '/orderFrom',
            name: 'orderFrom',
            meta: {
                login_require: true,
            },
            component: (resolve) => {
                require(['@/pages/enter/children/orderFrom'], resolve);
            }
        },
        {
            path: '/orderDetail',
            name: 'orderDetail',
            meta: {
                login_require: true,
            },
            component: (resolve) => {
                require(['@/pages/searc/children/orderDetail'], resolve);
            }
        },
        {
            path: '/successMsg',
            name: 'successMsg',
            meta: {
                login_require: true,
            },
            component: (resolve) => {
                require(['@/pages/enter/children/successMsg'], resolve);
            }
        },
        {
            path: '/changeOrder',
            name: 'changeOrder',
            meta: {
                login_require: true,
            },
            component: (resolve) => {
                require(['@/pages/searc/children/changeOrder'], resolve);
            }
        },
        {
            path: '/addrChange',
            name: 'addrChange',
            meta: {
                login_require: true,
            },
            component: (resolve) => {
                require(['@/pages/profile/children/addrChange'], resolve);
            }
        }

    ]
})

// 判断用户是否登录
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.login_require)) {
        if (!sessionStorage.logined && to.path != '/login') {
            next('/login')
        } else {
            next()
        }
    } else {

        next()
    }
})

// 监听路由的变化,改变header组件的内容
router.afterEach(function(to) {
    if (to.path == '/') {
        store.commit('changeHeader', '订单录入')
        store.commit('changeHeaderRight', true)
        store.commit('headerLeftShow', false)
    } else if (to.path == '/searc') {
        store.commit('changeHeader', '订单查询')
        store.commit('changeHeaderRight', false)
        store.commit('headerLeftShow', false)
    } else if (to.path == '/mine') {
        store.commit('changeHeader', '我的')
        store.commit('changeHeaderRight', false)
        store.commit('headerLeftShow', false)
    } else if (to.path == '/listval') {
        store.commit('changeHeader', '订单查询结果')
        store.commit('changeHeaderRight', false)
        store.commit('headerLeftShow', true)
    } else if (to.path == '/profile') {
        store.commit('changeHeader', '地址选择')
        store.commit('changeHeaderRight', false)
        store.commit('headerLeftShow', true)
    } else if (to.path == '/addres') {
        store.commit('changeHeader', '新增地址')
        store.commit('changeHeaderRight', false)
        store.commit('headerLeftShow', true)
    } else if (to.path == '/orderFrom') {
        store.commit('changeHeader', '订单提交')
        store.commit('changeHeaderRight', false)
        store.commit('headerLeftShow', true)
    } else if (to.path == '/changeOrder') {
        store.commit('changeHeader', '订单修改')
        store.commit('changeHeaderRight', false)
        store.commit('headerLeftShow', true)
    } else if (to.path == '/orderDetail') {
        store.commit('changeHeader', '订单详情')
        store.commit('changeHeaderRight', false)
        store.commit('headerLeftShow', true)
    } else if (to.path == '/successMsg') {
        store.commit('headerLeftShow', false)
    }
})


export default router;