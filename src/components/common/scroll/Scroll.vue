<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import BScroll from "@better-scroll/core";

export default {
  name: "Scroll",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      scroll: null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 2：不侦测惯性的滚动，3:只要是滚动都侦测
      probeType: this.probeType,
      click: true,
      // 上拉加载
      pullUpLoad: this.pullUpLoad,
      // 开启 observe-dom 插件
      observeDOM: true,
      // 开启 observe-image 插件
      observeImage: true,
    });
    // 监听滚动事件
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scrollEvent", position);
      });
    }
    // 监听上拉加载事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUpEvent");
      });
    }
  },
};
</script>
<style scoped>
</style>