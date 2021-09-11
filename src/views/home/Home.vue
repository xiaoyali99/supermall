<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="tabControlFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scrollEvent="scrollEvent"
      @pullingUpEvent="pullingUpEvent"
    >
      <main-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></main-swiper>
      <main-recommend :recommends="recommends"></main-recommend>
      <feature-view></feature-view>
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="topClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import NavBar from "@/components/common/navbar/NavBar";
import { Scroll } from "@/components/common/scroll";
import BackTop from "@/components/content/backtop/BackTop";
import TabControl from "@/components/content/tabcontrol/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";

import MainSwiper from "./childcpn/MainSwiper";
import MainRecommend from "./childcpn/MainRecommend";
import FeatureView from "./childcpn/FeatureView";

import Home from "@/network/home";

import { mixin } from "@/common/mixin";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    NavBar,
    MainSwiper,
    MainRecommend,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  mixins: [mixin],
  data() {
    //这里存放数据
    return {
      currentType: "pop",
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      isShowBackTop: false,
      tabControlFixed: false,
      tabControlOffsetTop: 0,
      saveY: 0,
    };
  },
  //监听属性 类似于data概念
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    swiperImageLoad() {
      // 取到tabControl组件的元素
      this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    // 上拉加载更多
    pullingUpEvent() {
      this.getHomeData(this.currentType);

      // 完成上拉加载
      this.$refs.scroll.finishPullUp();
    },
    // 滚动监听
    scrollEvent(position) {
      // 返回顶部的显示
      this.isShowBackTop = -position.y > 1000;
      // tabControl的吸顶
      this.tabControlFixed = -position.y > this.tabControlOffsetTop;
    },
    // 回到顶部
    topClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    // tab-control的切换
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    // 下面是网络请求相关的
    getMultiData() {
      Home.getMultiData().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeData(type) {
      const page = this.goods[type].page + 1;
      Home.getHomeData(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 获取轮播图和推荐图的数据
    this.getMultiData();

    // 获取首页的商品数据
    this.getHomeData("pop");
    this.getHomeData("new");
    this.getHomeData("sell");
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 1);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
};
</script>
<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
  background-color: white;
}
</style>