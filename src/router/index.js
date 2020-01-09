import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import category from '@/components/Category'
import productList from '@/components/productList'
import productDetail from '@/components/productDetail'
import register from '@/components/user/register'
import login from '@/components/user/login'
// import refresh from '@/components/utils/refresh'
import back from '@/components/back/back'
import des from '@/components/back/dm_des'
import cate from '@/components/productCate'
import blank from '@/components/utils/blank'
import skill from '@/components/back/dm_skill'
import cateManage from '@/components/back/CategoryManage'
import productManage from '@/components/back/productManage'
import addproduct from '@/components/back/addproduct'
import productEdit from '@/components/back/productEdit'
import test from '@/components/utils/test'
import echart from '@/components/back/Echarts'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/test',
      component:test
    },

    {
      path: '/',
      name: 'index',
      component: index,
      redirect:'/list',
      children: [
        {
          path:'list',
          name:'category',
          components:{
            left:category,
            right:productList
            
          }
        },{
          path: 'product/:productId',
          name: 'productDetail',
          component: productDetail
        },
        {
          path:'/login',
          name:'login',
          component:login
        },
        {
          path:'/register',
          name:'register',
          component:register
        },
        {
          path:'/cate/:productCategory',
          name: 'cate',
          component:cate
        },{
          path:'error',
          name: 'product_null',
          component:blank
        },


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
      component: back,
      redirect: 'daimao/des',
      children: [
        {
          path: 'des',
          name: 'des',
          component: des
        },{
          path: 'skill',
          name: 'skill',
          component:skill
        },{
          path: 'cateManage',
          name: 'cateManage',
          component: cateManage
        },{
          path: 'productManage',
          name: 'productManage',
          component: productManage,
        },{
          path: 'productEdit/:productId',
          name: 'productEdit',
          component: productEdit
        },            {
          path:'addproduct',
          name: 'addproduct',
          component : addproduct
        },{
          path: 'echart',
          name: 'echart',
          component: echart
        }

        
      ]
    }


  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
