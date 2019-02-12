import { login, logout } from '@/api/user'

export default {
  state: {
    username: '',
    roles: []
  },
  mutations: {

  },
  getters: {
    getUserAccess: () => {
      return localStorage.getItem('roles');
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {username, password}) {
      username = username.trim();
      return new Promise((resolve, reject) => {
        login({
          username,
          password
        }).then(res => {
          localStorage.setItem('username', username);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('roles', res.data.roles);
          resolve(res)
        }).catch(err => {
          // reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          localStorage.setItem('username', '');
          localStorage.setItem('roles', '');
          resolve()
        }).catch(err => {
          // reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
  }
}
