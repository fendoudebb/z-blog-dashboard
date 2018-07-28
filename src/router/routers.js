import Main from '@/components/main/Main'
import HelloWorld from '@/components/HelloWorld'

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/components/login/Login')
  },
  {
    path: '/hello',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/',
    name: 'home',
    redirect: '/',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/',
        name: '首页',
        meta: {
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/components/home/Home')
      }
    ]
  },

  {
    path: '/publish_index',
    name: '编辑',
    meta:{
      title: '',
    },
    component: Main,
    children: [
      {
        path: '/publish',
        name: 'publish_index',
        meta:{
          //<Icon type="paintbrush"></Icon>
          icon: 'android-create',
          title: '文章编辑',
        },
        component: () => import('@/components/publish/Publish')
      },
    ]
  },

  {
    path: '/article',
    name: 'article',
    meta: {
      //<Icon type="android-compass"></Icon>
      icon: 'navigate',
      title: '文章管理'
    },
    component: Main,
    children: [
      {
        path: 'article_draft',
        name: 'article_draft',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          icon: 'checkmark-circled',
          title: '草稿管理'
        },
        component: () => import('@/components/article/ArticleDraft')
      },
      {
        path: 'article_list',
        name: 'article_list',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          icon: 'android-list',
          title: '文章列表'
        },
        component: () => import('@/components/article/ArticleList')
      }
    ]
  },
  {
    path: '/category',
    name: 'category',
    meta: {
      //<Icon type="android-compass"></Icon>
      icon: 'code',
      title: '分类管理'
    },
    component: Main,
    children: [
      {
        path: 'category_new',
        name: 'category_new',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          icon: 'android-create',
          title: '新建分类'
        },
        component: () => import('@/components/category/Category')
      },
      {
        path: 'category_list',
        name: 'category_list',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          icon: 'android-list',
          title: '分类列表'
        },
        component: () => import('@/components/category/CategoryDetail')
      }
    ]
  },

  {
    path: '/401',
    name: 'error_401',
    component: () => import('@/components/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    component: () => import('@/components/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    component: () => import('@/components/error-page/404.vue')
  }
]
