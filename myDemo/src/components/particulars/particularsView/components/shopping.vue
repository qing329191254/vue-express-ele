<script setup>
import shoppingModule from "./js/shoppingModule";
import BaseButton from "@/components/menuButton/baseButton.vue";
import menuModule from "../js/menuModule";
const food = defineProps({
  foods: Object,
});
const {
  allPrice,
  lowest_price,
  allAmount,
  showAnimation,
  state,
  clearList,
  list_animation,
  startList,
  clearCar,
  list_height,
  list_color
} = shoppingModule(food);
const { count, change } = menuModule();
</script>

<template>
  <div class="shopping_wrapper">
    <!-- 购物车功能块 -->
    <div class="shopping">
      <div class="shopping_detail">
        <div
          @click="startList"
          class="shopping_icon"
          :class="{ change_icon: showAnimation,change_color:list_color }"
        >
          <i class="iconfont icon-gouwuche"></i>
          <b v-show="allAmount > 0">{{ allAmount }}</b>
        </div>
        <div class="shopping_price">
          <p v-if="lowest_price >= 0" class="hint">还不够吃~</p>
          <p v-else>
            <span class="total_prices">￥{{ allPrice.allPresent }}</span>
            <span v-show="allPrice.allOriginal > 0" class="original_price"
              >￥{{ allPrice.allOriginal }}</span
            >
          </p>
          <p class="describe">
            {{ food.foods.piecewise_agent_fee.description }}
          </p>
        </div>
      </div>
      <div class="submit_btn" v-if="lowest_price >= 0">
        还差{{ lowest_price }}元起送
      </div>
      <div v-else class="change_btn">请提交</div>
    </div>
    <!-- 购物车列表 -->
    <transition name="list">
      <div v-if="list_animation" class="shopping_list">
        <p class="already_decrease">已减{{ allPrice.allOriginal }}元</p>
        <div class="selected_title">
          <span>已选商品</span>
          <span @click="clearCar"
            ><i class="iconfont icon-qingkongshanchu"></i>清空</span
          >
        </div>
        <ul
          v-if="state"
          class="selected_container"
          :style="{ height: list_height }"
        >
          <li
            class="selected_list"
            v-for="foods in state.foods"
            :key="foods"
            v-show="foods.count > 0"
          >
            <span>{{ foods.data.name }}</span>
            <div class="shopping_list_btn">
              <span>￥{{ foods.data.specfoods[0].price }}</span>
              <BaseButton
                :count="count(foods.data)"
                @changeKey="change($event, {data:foods.data,cid:foods.cid})"
              />
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style lang='scss' scoped>
//购物车
.shopping_wrapper {
  position: fixed;
  width: 100%;
  height: 1.76rem;
  left: 0;
  bottom: 0;
  //购物车功能块
  .shopping {
    display: flex;
    position: relative;
    z-index: 6;
    color: #fff;
    //左侧
    .shopping_detail {
      display: flex;
      width: 55%;
      color: #5f5f63;
      background-color: #000;
      .shopping_icon {
        position: relative;
        box-sizing: border-box;
        width: 1.8133rem;
        height: 1.8133rem;
        background-color: #363636;
        border-radius: 50%;
        margin-top: -0.2667rem;
        margin-left: 0.6667rem;
        border: 0.16rem solid #444;
        text-align: center;
        line-height: 1.3867rem;
        .icon-gouwuche {
          font-size: 0.933333rem;
        }
        b {
          position: absolute;
          top: -0.133333rem;
          right: -0.1067rem;
          height: 0.2667rem;
          background-color: #f62571;
          font-size: 0.3467rem;
          padding: 0.16rem 0.1333rem;
          line-height: 0.2667rem;
          border-radius: 0.2667rem;
        }
      }
      .change_icon {
        animation: shopping_cart 0.3s;
      }
      .change_color {
        color: #fff;
        background-color: #1fb3f0;
      }
      .shopping_price {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 0.2667rem;
        .total_prices {
          font-size: 0.48rem;
          margin-bottom: 0.1067rem;
        }
        .hint {
          font-size: 0.3733rem;
          color: #999;
          padding-bottom: 0.1333rem;
        }
        .describe,
        .original_price {
          color: #999;
        }
        .original_price {
          margin-left: 0.1067rem;
          text-decoration: line-through;
        }
      }
    }
    //右侧
    .submit_btn {
      width: 45%;
      font-weight: bold;
      font-size: 0.48rem;
      line-height: 1.76rem;
      text-align: center;
      background-color: #777;
    }
    //按钮显示样式
    .change_btn {
      width: 45%;
      font-weight: bold;
      font-size: 0.48rem;
      line-height: 1.76rem;
      text-align: center;
      background-color: #69f398;
    }
    //购物车图标动画
    @keyframes shopping_cart {
      50% {
        transform: scale(0.9);
      }
      75% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  }

  //列表下拉动画
  .list-enter-active,
  .list-leave-active {
    transition: 0.5s;
  }
  .list-enter,
  .list-leave-to {
    transform: translateY(100%);
  }

  //购物车列表
  .shopping_list {
    position: absolute;
    width: 100%;
    z-index: 5;
    bottom: 1.76rem;
    .already_decrease {
      line-height: 0.64rem;
      text-align: center;
      background-color: #f3ebcd;
    }
    .selected_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.2667rem;
      height: 1.4933rem;
      background-color: #eceff1;
      font-size: 0.3733rem;
      .icon-qingkongshanchu {
        padding-right: 0.2667rem;
      }
    }
    .selected_list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.2667rem;
      height: 1.4933rem;
      border-bottom: 0.0267rem solid #f5f5f5;
      background-color: #fff;
      font-size: 0.4267rem;
      .shopping_list_btn {
        display: flex;
        span {
          font-family: sans-serif;
          color: #f75858;
          font-weight: 600;
          margin-right: 0.32rem;
        }
      }
    }
    .selected_container {
      overflow-y: auto;
    }
  }
}
</style>