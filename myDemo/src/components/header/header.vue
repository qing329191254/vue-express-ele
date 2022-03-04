<template>
  <div class="header">
    <slot name="header_main">
      <div class="header_main">
        <i class="iconfont icon-zuo" @click="$emit('change')"></i>
        <span class="header_title">{{ title }}</span>
      </div>
    </slot>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
  },
};
</script>
<style lang='scss' scoped='scoped'>
.header {
  //   background-image: linear-gradient(130deg, #000, rgb(68, 33, 33));
  background-color: #000;
  overflow: hidden;
  .header_main {
    position: relative;
    display: flex;
    justify-content: center;
    color: #fff;
    line-height: 1.6rem;
    .iconfont {
      position: absolute;
      font-size: 0.533333rem;
      left: 0.533333rem;
    }
    .header_title {
      font-size: 0.533333rem;
      font-weight: 500;
    }
  }
}
</style>