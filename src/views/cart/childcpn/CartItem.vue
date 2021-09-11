<template>
  <div class="cart_list_item">
    <cart-check-button
      @click.native="checkClick"
      :isChecked="item.checked"
      ref="checkButtonRef"
    />
    <div class="item_img" @click="checkClick">
      <img :src="item.image" alt="" />
    </div>
    <div class="item_info" @click="infoClick(item)">
      <p class="item_title">{{ item.title }}</p>
      <p class="item_desc">{{ item.desc }}</p>
      <span class="item_price">￥{{ item.price }}</span>
      <span class="item_count">x{{ item.count }}</span>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import CartCheckButton from "./CartCheckButton";
export default {
  //import引入的组件需要注入到对象中才能使用
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    CartCheckButton,
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    checkClick() {
      this.item.checked = !this.item.checked;
    },
    //信息点击事件
    infoClick(item) {
      this.$router.push("/detail/" + item.iid);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style scoped>
.cart_list_item {
  width: 100%;
  height: 5.5rem;
  border-bottom: 0.04rem solid rgba(128, 128, 128, 0.4);
  display: flex;
  padding: 0.4rem;
  padding-left: 0rem;
}
.item_img {
  width: 3.5rem;
  height: 100%;
}
.item_img img {
  width: 100%;
  height: 100%;
  border-radius: 0.4rem;
}
.item_info {
  position: relative;
  width: calc(100% - 3.5rem - 1.2rem - 0.4rem);
  margin-left: 0.4rem;
}
.item_info p {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.item_title {
  font-size: 0.75rem;
  padding-bottom: 0.5rem;
}
.item_desc {
  font-size: 0.6rem;
  color: gray;
}
.item_price {
  position: absolute;
  left: 0;
  bottom: 0.4rem;
  font-size: 0.75rem;
  color: orangered;
}
.item_count {
  position: absolute;
  right: 0.4rem;
  bottom: 0.4rem;
  font-size: 0.75rem;
}
</style>