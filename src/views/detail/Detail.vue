<template>
  <div id="detail">
    <detail-nav-bar @navClick="navClick" ref="navbar" />
    <scroll
      class="wrapper"
      ref="scroll"
      :probe-type="3"
      @scrollEvent="scrollEvent"
    >
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shopInfo" />
      <detail-goods-info
        :detailInfo="detailInfo"
        @detailImgLoad="detailImgLoad"
      />
      <detail-param-info :paramInfo="paramInfo" ref="param" />
      <detail-comment-info :comment="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <back-top @click.native="topClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar class="bottomBar" @addEvent="addToCart" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import DetailNavBar from "./childcpn/DetailNavBar";
import DetailSwiper from "./childcpn/DetailSwiper";
import DetailBaseInfo from "./childcpn/DetailBaseInfo";
import DetailShopInfo from "./childcpn/DetailShopInfo";
import DetailGoodsInfo from "./childcpn/DetailGoodsInfo";
import DetailParamInfo from "./childcpn/DetailParamInfo";
import DetailCommentInfo from "./childcpn/DetailCommentInfo";
import DetailBottomBar from "./childcpn/DetailBottomBar";

import BackTop from "@/components/content/backtop/BackTop";
import { Scroll } from "@/components/common/scroll";
import GoodsList from "@/components/content/goods/GoodsList";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "@/network/detail";

import { debounce } from "@/common/utils";

// import mapActions from 'vuex';

// import { BackTopMixin } from "@/common/mixin";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
  },
  // mixins: [BackTopMixin],
  data() {
    //这里存放数据
    return {
      iid: null,
      topImages: [],
      goods: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      navBarTopY: [],
      navDebounce: null,
      currentIndex: 0,
      isShowBackTop: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // ...mapActions(["addCart"]),
    // 添加到购物车
    addToCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      this.$store.dispatch("addCart", product).then((res) => {
        this.$toast.show(res);
      });
    },

    // 回到顶部
    topClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    // navbar点击时触发，滚动到响应的位置
    navClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.navBarTopY[index], 200);
    },
    // 当goodsinfo里的图片加载完成后调用
    detailImgLoad() {
      this.navDebounce();
    },
    // 滚动触发
    scrollEvent(position) {
      position = -position.y;
      const length = this.navBarTopY.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i <= length - 1 &&
            position >= this.navBarTopY[i] &&
            position < this.navBarTopY[i + 1]) ||
            (i === length - 1 && position >= this.navBarTopY[i]))
        ) {
          this.currentIndex = i;
          this.$refs.navbar.currentIndex = this.currentIndex;
          break;
        }
      }
      // 返回顶部的显示
      this.isShowBackTop = position > 1000;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 获取url中的iid
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      const data = res.result;
      // 封装轮播图信息
      this.topImages = data.itemInfo.topImages;
      // 封装商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 封装店铺信息
      this.shopInfo = new Shop(data.shopInfo);
      // 封装商品图片信息
      this.detailInfo = data.detailInfo;
      // 封装商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 封装商品评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // 获取参数、评论、推荐的offsetTop
      // this.$nextTick：当数据更新了，在dom中渲染后，自动执行该函数，
      // 会因为图片还没有加载完成而导致错误。
      // this.$nextTick(() => {
      //   this.navBarTopY = [];
      //   this.navBarTopY.push(0);
      //   this.navBarTopY.push(this.$refs.param.$el.offsetTop);
      //   this.navBarTopY.push(this.$refs.comment.$el.offsetTop);
      //   this.navBarTopY.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.navBarTopY);
      // });

      // 用防抖函数进行封装
      this.navDebounce = debounce(() => {
        this.navBarTopY = [];
        this.navBarTopY.push(0);
        this.navBarTopY.push(this.$refs.param.$el.offsetTop);
        this.navBarTopY.push(this.$refs.comment.$el.offsetTop);
        this.navBarTopY.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.navBarTopY);
      }, 100);
    });

    // 获取推荐的信息
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 此时虽然DOM已经渲染了，但是DOM中的数据还没获取到
    // this.navBarTopY = [];
    // this.navBarTopY.push(0);
    // this.navBarTopY.push(this.$refs.param.$el.offsetTop);
    // this.navBarTopY.push(this.$refs.comment.$el.offsetTop);
    // this.navBarTopY.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.navBarTopY);
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.wrapper {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 0px;
  left: 0;
  right: 0;
}
</style>