import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/index'

Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        // 首页
        {
          path: '/',
          name: 'Index',
          component: Index,
          redirect:'/Home',
          children:[
            // 商品
            {
              path: '/Home',
              name: 'Home',
              component: () => import('@/views/index/Home'),
            },
            // 商家
            {
              path: '/Shops',
              name: '/Shops',
              component: () => import('@/views/index/Shops'),
            },
              // 评论
            {
              path: '/Appraise',
              name: '/Appraise',
              component: () => import('@/views/index/Appraise'),
            },
          ]
        },
        // 商品详情
        {
          path: '/detail',
          name: '/detail',
          component: () => import('@/views/detail'),
        },
    ]
})

export default router;

