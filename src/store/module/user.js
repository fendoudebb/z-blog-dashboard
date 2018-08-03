import { login, logout } from '@/api/user'

export default {
  state: {
    userName: '',
    access: []
  },
  mutations: {
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access;
    },
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {userName, password}) {
      userName = userName.trim();
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          const data = res.data;
          console.log("登录: " + JSON.stringify(data));
          commit('setUserName', userName);
          commit('setAccess', res.data.access);
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('setUserName', '');
          commit('setAccess', []);
          resolve()
        }).catch(err => {
          reject(err)
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
