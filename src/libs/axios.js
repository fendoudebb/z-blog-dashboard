import Axios from 'axios'
import { Message } from 'iview'

class httpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    };
    // 存储请求队列
    this.queue = {}
  }
  // 销毁请求实例
  destroy (url) {
    delete this.queue[url];
    const queue = Object.keys(this.queue);
    return queue.length
  }
  // 请求拦截
  interceptors (instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      // Spin.show()
      // 在发送请求之前做些什么
      return config
    }, error => {
      // 对请求错误做些什么
      return Promise.reject(error)
    });

    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      let {data} = res;
      let {status} = res;
      const is = this.destroy(url);
      if (!is) {
        setTimeout(() => {
          // Spin.hide()
        }, 500)
      }
      if (status !== 200) {
        if (status === 401) {
          window.location.href = '/login';
          Message.error('未登录，或登录失效，请登录')
        } else {
          if (data.msg) Message.error(data.msg)
        }
        return Promise.reject(data.msg);
        /*if (!(data instanceof Blob)) {
          console.log("axios: " + JSON.stringify(data))
          if (data.code !== 200) {
            // 后端服务在个别情况下回报201，待确认
            if (data.code === 401) {
              window.location.href = '/login';
              Message.error('未登录，或登录失效，请登录')
            } else {
              if (data.msg) Message.error(data.msg)
            }
            return false
          }
        }*/
      } else {
        if (data.code !== 0) {
          Message.error(data.msg);
          return Promise.reject(data.msg);
        }
      }
      return data
    }, (error) => {
      console.log("error: " + JSON.stringify(error));
      Message.error('服务内部错误');
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }
  // 创建实例
  create () {
    let conf = {
      baseURL: process.env.BASE_URL,
      withCredentials: true,
      // timeout: 2000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // 'X-URL-PATH': location.pathname
      }
    };
    return Axios.create(conf)
  }
  // 合并请求实例
  mergeReqest (instances = []) {
    //
  }
  // 请求实例
  request (options) {
    let instance = this.create();
    this.interceptors(instance, options.url);
    options = Object.assign({}, options);
    this.queue[options.url] = instance;
    return instance(options)
  }
}

const axios = new httpRequest();
export default axios
