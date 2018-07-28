import { login, logout, getUserInfo } from '@/api/user'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: '',
    access: ''
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id;
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access;
    },
    setToken (state, token) {
      state.token = token;
    }
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
          commit('setUserId', data.data);
          sessionStorage.setItem("login", data.data);
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.userId).then(() => {
          commit('setToken', '');
          commit('setAccess', []);
          sessionStorage.setItem("login", "");
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
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        state.userId = sessionStorage.getItem("login");
        getUserInfo(state.userId).then(res => {
          const data = res.data;
          console.log("get user info: " + JSON.stringify(res.data));
          commit('setUserName', data.data.userName);
          commit('setAccess', data.data.access);
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
