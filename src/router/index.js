import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import StockPrice from '../views/StockPrice.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/stock-price',
        name: 'StockPrice',
        component: StockPrice,
        meta: {requiresAuth: true},
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.isAuthenticated) {
            next()
            return
        }
        next('/')
    } else {
        next()
    }
})

export default router
