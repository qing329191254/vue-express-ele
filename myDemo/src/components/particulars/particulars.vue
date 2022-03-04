<template>
  <div class="particular" v-if="rst">
    <!-- 头部 -->
    <div
      class="particular_header"
      :style="{
        backgroundImage: `url(${$formatImgSrc(rst.shop_sign.image_hash)})`,
      }"
    >
    <router-link to="/home">
      <button class="go_back">&lt;</button>
    </router-link>
      <div class="particular_img">
        <img :src="$formatImgSrc(rst.image_path)" alt="图片" />
      </div>
    </div>
    <!-- 描述部分 -->
    <div class="description">
      <h2 class="description_title" @click="desc = true">{{ rst.name }}</h2>
      <van-popup
        v-model:show="desc"
        :close-on-click-overlay="false"
        :round="true"
        closeable
        :style="{ width: '95%', height: '50%' }"
      >
        <h2 class="description_title" @click="desc = true">{{ rst.name }}</h2>
        <div class="description_evaluate">
          <span>评价{{ rst.rating }}分</span>
          <span>月售{{ rst.recent_order_num }}单</span>
          <span>配送约{{ rst.order_lead_time }}分钟</span>
        </div>
        <van-notice-bar
          left-icon="volume-o"
          color="#000"
          scrollable
          :text="rst.promotion_info"
        />
      </van-popup>

      <div class="description_evaluate">
        <span>评价{{ rst.rating }}分</span>
        <span>月售{{ rst.recent_order_num }}单</span>
        <span>配送约{{ rst.order_lead_time }}分钟</span>
      </div>
      <!-- 优惠券 -->
      <div class="coupon_box" @click="coupon = true">
        <div v-for="item in redpack" :key="item" class="coupon_items">
          <span class="coupon_num">￥{{ item.value }}</span>
          <span class="coupon_title">{{ item.title }}</span>
          <span>领取</span>
        </div>
      </div>
      <!-- 店铺专属红包弹出层 -->
      <van-popup
        v-model:show="coupon"
        :close-on-click-overlay="false"
        :round="true"
        closeable
        position="bottom"
        :style="{ width: '100%', height: '45%' }"
      >
        <p class="ticket_title">店铺专属红包</p>
        <p v-for="item in redpack" :key="item">{{ item.description }}</p>
      </van-popup>
      <!-- 所有优惠 -->
      <div class="discounts">
        <div class="discounts_show" @click="activities = true">
          <span
            class="discounts_icon"
            :style="{ 'background-color': '#' + rst.activities[0].icon_color }"
            >{{ rst.activities[0].icon_name }}</span
          >
          <p class="discounts_title">{{ rst.activities[0].description }}</p>
          <p>
            共{{ rst.activities.length }}个优惠<i
              class="iconfont icon-xiala"
            ></i>
          </p>
        </div>
      </div>
      <!-- 所有优惠弹出层 -->
      <van-popup
        v-model:show="activities"
        :close-on-click-overlay="false"
        :round="true"
        closeable
        position="bottom"
        :style="{ width: '100%', height: '55%' }"
      >
        <p class="ticket_title">所有优惠</p>
        <ul class="ticket_all">
          <li v-for="items in rst.activities" :key="items">
            <i :style="{ 'background-color': '#' + items.icon_color }">{{
              items.icon_name
            }}</i>
            {{ items.description }}
          </li>
        </ul>
      </van-popup>
      <!-- 公告 -->
      <van-notice-bar
        left-icon="volume-o"
        color="#333"
        scrollable
        :text="rst.promotion_info"
      />
    </div>
    <!-- 主体内容 -->
    <main>
      <nav class="mian_nav" ref="nav_el" v-fixed>
        <div class="nav_items">
          <router-link :to="{name:'Menu',query:{id:$route.query.id}}">点餐</router-link>
        </div>
        <div class="nav_items">
          <router-link :to="{name:'Estimate',query:{id:$route.query.id}}">评价</router-link>
        </div>
        <div class="nav_items">
          <router-link :to="{name:'Merchant',query:{id:$route.query.id}}">商家</router-link>
        </div>
      </nav>
      <router-view></router-view>
    </main>
    <!-- 购物车 -->
    <Shopping :foods="rst" />
  </div>
</template>
<script>
import particularsModule from "./js/particularsModule";
import Shopping from "./particularsView/components/shopping.vue"
import { Popup, NoticeBar } from "vant";

