import { reactive, toRefs } from '@vue/reactivity'
import { computed, watch, watchEffect } from '@vue/runtime-core'
import { useStore } from "Vuex"
function menuModule() {
    const $store = useStore()
    const menuData = reactive({
        //拿到菜单数据
        menu: computed(() => {
            //console.log('菜单:', $store.getters.menu)
            return $store.getters.menu
        }),
        rst:computed(()=>{
            return $store.getters.rst
        }),
        recommend: computed(() => {
            // console.log('recommend:', $store.getters.recommend)
            return $store.getters.recommend
        }),
        count_:computed(()=>{
            return $store.state.shoppingData
        }),
        corner_mark(resId,cid){
            var id = resId.id
            var cState = $store.state.cState
            if(cState[id]) {
                var res = cState[id]
                return res[cid]?res[cid]:0
            }
            return 0
        }
    })
    //将数据发送给state
    function change(key, items) {
        if (key) {
            $store.commit('addCommodity', items)
        } else {
            $store.commit('minusCommodity', items)
        }
    }
    //获取商品数量
    function count(data) {
        var restaurantId = data.restaurant_id//商家id
        var foodId = data.specfoods[0].food_id//商品id
        //判断是否为true,返回出单个商品的数量
        if(menuData.count_[restaurantId]){
            if(menuData.count_[restaurantId].foods[foodId]){
                return menuData.count_[restaurantId].foods[foodId].count
            }
        }
        return 0
    }
    //菜单角标计算

    return {
        ...toRefs(menuData),
        change,
        count,
    }
}
export default menuModule