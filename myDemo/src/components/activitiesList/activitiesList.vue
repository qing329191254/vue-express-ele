<template>
  <ul class="activities_list">
    <li v-for="items in data.restaurant.activities" :key="items">
      <i :style="{ 'background-color': '#' + items.icon_color }">{{
        items.icon_name
      }}</i>
      {{ items.description }}
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    data: Object,
  },
};
</script>
<style lang="scss" scoped="scoped">
.activities_list {
  width: 4.7467rem;
  overflow: hidden;
  height: 1.2rem;
  li {
    margin-bottom: 0.2133rem;
    i {
      font-style: normal;
      color: #fff;
      padding: 0.0533rem;
      font-weight: 600;
      margin-right: 0.08rem;
    }
  }
}
.activities_list > :first-child {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>