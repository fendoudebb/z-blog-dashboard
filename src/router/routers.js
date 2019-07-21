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
    path: '/publish',
    name: '编辑',
    meta:{
      title: '',
    },
    component: Main,
    children: [
      {
        path: '/publish',
        name: 'publish',
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
    path: '/post',
    name: '文章',
    meta: {
      title: ''
    },
    component: Main,
    children: [
      {
        path: '/post',
        name: 'post',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          icon: 'ios-book',
          title: '文章管理'
        },
        component: () => import('@/components/post/PostList')
      }
    ]
  },

  {
    path: '/rank',
    name: 'rank',
    meta: {
      icon: 'podium',
      title: '排行榜'
    },
    component: Main,
    children: [
      {
        path: 'pv',
        name: 'pv',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          // icon: 'podium',
          title: '访问数'
        },
        component: () => import('@/components/rank/PostPvList')
      },
      {
        path: 'likes',
        name: 'likes',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          // icon: 'podium',
          title: '点赞数'
        },
        component: () => import('@/components/rank/PostLikesList')
      },
      {
        path: 'comments',
        name: 'comments',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          // icon: 'podium',
          title: '评论数'
        },
        component: () => import('@/components/rank/PostCommentsList')
      },
    ]
  },

  {
    path: '/topic',
    name: '标签',
    meta:{
      title: '',
    },
    component: Main,
    children: [
      {
        path: '/topic',
        name: 'topic',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          icon: 'android-bookmark',
          title: '标签管理'
        },
        component: () => import('@/components/topic/TopicList')
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
          icon: 'chatbubble-working',
          title: '留言板',
        },
        component: () => import('@/components/message-board/MessageBoard')
      },
    ]
  },

  {
    path: '/links',
    name: '友链',
    meta: {
      title: ''
    },
    component: Main,
    children: [
      {
        path: '/links',
        name: 'links',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          icon: 'link',
          title: '友链管理'
        },
        component: () => import('@/components/links/LinksList')
      }
    ]
  },

  {
    path: '/ip',
    name: 'IP',
    meta: {
      //<Icon type="android-compass"></Icon>
      icon: 'ios-world-outline',
      title: 'IP管理'
    },
    component: Main,
    children: [
      {
        path: 'ip_pool',
        name: 'ip_pool',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          // icon: 'document',
          title: 'IP列表'
        },
        component: () => import('@/components/ip/IpPool')
      },
      {
        path: 'ip_unrecognized',
        name: 'ip_unrecognized',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          // icon: 'document',
          title: '未识别IP列表'
        },
        component: () => import('@/components/ip/IpUnrecognized')
      },

    ]
  },
  {
    path: '/statistics',
    name: 'statistics',
    meta: {
      //<Icon type="android-compass"></Icon>
      icon: 'stats-bars',
      title: '统计信息'
    },
    component: Main,
    children: [
      {
        path: 'page_view',
        name: 'page_view',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          // icon: 'document',
          title: '访问统计'
        },
        component: () => import('@/components/statistics/PageView')
      },
      {
        path: 'search_stats',
        name: 'search_stats',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          // icon: 'document',
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
