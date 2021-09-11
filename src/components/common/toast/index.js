import Toast from './Toast';
const obj = {
  install(Vue) {
    // 创建组件构造器
    const toastConstructor = Vue.extend(Toast);
    // 根据组件构造器创建出一个组件对象
    const toast = new toastConstructor();
    // 将组件对象挂载到某一个元素上
    toast.$mount(document.createElement('div'));
    // 将元素添加到body上
    document.body.appendChild(toast.$el);
    // 将toast放在原型上，这样所有的vue实例都可以使用
    Vue.prototype.$toast = toast;
  }
}

export default obj;