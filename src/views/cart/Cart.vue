<template>
  <div id="Cart">
    <nav-bar class="cart-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <cart-list />
    <cart-bottom-total />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import NavBar from "@/components/common/navbar/NavBar";

import CartList from "./childcpn/CartList";
import CartBottomTotal from "./childcpn/CartBottomTotal";

import { mapGetters } from "vuex";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    NavBar,
    CartList,
    CartBottomTotal,
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    // 写法一：
    ...mapGetters(["cartLength"]),
    // 写法二：
    // ...mapGetters({
    //   length:"cartLength"
    // })
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
#cart {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}
.cart-bar {
  font-weight: 700;
  background-color: var(--color-tint);
  color: white;
}
</style>