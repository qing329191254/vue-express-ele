<template>
<div>
      <!-- 收货地址 -->
  <div class="side_main" v-show="show.main">
    <vHead title="选择收货地址" @change="selectLocation">
      <span class="add">新增地址</span>
    </vHead>
    <div class="select_city" @click="show.city=true">
      <span class="select_name">{{ currentCity ? currentCity : "请选择城市" }}</span>
      <i class="iconfont icon-xiala"></i>
      <p>
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="请输入地址" />
      </p>
    </div>
    <div class="current_city">
      <span>当前城市</span>
      <li class="add_list">{{ currentCity ? currentCity : "无" }}</li>
    </div>
  </div>

  <!-- 城市选择 -->
  <div class="side_city_" v-show="show.city">
    <!-- 城市搜索框 -->
    <div class="side_city">
      <vHead title="城市选择" @change="show.city=false"></vHead>
      <div class="btn">
        <i class="iconfont icon-sousuo" style="vertical-align: middle"></i>
        <input type="text" placeholder="请输入城市名或名称" v-model="search" />
      </div>
    </div>
    <!-- 城市搜索列表 -->
    <div class="search_box bottom" v-show="search">
      <ul>
        <li
          class="add_list"
          v-for="items in citySearch" :key="items"
          @click="selectCity(items.name)"
        >
          {{ items.name }}
        </li>
      </ul>
    </div>
    <!-- 城市列表 -->
    <div class="citylist" v-show="!search">
      <!-- 当前城市 -->
      <div class="current_city">
        <span>当前城市</span>
        <li class="add_list">{{ currentCity ? currentCity : "无" }}</li>
      </div>
      <van-index-bar>
        <ul v-for="(items, key) of cityName" :key="items">
          <van-index-anchor :index="key" />
          <li
            v-for="item in items" :key="item"
            class="add_list"
            @click="selectCity(item.name)"
          >
            {{ item.name }}
          </li>
        </ul>
      </van-index-bar>
    </div>
  </div>
</div>
</template>
<script>
import vHead from "../header/header.vue";
import cityData from "./js/cityModule";
export default {
  components: {
    vHead,
  },
  setup(props) {
    const { cityName, search, citySearch, selectCity, currentCity ,selectLocation,show} = cityData();
    return {
      selectCity,
      cityName,
      search,
      citySearch,
      currentCity,
      selectLocation,
      show,
    };
  },
};
</script>
<style lang="scss" socped="scoped">
.side_city_ {
  position: absolute;
  width: 100%;
  z-index: 999;
  top: 2.6667rem;
  height: 100%;
  background-color: #fff;
}
.side_main{
  z-index: 6;
  height: 100%;
  background-color: #fff;
}
.side_city{
  z-index: 9;
}
.side_main,
.side_city {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  .add {
    position: absolute;
    right: 0.4rem;
    top: 0;
    line-height: 1.6rem;
    color: #fff;
    font-weight: 500;
  }
}
.side_city {
  height: 2.666667rem;
  background-color: #000;
  .btn {
    position: absolute;
    top: 1.6rem;
    right: 0;
    left: 0;
    margin: auto;
    border-radius: 2.666667rem;
    height: 0.8rem;
    width: 80%;
    background-color: #fff;
    line-height: 0.8rem;
    .iconfont {
      font-size: 0.533333rem;
      font-weight: 900;
      margin-left: 0.4rem;
      margin-right: 0.16rem;
    }
    input {
      border: none;
      padding: 0;
    }
  }
}

.bottom{
  padding-bottom: 1.6rem;
}
.search_box {
  /* 自适应填满剩余空间 */
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
  .add_list {
    height: 0.4rem; //15
    background-color: #fff;
    padding: 0.4rem; //15
    color: #000;
    font-size: 0.373333rem; //14
    border-bottom: 1px solid rgba(166, 166, 166, 0.1);
  }
}


.side_main {
  // 选择城市
  .select_city {
    display: flex;
    align-items: center;
    font-size: 0.32rem;
    background-color: #fff;
    padding: .2667rem;
    .select_name {
      width: 1.0667rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    p {
      display: flex;
      align-items: center;
      margin-left: 0.22rem;
      background-color: #f4f4f4;
      padding: .32rem;
      input {
        border: none;
        color: #666;
        width: 6.6666rem;
        background-color: #f4f4f4;
      }
    }
  }
  //收货地址
  .current_city {
    background-color: #f4f4f4;
    //当前城市
    .add_list {
      height: 0.4rem; //15
      background-color: #fff;
      padding: 0.4rem; //15
      color: #000;
      font-size: 0.373333rem; //14
      border-bottom: 1px solid rgba(166, 166, 166, 0.1);
    }
    span {
      line-height: 0.9333rem;
      padding: 0.4rem;
      color: #999;
    }
  }
}
.add_list {
  height: 0.4rem; //15
  background-color: #fff;
  padding: 0.4rem; //15
  color: #000;
  font-size: 0.373333rem; //14
  border-bottom: 1px solid rgba(166, 166, 166, 0.1);
}
.citylist {
  //城市列表
  overflow: hidden;
  padding-bottom: 1.6rem;
  .current_city {
    background-color: #f4f4f4;
    //当前城市
    span {
      line-height: 0.9333rem;
      padding: 0.4rem;
      color: #999;
    }
  }
  .van-index-anchor {
    padding: 0;
    background-color: #f4f4f4;
  }
}
.van-index-anchor--sticky{
  position: static;
}
</style>