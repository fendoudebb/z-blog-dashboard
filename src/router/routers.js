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
        path: 'post_draft',
        name: 'post_draft',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          icon: 'checkmark-circled',
          title: '草稿管理'
        },
        component: () => import('@/components/post/PostDraft')
      },
      {
        path: 'post_list',
        name: 'post_list',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          icon: 'android-list',
          title: '文章列表'
        },
        component: () => import('@/components/post/PostList')
      }
    ]
  },
  {
    path: '/topic',
    name: 'topic',
    meta: {
      //<Icon type="android-compass"></Icon>
      icon: 'code',
      title: '分类管理'
    },
    component: Main,
    children: [
      {
        path: 'topic_new',
        name: 'topic_new',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          icon: 'android-create',
          title: '新建分类'
        },
        component: () => import('@/components/topic/Topic')
      },
      {
        path: 'topic_list',
        name: 'topic_list',
        meta: {
          //<Icon type="checkmark-circled"></Icon>
          icon: 'android-list',
          title: '分类列表'
        },
        component: () => import('@/components/topic/TopicDetail')
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
