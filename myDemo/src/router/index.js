import { createWebHistory, createRouter } from 'vue-router'
const home = () => import('../view/main/home/Home.vue')
const order = () => import('../view/main/order/Order.vue')
const discover = () => import('../view/main/discover/Discover.vue')
const mine = () => import('../view/main/mine/Mine.vue')
const body = () => import('../view/body/Body.vue')
const particulars = () => import('@/components/particulars/particulars.vue')

const menu = () => import('@/components/particulars/particularsView/menu.vue')
const merchant = () => import('@/components/particulars/particularsView/merchant.vue')
const estimate = () => import('@/components/particulars/particularsView/estimate.vue')
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/',
        name: 'Body',
        component: body,
        children: [
            {
                path: 'home',
                name: 'Home',
                component: home,
            },
            {
                path: 'order',
                name: 'Order',
                component: order
            },
            {
                path: 'discover',
                name: 'Discover',
                component: discover
            },
            {
                path: 'mine',
                name: 'Mine',
                component: mine
            }
        ]
    },
    {
        path:'/particulars',
        name:'Particulars',
        component:particulars,
        children:[
            {
                path:'menu',
                name:'Menu',
                component:menu
            },
            {
                path:'merchant',
                name:'Merchant',
                component:merchant
            },
            {
                path:'estimate',
                name:'Estimate',
                component:estimate
            }
        ]
    }
]
export default createRouter({
    history: createWebHistory(),
    routes
})