export default {
  components: {
    [Popup.name]: Popup,
    [NoticeBar.name]: NoticeBar,
    Shopping
  },
  setup() {
    const {
      bought_list,
      menu,
      recommend,
      redpack,
      rst,
      user,
      desc,
      coupon,
      activities,
    } = particularsModule();
    return {
      bought_list,
      menu,
      recommend,
      redpack,
      rst,
      user,
      desc,
      coupon,
      activities,
    };
  },
};
</script>
<style lang="scss" scoped="scoped">
.particular {
  font-size: 0.32rem;
  // 头部图片部分
  .particular_header {
    position: relative;
    height: 3.6267rem;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    .go_back {
      font-family: 黑体;
      border: none;
      color: #fff;
      background-color: transparent;
      font-size: 0.8rem;
      width: 1.3333rem;
      height: 1.3333rem;
    }
    .particular_img {
      position: absolute;
      right: 0;
      left: 0;
      top: 1.6rem;
      img {
        display: block;
        width: 2.4rem;
        height: 2.4rem;
        margin: auto;
      }
    }
  }
  .description {
    text-align: center;
    margin-top: .9067rem;
    .description_title {
      font-size: 0.5333rem;
      margin-bottom: 0.2133rem;
      &::after {
        content: "";
        display: inline-block;
        width: 0;
        height: 0;
        border: 0.2133rem solid transparent;
        border-left-color: #000;
        margin-left: 0.2133rem;
        vertical-align: middle;
        margin-bottom: 0.0533rem;
      }
    }
    //弹出层关闭按钮
    ::v-deep(.van-icon) {
      color: #000;
    }
    .description_evaluate {
      span {
        margin: 0 0.2667rem 0 0.2667rem;
      }
    }
    // 优惠券
    .coupon_box {
      display: flex;
      margin-top: 0.16rem;
      justify-content: space-evenly;
      padding: 0.32rem;
      .coupon_items {
        position: relative;
        font-size: 0.3733rem;
        width: 4.4rem;
        height: 0.9067rem;
        background-color: #fff4f4;
        text-align: initial;
        line-height: 0.9067rem;
        .coupon_num {
          color: #6d6c29;
        }
        span {
          margin-left: 0.5333rem;
        }
        &::before,
        &::after {
          content: "";
          position: absolute;
          width: 0.053333rem;
          height: 0;
          right: 1.173333rem;
          border: 0.106666rem solid transparent;
        }
        &::before {
          top: 0;
          border-top-color: #fff;
        }
        &::after {
          bottom: 0;
          border-bottom-color: #fff;
        }
      }
    }
    // 店铺专属红包
    .ticket_title {
      font-size: 0.5333rem;
      text-align: center;
      margin: 0.2667rem 0;
    }
    //所有优惠
    .discounts {
      display: flex;
      justify-content: center;
      align-items: baseline;
      .discounts_show {
        display: flex;
        width: 70%;
        .discounts_icon {
          padding: 0.04rem 0.0533rem;
          color: #fff;
          border-radius: 0.08rem;
          margin-right: 0.1333rem;
        }
        .discounts_title {
          width: 3.4667rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          line-height: 0.5067rem;
          margin-right: 0.4267rem;
        }
      }
    }
    .ticket_all {
      li {
        text-align: left;
        margin-bottom: 0.16rem;
        padding-left: 0.2667rem;
        color: #666;
      }
      i {
        font-style: normal;
        color: #fff;
        padding: 0.0533rem;
        font-weight: 600;
        margin-right: 0.08rem;
        border-radius: 0.08rem;
      }
    }
    // 公告
    ::v-deep(.van-notice-bar__content) {
      font-size: 0.4267rem;
    }
  }
  //主体内容
  main {
    .mian_nav {
      display: flex;
      border-bottom: .0267rem solid #ddd;
      background-color: #fff;
      .nav_items {
        width: 3.3333rem;
        height: 1.3867rem;
        text-align: center;
        line-height: 1.3867rem;
        a {
          display:inline-block;
          font-size: 0.4267rem;
          color: #777;
          border-bottom: 0.0533rem solid transparent;
        }
        .router-link-active{
          color: #333;
          font-weight: 700;
          border-bottom-color: #FF6969;
        }
      }
    }
  }
}
</style>