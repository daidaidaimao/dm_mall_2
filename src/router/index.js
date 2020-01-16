import Vue from 'vue'
import Router from 'vue-router'
// import index from 
// import category from 
// import productList from ''
// import productDetail from 
// import register from 
// import login from 
// import refresh from '@/components/utils/refresh'
// import back from 
// import des from 
// import cate from 
// import blank from 
// import skill from '@/components/back/dm_skill'
// import cateManage from '@/components/back/CategoryManage'
// import productManage from '@/components/back/productManage'
// import addproduct from '@/components/back/addproduct'
// import productEdit from '@/components/back/productEdit'
// import test from '@/components/utils/test'
// import echart from '@/components/back/Echarts'
// import person from 
// import registerDetail from 
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/test',
      component:test => import('@/components/utils/test')
    },

    {
      path: '/',
      name: 'index',
      component: index => import('@/components/index'),
      redirect:'/list',
      children: [
        {
          path:'list',
          name:'category',
          components:{
            left:category => import('@/components/Category'),
            right:productList => import('@/components/productList')
            
          }
        },{
          path: 'product/:productId',
          name: 'productDetail',
          component: productDetail => import('@/components/productDetail')
        },
        {
          path:'/login',
          name:'login',
          component:login => import('@/components/user/login')
        },
        {
          path:'/register',
          name:'register',
          component:register => import('@/components/user/register')
        },
        {
          path:'/cate/:productCategory',
          name: 'cate',
          component:cate => import('@/components/productCate')
        },{
          path:'error',
          name: 'product_null',
          component:blank => import('@/components/utils/blank')
        },{
          path:'/detail/:username',
          name: 'person',
          component: person => import('@/components/user/person'),
        },{
          path:'/completeInfo/:username_detail',
          component:registerDetail => import('@/components/user/registerDetail')
        },{
          path:'/showCart/:userId',
          component:shoppingcart => import('@/components/user/shoppingCart')
        }


        // {
        //   path:'product',
        //   name:'productList',
        //   component:productList
        // }
      ]
    },
    // {
    //   path:'/refresh',
    //   name:'refresh',
    //   component: refresh
    // }
    {
      path: '/daimao',
      name: 'back', 
      component: back => import('@/components/back/back'),
      redirect: 'daimao/des',
      children: [
        {
          path: 'des',
          name: 'des',
          component: des => import('@/components/back/dm_des')
        },{
          path: 'skill',
          name: 'skill',
          component:skill => import('@/components/back/dm_skill')
        },{
          path: 'cateManage',
          name: 'cateManage',
          component: cateManage => import('@/components/back/CategoryManage')
        },{
          path: 'productManage',
          name: 'productManage',
          component: productManage => import('@/components/back/productManage'),
        },{
          path: 'productEdit/:productId',
          name: 'productEdit',
          component: productEdit =>import('@/components/back/productEdit')
        },            {
          path:'addproduct',
          name: 'addproduct',
          component : addproduct => import('@/components/back/addproduct')
        },

      ]
    }


  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
