 import Vue from "vue";
import VueRouter  from "vue-router";
import Layout from '@/views/Layout';
import Home from '@/views/Home';
import Market from '@/views/Market';
import GreateWorks from '@/views/GreatWorks'
import GreateArtists from '@/views/GreatArtists'
import Artists from '@/views/Artists'
import MyPage from '@/views/MyPage'
import Log from '@/views/Log'
import Register from '@/views/Register'
import SingleCards from '@/views/SingleCards'
import DoubleCards from '@/views/DoubleCards'
import SignIn from '@/views/SignIn'
import Activity from '@/views/Activity'
import Sharing from '@/views/Sharing'
 import Message from  '@/views/Message'
 import AgencyPage from '@/views/AgencyPage'

Vue.use(VueRouter)

const routes=[
    {
        path:'/',
        redirect: '/layout',
    },
    {
        path:'/login',
        component:Log,
        meta:{title:"登录 - Cube 数字立方",keepAlive: true,},
    },
    
    {
        path:'/register',
        component:Register,
        meta:{title:"注册 - Cube 数字立方",keepAlive: true,},
    },
    {
        path:'/sign',
        component:SignIn,
        meta:{title:"签到 - Cube 数字立方",keepAlive: true,},
    },
    {
        path:'/activity',
        component:Activity,
        meta:{
            title:"活动详情 - Cube 数字立方",
            keepAlive: true,    // 需要缓存
        },
    },
    {
        path:'/sharing',
        component:Sharing,
        meta:{title:"分享 - Cube 数字立方",keepAlive: true,},
    },
    {
        path:'/message',
        component:Message,
        meta:{title:"消息 - Cube 数字立方",keepAlive: true,},
    },
    {
        path:'/agency',
        component:AgencyPage,
        meta:{title:"机构详情 - Cube 数字立方",keepAlive: true,},
    },
    {
        path:'/layout',
        redirect: '/layout/home',
        component:Layout,
        children:[
            {
                path:'home',
                redirect: '/layout/home/works',
                component:Home,
                children:[
                    {
                        path:'works',
                        component:GreateWorks,
                        meta:{title:"优秀作品 - Cube 数字立方",keepAlive: true,},

                    },
                    {
                        path:'artists',
                        component:GreateArtists,
                        meta:{title:"优秀创作者 - Cube 数字立方",keepAlive: true,},
                    }
                ],
            },
            {
                path:'market',
                component:Market,
                children:[
                    {
                        path:'single',
                        meta:{title:"市场 - Cube 数字立方",keepAlive: true,},
                        component:SingleCards,
                    },
                    {
                        path:'double',
                        meta:{title:"市场 - Cube 数字立方",keepAlive: true,},
                        component:DoubleCards,
                    }
                ],
            },
           
            {
                path:'artists',
                component:Artists,
                meta:{title:"艺术家 - Cube 数字立方",keepAlive: true,},
               
            },
            {
                path:'my',
                component:MyPage,
                meta: {
                    title:"我的 - Cube 数字立方",
                    requireAuth: true, // 标识该路由是否需要登录
                    keepAlive: true,
                }, 
            },
           
        ]
    }

]

const router =new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    if (to.matched.some((auth) => auth.meta.requireAuth)) {
        let token = localStorage.getItem("token");
        if (token) {
            next();
        } else {
            next({
                path: "/login"
            });
        }
    }
    
    else {
        next();
    }
})


export default router