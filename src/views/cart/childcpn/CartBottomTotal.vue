<template>
  <div id="cart_total">
    <div style="display: flex">
      <cart-check-button
        ref="checkButtonRef"
        :isChecked="isSelectAll"
        @click.native="checkClick"
      />全选
    </div>
    <div class="calc">总计：￥{{ totalPrice }}</div>
    <div class="buy" @click="buyClick">去购买({{ totalCount }})</div>
  </div>
</template>
<script>
import CartCheckButton from "./CartCheckButton";
export default {
  computed: {
    totalPrice() {
      return this.$store.getters.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count * item.price;
        }, 0)
        .toFixed(2);
    },
    totalCount() {
      return this.$store.getters.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    isSelectAll() {
      if (!this.$store.getters.cartLength) return false;
      return !this.$store.getters.cartList.find((item) => !item.checked);
      // 没选中的button个数
      // return (
      //   this.$store.getters.cartList.filter((item) => !item.checked).length ===
      //   0
      // );
    },
  },
  components: {
    CartCheckButton,
  },
  filters: {},
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.$store.getters.cartList.forEach((item) => (item.checked = false));
      } else {
        this.$store.getters.cartList.forEach((item) => (item.checked = true));
      }
    },
    buyClick() {
      const good = this.$store.getters.cartList.find((item) => item.checked);
      if (!good) {
        this.$toast.show("请选择要购买的商品！");
      }
    },
  },
};
</script>
<style scoped>
#cart_total {
  font-size: 0.7rem;
  height: 1.9rem;
  display: flex;
  background-color: rgb(228, 228, 228);
  line-height: 1.9rem;
  text-align: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 49px;
}
.calc {
  flex: 1;
}
.buy {
  width: 5rem;
  background-color: #f03;
  color: white;
}
</style>