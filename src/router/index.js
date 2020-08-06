import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/components/index'//@這個路徑有點像是根目錄  泛指src資料夾
import Login from '@/components/pages/Login'//
import Dashboard from '@/components/Dashboard'//
import Products from '@/components/Products'//

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
                }
            ]
        },
        {
            name:'首頁',//元件呈現名稱
            path:'/',//對應的虛擬路徑
            component: Index,//對應的元件
            meta: { requiresAuth: true }
        },
        {
            name:'Login',
            path:'/login',
            component: Login
        }
    ]
});