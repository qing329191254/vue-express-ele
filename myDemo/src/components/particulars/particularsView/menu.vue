<script setup>
import menuModule from "./js/menuModule";
import heightModule from "./js/heightModule"
import BaseButton from "@/components/menuButton/baseButton.vue";
const { menu, recommend, change, count,corner_mark,rst} = menuModule();
const { menuStyle,highlightShow,con_Height } = heightModule()
</script>

<template>
  <div class="menu">
    <!-- 菜单头部 -->
    <div class="recommend">
      <h3>{{ recommend[0].name }}</h3>
      <ul class="recommend_box">
        <li
          class="recommend_items"
          v-for="items in recommend[0].items"
          :key="items"
        >
          <div>
            <img :src="$formatImgSrc(items.image_path)" alt="" />
          </div>
          <p class="trade_name">{{ items.name }}</p>
          <p>
            <span class="trade_boom">月售{{ items.month_sales }}份</span>
            <span class="trade_remark">好评{{ items.satisfy_rate }}%</span>
          </p>
          <p v-for="food in items.specfoods" :key="food" class="trade_price">
            ￥{{ food.price.toFixed(2) }}
            <!-- 计算商品数量 -->
            <BaseButton
              :count="count(items)"
              @changeKey="change($event, {data:items})"
            />
          </p>
        </li>
      </ul>
    </div>
    <!-- 菜单主体 -->
    <div class="menu_main" :style="{ height: con_Height }" ref="menu_main">
      <!-- 菜单左侧列表 -->
      <ul class="menu_list">
        <li
          v-for="(items, i) in menu"
          :key="items"
          class="menu_items"
          :class="{ highlight: highlightShow == i }"
          @click="menuStyle(i)"
        >
          <img
            :src="$formatImgSrc(items.icon_url)"
            v-if="items.icon_url"
            alt="图片"
          />
          <b v-if="corner_mark(rst,items.id)">{{corner_mark(rst,items.id)}}</b>
          {{ items.name }}
        </li>
      </ul>
      <!-- 菜单右侧类 -->
      <ul class="menu_class" ref="class_main">
        <li
          v-for="items in menu"
          :key="items"
          class="menu_class_s"
          ref="class_list"
        >
          <p class="title">
            <span class="title_name">{{ items.name }}</span>
            <span class="title_desc">{{ items.description }}</span>
          </p>
          <div
            v-for="foods in items.foods"
            :key="foods"
            class="commodity_items"
          >
            <img :src="$formatImgSrc(foods.image_path)" alt="图片" />
            <div class="commodity_detail">
              <p class="commodity_name">{{ foods.name }}</p>
              <p class="commodity_appraise">
                <span>月售{{ foods.month_sales }}份</span>
                <span>好评率{{ foods.satisfy_rate }}%</span>
              </p>
              <p v-if="foods.activity" class="single_price">
                <span>{{ foods.activity.benefit_text }}</span>
                <span>{{ foods.activity.description }}</span>
              </p>
              <p class="discount">
                <span class="discount_price">￥{{foods.specfoods[0].price.toFixed(1)}}</span>
                <span class="discount_before" v-if="foods.specfoods[0].original_price">
                  ￥{{foods.specfoods[0].original_price.toFixed(1)}}</span>
                <BaseButton
                  :count="count(foods)"
                  @changeKey="change($event, {data:foods,cid:items.id})"
                />
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.menu {
  // 菜单头部
  .recommend {
    h3 {
      margin-left: 0.4rem;
      font-size: 0.5867rem;
      padding-bottom: 0.2667rem;
      margin-bottom: 0;
    }
    .recommend_box {
      display: flex;
      overflow: hidden;
      overflow-x: auto;
      //   取消滚动条
      &::-webkit-scrollbar-track {
        width: 0;
      }
      &::-webkit-scrollbar {
        width: 0;
      }
      .recommend_items {
        margin-left: 0.4rem;
        width: 3.2rem;
        font-size: 0.32rem;
        color: #777;
        img {
          display: block;
          width: 3.2rem;
          height: 3.2rem;
        }
        .trade_name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.3733rem;
          color: #333;
          margin: 0.2133rem 0;
        }
        .trade_remark {
          margin-left: 0.1067rem;
        }
        .trade_price {
          display: flex;
          justify-content: space-between;
          font-size: 0.4267rem;
          color: #fb5050;
        }
      }
    }
  }
  //   菜单主体
  .menu_main {
    display: flex;
    font-size: 0.3733rem;
    // 菜单左侧列表
    .menu_list {
      .menu_items {
        position: relative;
        box-sizing: border-box;
        font-size: 0.3733rem;
        vertical-align: middle;
        padding: 0.2667rem 0.2667rem;
        height: 1.3333rem;
        width: 2.2667rem;
        line-height: 0.8rem;
        text-align: center;
        img {
          width: 0.6667rem;
          height: 0.6667rem;
          vertical-align: middle;
          margin-right: 0.08rem;
        }
        b{
          position: absolute;
          top: 0;
          right: -0.1067rem;
          height: 0.2667rem;
          background-color: #f62571;
          font-size: 0.3467rem;
          padding: 0.16rem 0.1333rem;
          line-height: 0.2667rem;
          border-radius: 0.2667rem;
          color: #fff;
        }
      }
      .highlight {
        background-color: #dfdfdf;
      }
    }
    // 菜单右侧类
    .menu_class {
      position: relative;
      width: 100%;
      overflow-y: auto;
      .menu_class_s {
        margin-left: 0.2667rem;
        .title {
          .title_name {
            font-weight: 600;
          }
          .title_desc {
            font-size: 0.32rem;
            color: #999;
            margin-left: 0.1333rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .commodity_items {
          display: flex;
          margin-top: 0.5333rem;
          img {
            width: 2.5333rem;
            height: 2.5333rem;
          }
          .commodity_detail {
            width: 4.4rem;
            .commodity_name {
              font-weight: 600;
            }
            .commodity_appraise {
              color: #aaa;
              font-size: 0.32rem;
              span:last-child {
                margin-left: 0.1333rem;
              }
            }
            .single_price {
              color: #f07373;
              font-size: 0.32rem;
              span:last-child {
                margin-left: 0.1333rem;
              }
            }
            .discount {
              display: flex;
              align-items: flex-end;
              justify-content: space-between;
              .discount_price {
                color: #f07373;
                font-size: 0.4267rem;
              }
              .discount_before {
                text-decoration: line-through;
                color: #ccc;
              }
              span:last-child {
                margin-left: 0.2133rem;
              }
            }
            p {
              margin-top: 0.1333rem;
              margin-left: 0.2667rem;
            }
          }
        }
      }
    }
  }
}
</style>