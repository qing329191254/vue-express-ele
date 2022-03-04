import { reactive, computed, watchEffect, watch, toRefs,onMounted,getCurrentInstance} from "vue"
import { useStore } from "Vuex"
function shoppingModule(food) {
    const $store = useStore()
    const data = reactive({
        shoppingData: computed(()=>{//商家数据
            return $store.state.shoppingData
        }),
        state: computed(()=>{//根据id查询商家状态
            return data.shoppingData[food.foods.id]
        }),
        base_price:computed(()=>{//起送费
            return $store.getters.rst.float_minimum_order_amount
        }),
        allAmount : computed(()=>{//所有商品的数量
            if(data.state){
                return data.state.all_food
            }
            return 0
        }),
        class_count:computed(()=>{
            if(data.state){
                return data.state.class_count
            }
            return 0
        }),
        list_animation:false,//判断购物车列表动画
        showAnimation:false,//判断购物车图标动画
        list_color:false,//购物车图标颜色
        list_height:"auto"
    })
    const proxy = getCurrentInstance()
    //起送价
    const lowest_price = computed(()=>{
        if(allPrice.value.allPresent){
            var difference = data.base_price - allPrice.value.allPresent
            return difference.toFixed(1)
        }
        return data.base_price.toFixed(1)
    })
    //计算总价
    const allPrice = computed(() => {
        var state = data.state
        var allPrice = {
            allPresent: 0,//总现价
            allOriginal: 0,//总原价
        }
        if (state) {
            for (var key in state.foods) {
                var food = state.foods[key]
                var aprice = food.data.specfoods[0].price//商品现价单价
                var original = food.data.specfoods[0].original_price//商品原价单价
                var single= food.count //单个商品的数量
                allPrice.allPresent += aprice*single//商品总现价
                allPrice.allOriginal += (original?original:0) * single//商品总原价
            }
            allPrice.allPresent = allPrice.allPresent.toFixed(1)
            allPrice.allOriginal = allPrice.allOriginal.toFixed(1)
        }
        return allPrice
    })
    //购物车列表开关
    const startList = ()=>{
        if(data.allAmount>0){
            data.list_animation = !data.list_animation
            return
        }
        data.list_animation = false
    }

    //清空购物车
    const clearCar = ()=>{
        $store.commit('clearCar', food.foods.id)
    }
    onMounted(()=>{
        //购物车图标点击动画
        watch(()=>data.allAmount,(val,oval)=>{
            if(val<=0){
                data.showAnimation = false
                return
            }
            if(val>oval){
                data.showAnimation = false
                requestAnimationFrame(() => {
                    data.showAnimation= true
                }, 100);
            }

        })
        //购物车没有东西的时候,让列表关闭
        //根据商品数量设置滚动条
        watchEffect(()=>{
            if(data.allAmount<=0){
                data.list_animation = false
            }
            data.list_color = data.allAmount>0?true:false
            data.list_height = data.class_count>=4?4*57/37.5+"rem":"auto"
        })
    })
    return {
        allPrice,
        lowest_price,
        ...toRefs(data),
        startList,
        clearCar,
    }
}
export default shoppingModule