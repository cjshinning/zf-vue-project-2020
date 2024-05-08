// 将axios 二次封装
import axios from 'axios';
import config from '@/config';
import { getLocal } from './local';

class HttpRequest {
  constructor() {
    // 可以增加实例属性 后台接口的路径 开发模式和生产模式不一样
    this.baseURL = config.baseURL;
    this.timeout = 3000;  //3s后请求超时
  }
  setInterceptors(instance) {
    instance.interceptors.request.use(config => {
      // 一般增加一些token属性等 jwt json web token
      config.headers.authorization = 'Bearer ' + getLocal('token');
      return config;
    })

    instance.interceptors.response.use(res => {
      if (res.status == 200) {
        // 服务器返回的结果都会放到data中
        if (res.data.err === 0) { //统一处理错误状态码
          return Promise.resolve(res.data);
        } else {
          return Promise.reject(res.data.data);
        }
      } else {
        return Promise.reject(res.data.data);
      }
    }, err => {
      // 单独处理其他的状态码异常
      switch (err.response.status) {
        case '401':
          console.log(err);
          break;
        default:
          break;
      }
      return Promise.reject(err);
    })
  }
  mergeOptions(options) {
    return { baseURL: this.baseURL, timeout: this.timeout, ...options };
  }
  request(options) {
    const instance = axios.create();
    this.setInterceptors(instance);
    const opts = this.mergeOptions(options);

    return instance(opts);
  }
  get(url, config) {  //路径参数 ?a=1
    return this.request({
      method: 'get',
      url,
      ...config  // 参数可直接展开
    })
  }
  post(url, data) { //请求体重  {}
    return this.request({
      method: 'post',
      url,
      data  // post要求必须直接传入data
    })
  }
}

export default new HttpRequest;

// 每个实例的拦截器和其他人无关，如果使用全局的实例，我想每次给单独配置拦截器就做不到