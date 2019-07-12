import axios from 'axios'

// 创建一个axios对象 使用{} 的配置项
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // config请求配置对象
  // 修改config
  const user = window.sessionStorage.getItem('hm0712')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.request.use(responce => {
  return responce
}, (error) => {
  if (error.responce.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

export default instance
