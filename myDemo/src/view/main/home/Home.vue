<template>
  <div class="home" v-show="homeShow">
    <headerTop title="主页" @click="showSide">
      <template v-slot:header_main>
        <div class="header_select">
          <i class="iconfont icon-didian"></i>
          <span class="select_text">{{
            cityName ? cityName : "请选择城市/地址"
          }}</span>
          <i class="iconfont icon-xiala"></i>
        </div>
      </template>
      <div class="search_box" v-fixed>
        <div class="header_search">
          <p class="btn">
            <i class="iconfont icon-sousuo" style="vertical-align: middle"></i>
            搜索商家
          </p>
        </div>
      </div>
    </headerTop>
    <!-- 轮播图 -->
    <div class="slideshow">
      <van-swipe class="my-swipe" :autoplay="0" :loop="false">
        <van-swipe-item v-for="item in handle" :key="item">
          <div class="foodType">
            <ul class="commodity">
              <li class="commodity-list" v-for="items in item" :key="items">
                <img :src="$formatImgSrc(items.image_hash)" alt="图片" />
                <span>{{ items.name }}</span>
              </li>
            </ul>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 筛选组件 -->
		<vFilter v-fixed:80></vFilter>
    <elist></elist>
  </div>
  <Side ref="Side" @cName="cityMsg" @hShow="homeShow = true"></Side>
</template>
<script>
import headerTop from "@/components/header/header.vue";
import Side from "@/components/side/side.vue";
import homeModule from "./js/homeModule.js";
import elist from "@/components/elist/elist.vue"
import vFilter from "@/components/Filter/Filter.vue"
export default {
  components: {
    Side,
    headerTop,
    elist,
    vFilter
  },
  setup(props, context) {
    const { cityName, showSide, cityMsg, handle, homeShow} = homeModule();
    return {
      cityName,
      showSide,
      cityMsg,
      handle,
      homeShow,
    };
  },
};
</script>
<style lang="scss" scoped='scoped'>
.header_select {
  display: flex;
  box-sizing: border-box;
  height: 0.933333rem;
  color: #fff;
  padding-left: 0.533333rem;
  line-height: 1.6rem;
  .iconfont {
    font-size: 0.533333rem;
  }
  .select_text {
    font-size: 0.426667rem;
    margin: 0 0.133333rem 0 0.133333rem;
  }
}
.search_box {
  z-index: 10;
  width: 100%;
  height: 2.1333rem;
  background-color: #000;
  .header_search {
    z-index: 100;
    margin: 0.5333rem 0 0 0.7467rem;
    width: 85%;
    background-color: #fff;
    .btn {
      text-align: center;
      height: 1.066667rem;
      line-height: 1.066667rem;
    }
  }
}
.header_side {
  position: absolute;
}
// 轮播
.foodType {
  height: 5.8667rem;
  .commodity {
    display: flex;
    flex-wrap: wrap;
    .commodity-list {
      width: 20%;
      margin-top: 0.533333rem;
      color: #666;
      text-align: center;
      img {
        display: block;
        width: 1.333333rem;
        height: 1.333333rem;
        margin: 0.053333rem auto;
      }
    }
  }
}
//下拉吸浮
.slideshow{
  height: 5.8667rem;
}
</style>