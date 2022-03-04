<template>
  <ul class="toolbar">
    <li v-for="(item, i) of toolbar_items" :key="i" class="items">
      <router-link :to="item.link">
        <i class="iconfont" :class="item.font"></i>
        <span>{{ item.name }}</span>
      </router-link>
    </li>
  </ul>
</template>
<script>
import { reactive, toRefs } from "vue";
export default {
  setup() {
    const data = reactive({
      toolbar_items: [
        {
          name: "首页",
          link: "Home",
          font: "icon-shouye",
        },
        {
          name: "发现",
          link: "discover",
          font: "icon-faxian",
        },
        {
          name: "订单",
          link: "order",
          font: "icon-dingdan-",
        },
        {
          name: "我的",
          link: "mine",
          font: "icon-wode",
        },
      ],
    });
    return {
      ...toRefs(data),
    };
  },
};
</script>
<style lang='scss' scoped='scoped'>
.toolbar {
  z-index: 999;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 10rem;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #000;
  justify-content: space-evenly;
  box-shadow: 0 0 0.106667rem #000;
  .items {
    text-align: center;
    padding: 0.133333rem 0;
    .iconfont {
      display: block;
      font-size: 0.64rem;
      margin-bottom: 0.08rem;
    }
    a {
      display: block;
      text-decoration: none;
    }
    .router-link-active {
      color: #fff;
      font-weight: 500;
    }
  }
}
</style>