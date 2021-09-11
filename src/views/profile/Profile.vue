<template>
  <scroll class="content">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
    <li>10</li>
    <li>11</li>
    <li>12</li>
    <li>13</li>
    <li>14</li>
    <li>15</li>
    <li>16</li>
    <li>17</li>
    <li>18</li>
    <li>19</li>
    <li>20</li>
    <li>21</li>
    <li>22</li>
    <li>23</li>
    <li>24</li>
    <li>25</li>
    <li>26</li>
    <li>27</li>
    <li>28</li>
    <li>29</li>
    <li>30</li>
    <li>31</li>
    <li>32</li>
    <li>33</li>
    <li>34</li>
    <li>35</li>
    <li>36</li>
    <li>37</li>
    <li>38</li>
    <li>39</li>
    <li>40</li>
    <li>41</li>
    <li>42</li>
    <li>43</li>
    <li>44</li>
    <li>45</li>
    <li>46</li>
    <li>47</li>
    <li>48</li>
    <li>49</li>
    <li>50</li>
    <li>51</li>
    <li>52</li>
    <li>53</li>
    <li>54</li>
    <li>55</li>
    <li>56</li>
    <li>57</li>
    <li>58</li>
    <li>59</li>
    <li>60</li>
    <li>61</li>
    <li>62</li>
    <li>63</li>
    <li>64</li>
    <li>65</li>
    <li>66</li>
    <li>67</li>
    <li>68</li>
    <li>69</li>
    <li>70</li>
    <li>71</li>
    <li>72</li>
    <li>73</li>
    <li>74</li>
    <li>75</li>
    <li>76</li>
    <li>77</li>
    <li>78</li>
    <li>79</li>
    <li>80</li>
    <li>81</li>
    <li>82</li>
    <li>83</li>
    <li>84</li>
    <li>85</li>
    <li>86</li>
    <li>87</li>
    <li>88</li>
    <li>89</li>
    <li>90</li>
    <li>91</li>
    <li>92</li>
    <li>93</li>
    <li>94</li>
    <li>95</li>
    <li>96</li>
    <li>97</li>
    <li>98</li>
    <li>99</li>
    <li>100</li>
  </scroll>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { Scroll } from "@/components/common/scroll";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { Scroll },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
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
.content {
  height: 300px;
  background-color: red;
}
</style>