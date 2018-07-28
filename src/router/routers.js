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
    name: 'index',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/components/home/Home')
      }
    ]
  },

  /* {
     path: '/send',
     name: 'send',
     meta: {
       icon: 'ios-navigate',
       title: '发送管理'
     },
     component: Main,
     children: [
       {
         path: 'new_task',
         name: 'new_task',
         meta: {
           icon: 'ios-navigate',
           title: '新建任务'
         },
         component: () => import('@/components/task/Task.vue')
       },
       {
         path: 'send_record',
         name: 'send_record',
         meta: {
           icon: 'ios-navigate',
           title: '发送记录'
         },
         component: () => import('@/components/task/Record.vue')
       }
     ]
   },*/
  {
    path: '/publish_index',
    name: 'publish_index',
    meta:{
      title: '',
    },
    component: Main,
    children: [
      {
        path: '/publish',
        name: 'publish',
        meta:{
          icon: 'ios-compose-outline',
          title: 'abcd',
        },
        component: () => import('@/components/publish/Publish')
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
