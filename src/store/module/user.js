import { login, logout } from '@/api/user'

export default {
  state: {
    username: '',
    access: []
  },
  mutations: {
    setUsername (state, name) {
      state.username = name
    },
    setAccess (state, access) {
      state.access = access;
    },
  },
  getters: {
    getUsername: state => {
      return state.username;
    },
    getAccess: state => {
      return state.access;
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
          commit('setUsername', username);
          commit('setAccess', res.data);
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
          commit('setUsername', '');
          commit('setAccess', []);
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
    // 获取用户相关信息
    getUserAccess ({ state }) {
      return new Promise((resolve, reject) => {
        resolve(state.access);
      })
    }
  }
}
