// 可以将不同组件的同一个生命周期内的 相同代码抽离

import BackTop from "@/components/content/backtop/BackTop";
export const mixin = {
  mounted() {
    console.log('我是混入的内容!');
  },
}
export const BackTopMixin = {
  data() {
    return {
      BackTop,
    }
  },
  components: {
    BackTop,
  },
  methods: {
    // 回到顶部
    topClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
  },
}