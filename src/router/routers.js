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
    path: '/message-board',
    name: '留言板',
    meta:{
      title: '',
    },
    component: Main,
    children: [
      {
        path: '/message-board',
        name: 'message-board',
        meta:{
          //<Icon type="paintbrush"></Icon>
          icon: 'android-list',
          title: '留言板',
        },
        component: () => import('@/components/message-board/MessageBoard')
      },
    ]
  },

  {
    path: '/post',
    name: 'post',
    meta: {
      //<Icon type="android-compass"></Icon>
      icon: 'navigate',
      title: '文章管理'
    },
    component: Main,
    children: [
      {
        path: 'post_list',
        name: 'post_list',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          icon: 'android-list',
          title: '文章列表'
        },
        component: () => import('@/components/post/PostList')
      },
      {
        path: 'topic',
        name: 'topic',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          icon: 'android-list',
          title: '标签列表'
        },
        component: () => import('@/components/topic/TopicList')
      },

    ]
  },
  {
    path: '/ip',
    name: 'ip',
    meta: {
      //<Icon type="android-compass"></Icon>
      icon: 'location',
      title: 'IP管理'
    },
    component: Main,
    children: [
      {
        path: 'ip_pool',
        name: 'ip_pool',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          icon: 'android-list',
          title: 'IP列表'
        },
        component: () => import('@/components/statistics/IpPool')
      },
      {
        path: 'ip_unrecognized',
        name: 'ip_unrecognized',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          icon: 'android-list',
          title: '未识别IP列表'
        },
        component: () => import('@/components/statistics/IpUnrecognized')
      },

    ]
  },
  {
    path: '/statistics',
    name: 'statistics',
    meta: {
      //<Icon type="android-compass"></Icon>
      icon: 'code',
      title: '访问统计'
    },
    component: Main,
    children: [
      {
        path: 'page_view',
        name: 'page_view',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          icon: 'android-list',
          title: '页面访问'
        },
        component: () => import('@/components/statistics/PageView')
      },
      {
        path: 'search_stats',
        name: 'search_stats',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          icon: 'android-list',
          title: '搜索统计'
        },
        component: () => import('@/components/statistics/SearchStats')
      },
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
