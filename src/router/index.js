import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/components/Index'//@這個路徑有點像是根目錄  泛指src資料夾
import Login from '@/components/pages/Login'//
import Dashboard from '@/components/Dashboard'//
import Products from '@/components/pages/Products'//
import Orders from '@/components/pages/Orders'//
import Coupons from '@/components/pages/Coupons'//
import CustomerOrders from '@/components/pages/CustomerOrders'//
import CustomerCheckout from '@/components/pages/CustomerCheckout'//
import indexPage from '@/components/pages/indexPage'//
import productList from '@/components/pages/productList'//
import CheckOrders from '@/components/pages/CheckOrders'//
import CheckoutOrder from '@/components/pages/CheckoutOrder'//

Vue.use(VueRouter);

export default new VueRouter({
    //mode: 'history',//取消井字號,設定為一般網頁用法
    linkActiveClass: 'active',//將當前目錄設定active
    routes:[
        {
            path:'*',
            redirect:'login'

        },
        {
            name:'Dashboard',//元件呈現名稱
            path:'/admin',//對應的虛擬路徑
            component: Dashboard,//對應的元件
            children:[
                {
                    path:'products',
                    name:'Products',
                    component: Products,
                    meta: { requiresAuth: true },
                },
                {
                    path:'orders',
                    name:'Orders',
                    component: Orders,
                    meta: { requiresAuth: true },
                },
                {
                    path:'coupons',
                    name:'Coupons',
                    component: Coupons,
                    meta: { requiresAuth: true },
                }
            ]
        },
        {
            path:'/test',//對應的虛擬路徑
            name:'Dashboard',//元件呈現名稱
            component: Dashboard,//對應的元件
            children:[
                {
                    path:'customer_orders',
                    name:'CustomerOrders',
                    component: CustomerOrders,
                },
                {
                    path:'customer_checkout/:orderId',
                    name:'CustomerCheckout',
                    component: CustomerCheckout,
                }
            ]
        },
        {
            path:'/',//對應的虛擬路徑
            name:'Index',//元件呈現名稱
            component: Index,//對應的元件
            children:[
                {
                    path:'',//對應的虛擬路徑
                    name:'indexPage',
                    component: indexPage,
                },
                {
                    path:'products/:catalog',//對應的虛擬路徑
                    name:'productList',
                    component: productList,
                },
                {
                    path:'checkorders',//對應的虛擬路徑
                    name:'CheckOrders',
                    component: CheckOrders,
                },
                {
                    path:'checkoutorder/:orderId',//對應的虛擬路徑
                    name:'CheckoutOrder',
                    component: CheckoutOrder,
                }
            ]
        },
        // {
        //     name:'首頁',//元件呈現名稱
        //     path:'/',//對應的虛擬路徑
        //     component: Index,//對應的元件
        //     meta: { requiresAuth: true }
        // },
        {
            name:'Login',
            path:'/login',
            component: Login
        }
    ]
});