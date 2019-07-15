// 封装axios
import axios from 'axios'
import JSONBig from 'json-bigint'

// 创建一个axios对象 使用{} 的配置项
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  transformResponse: [(data) => {
    // 处理格式
    // data 可能没有数据 null 严谨判断
    if (data) {
      return JSONBig.parse(data)
    }
    return data
  }]
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
  if (error.responce && error.responce.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

export default instance
