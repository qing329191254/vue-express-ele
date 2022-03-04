<template>
  <div class="shop">
    <ul>
      <li class="elist_list" v-for="(item,i) in elistData" :key="item" @click="toParticulars(item.restaurant.id)">
        <div class="elist_img">
          <b v-if="corner_mark(item.restaurant.id)">{{corner_mark(item.restaurant.id)}}</b>
          <img :src="$formatImgSrc(item.restaurant.image_path)" alt="tupian" />
        </div>
        <div class="elist_details">
          <p class="title">
            <span class="sign" :class="{ sign_: item.restaurant.is_premium }">{{
              item.restaurant.name
            }}</span>
            <span class="advertising">
              <i v-if="item.restaurant.recommend.is_ad">广告</i>
              <span v-for="items in item.restaurant.supports" :key="items">
                <i v-if="items.id == 7">保</i>
                <i v-if="items.id == 4">票</i>
              </span>
            </span>
          </p>
          <div class="list_info">
            <van-rate
              v-model="item.restaurant.rating"
              allow-half
              readonly
              size="12"
            />
            <span class="grade">{{ item.restaurant.rating }}</span>
            <span class="sales"
              >月售{{ item.restaurant.recent_order_num }}单</span
            >
            <p>
              <span class="list_left"
                >￥{{
                  item.restaurant.piecewise_agent_fee.rules[0].price
                }}起送</span
              >
              <span>{{ item.restaurant.piecewise_agent_fee.description }}</span>
            </p>
            <p class="minute">
              <span class="list_left">{{
                getGps(item.restaurant.latitude, item.restaurant.longitude)
              }}</span>
              <span>{{ item.restaurant.order_lead_time }}分钟</span>
            </p>
            <div class="tag_name">
              <i v-for="tag in item.restaurant.flavors" :key="tag">{{ tag.name }}</i>
            </div>
          </div>
          <!-- 活动 -->
          <div class="activities">
            <activitiesList :data="item" :style="{height:activitiesListKey(i)}"></activitiesList>
            <p @click.stop="activitiesListFn(i)">
              {{ item.restaurant.activities.length }}个活动<i
                class="iconfont icon-xiala"
              ></i>
            </p>
          </div>
        </div>
      </li>
    </ul>
    <p class="loading_box">{{ loading }}</p>
  </div>
</template>
<script>
import { Rate } from "vant";
import activitiesList from "../activitiesList/activitiesList.vue";
import elistModule from "./js/elistModule.js"
export default {
  components: {
    [Rate.name]: Rate,
    activitiesList,
  },

  setup(props) {
    const {getGps,elistData,loading,activitiesListFn,activitiesListKey,toParticulars,corner_mark} = elistModule()
    return {
      getGps,
      elistData,
      loading,
      activitiesListFn,
      activitiesListKey,
      toParticulars,
      corner_mark
    }
  }
};
</script>
<style lang="scss" scoped="scoped">
.shop {
  padding-bottom: 1.6rem;
  .elist_list {
    display: flex;
    width: 100%;
    padding-bottom: 0.8rem;
    border-bottom: 0.0267rem solid #ccc;
    .elist_img {
      position: relative;
      margin: 0.5333rem 0.2667rem 0 0.4rem;
      img {
        width: 2.32rem;
        height: 2.32rem;
      }
      b{
        position: absolute;
        top: -0.133333rem;
        right: -0.1067rem;
        height: 0.2667rem;
        background-color: #f62571;
        font-size: 0.3467rem;
        color: #fff;
        padding: 0.16rem 0.1333rem;
        line-height: 0.2667rem;
        border-radius: 0.2667rem;
      }
    }
    .elist_details {
      position: relative;
      width: 100%;
      margin-top: 0.5333rem;
      color: #ccc;
      font-size: 0.32rem;
      .title {
        .sign {
          font-size: 0.4267rem;
          font-weight: 700;
          color: #000;
        }
        .sign_::before {
          content: "品牌";
          background-color: red;
          color: #fff;
          margin-right: 0.1333rem;
          font-size: 0.32rem;
          padding: 0.04rem 0.0533rem;
          vertical-align: text-top;
        }
      }
      .advertising {
        position: absolute;
        background-color: #fff;
        color: #999;
        top: 0.0533rem;
        right: 0.2667rem;
        height: 0.5333rem;
        font-size: 0.32rem;
        line-height: 0.5333rem;
        text-align: center;
        i {
          padding: 0.08rem;
          font-style: normal;
          border: 1px solid #ddd;
        }
      }
      .list_info {
        margin-top: 0.1333rem;
        line-height: 0.5867rem;
        .grade,
        .sales {
          vertical-align: middle;
          margin-left: 0.2133rem;
        }
        .minute {
          position: absolute;
          top: 1.28rem;
          right: 0.2667rem;
        }
        .list_left {
          border-right: 0.0267rem solid #ccc;
          padding-right: 0.1333rem;
          margin-right: 0.1333rem;
        }
        .tag_name {
          i {
            font-style: normal;
            margin-right: 0.1333rem;
            padding: 0.0533rem;
            border: 1px solid #dfdfdf;
          }
        }
      }
    }
    // 活动
    .activities {
      display: flex;
      margin-top: 0.2667rem;
      color: #000;
    }
  }
  .loading_box {
    text-align: center;
    height: 1.0667rem;
    line-height: 1.0667rem;
  }
}
</style>