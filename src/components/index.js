// 注册所有组件在vue下
// 封装成插件的形式 Vue.use(插件) 执行插件的配置对象中的install函数
// 且传入Vue对象
import MyBread from '@/components/my-bread.vue'
import MyChannel from '@/components/my-channel.vue'
export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
