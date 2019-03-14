import axios from 'axios'
import qs from 'qs' // qs 用来解决vue中post请求以 a=a&b=b 的格式
import store from '../store'
import router from '@/router'
import { Dialog, Notify } from 'vant'

/**
 * 创建axios实例
 */
const Axios = new axios.create({
  baseURL: process.env.BASE_API,// api url
  timeout: 6000, // 请求超时时间
  withCredentials: false, // 表示跨越请求时是否需要使用凭证
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }, // 默认消息头
  responseType: 'json',
  transformRequest: [function (data, headers) { // `transformRequest` 允许在向服务器发送前，修改请求数据
    const dataType = headers['Content-Type']
    if (dataType && dataType.indexOf('application/x-www-form-urlencoded') > -1) { // json类型数据
      return JSON.stringify(data)
    }
    if (dataType && dataType.indexOf('multipart/form-data') > -1) { // FormData类型
      return data
    }
    return qs.stringify(data)
  }]
})

/**
 * 请求拦截器
 */
Axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = store.state.token // 自定义token
    }
    return config
  }, error => {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
Axios.interceptors.response.use(
  response => {
    return response
  }, error => {
    Dialog.alert({
      title: '网络异常',
      message: '当前网络异常，请稍后再试！'
    }).then(() => { })
    if (error.data) {
      switch (error.data.code) {
        case '401':
          //返回401 清空token信息并跳转到登录页面
          store.commit('SET_TOKEN', '')
          router.push({
            path: '/login'
          })
          break
      }
    }
    return Promise.reject(error)
  }
)

/**
 * 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
 */
// export default {
//   install: (Vue, Option) => {
//     Object.defineProperty(Vue.prototype, '$http', { value: Axios })
//   }
// }
export default Axios