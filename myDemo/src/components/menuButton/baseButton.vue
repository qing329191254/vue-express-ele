<script setup>
import { reactive, ref } from "@vue/reactivity";
import { computed, watch, watchEffect } from "@vue/runtime-core";
import { getCurrentInstance } from "vue";
import {useStore} from "Vuex"
const $store = useStore()
const { porxy } = getCurrentInstance();
defineProps({
  count:{
    type:Number,
    default:0
  }
})


</script>

<template>
  <div class="base_button">
    <button class="minus iconfont icon-jian" :class="{minusShow:count>0}" @click="$emit('changeKey',false)"></button>
    <span v-show="count>0">{{count}}</span>
    <button class="iconfont icon-jia"  @click="$emit('changeKey',true)"></button>
  </div>
</template>

<style lang='scss' scoped>
.base_button {
  display: flex;
  width: 1.6rem;
  align-items: center;
  justify-content: space-between;
  color: #000;
  //减号初始
  .minus {
    transition: .2s;
    opacity: 0;
    visibility: hidden;
    transform: translate(-30px) rotate(-160deg);
  }
  //显示减
  .minusShow {
    opacity: 1;
    visibility: visible;
    transform: translate(0) rotate(0);
  }
  .iconfont {
    font-size: .3733rem;
    padding: .08rem;
    background-color: #28bfbd;
    color: #fff;
    border-radius: 50%;
    border: none;
  }
}
</style>