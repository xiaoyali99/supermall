<template>
  <div class="toast" v-show="isShow">
    <div class="message">{{ message }}</div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  props: {
    // message: {
    //   type: String,
    //   default: "",
    // },
    // show: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      message: "",
      isShow: false,
      timer: null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    show(message, duration = 2000) {
      this.isShow = true;
      this.message = message;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
};
</script>
<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 8px 10px;
  z-index: 999;
}
.message {
  color: white;
}
</style>