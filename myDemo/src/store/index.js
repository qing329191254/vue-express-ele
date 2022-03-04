import { createStore } from "Vuex";

const store = createStore({
    state: {
        particularData: null,//商品详情页数据
        shoppingData: {},//购物车数据
        cState:{}
    },
    mutations: {
        addData(state, data) {
            state.particularData = data
        },
        //添加商品
        addCommodity(state, items) {
            const {data,cid} = items
            
            var shoppingData = state.shoppingData //购物车状态
            var restaurantId = data.restaurant_id//商家id
            var foodId = data.specfoods[0].food_id//商品id
            var res = shoppingData[restaurantId]

            if (res) {
                var foods = shoppingData[restaurantId].foods
                shoppingData[restaurantId].all_food++
                if (foodId in foods) {
                    foods[foodId].count++
                } else {
                    res.class_count++
                    foods[foodId] = {
                        count: 1,
                        cid,
                        data
                    }
                }
            } else {
                shoppingData[restaurantId] = {
                    all_food: 1,
                    class_count:1,
                    foods: {
                        [foodId]: {
                            count: 1,
                            cid,
                            data
                        }
                    }
                }
            }
            this.commit("addClassNum",{restaurantId,cid})
        },
        //减少商品
        minusCommodity(state, items) {
            const {data,cid} = items
            var shoppingData = state.shoppingData //购物车状态
            var restaurantId = data.restaurant_id//商家id
            var foodId = data.specfoods[0].food_id//商品id
            var res = shoppingData[restaurantId]

            if (res) {
                var food = res.foods[foodId]
                if (food) {
                    res.all_food--
                    food.count--
                    if (res.all_food <= 0) {
                        delete shoppingData[restaurantId]
                    }
                    if (food.count <= 0) {
                        res.class_count--
                        delete res.foods[foodId]
                    }
                    if (res.class_count <= 0) {
                        delete res.class_count
                    }
                }
            }
            this.commit("removeClassNum",{restaurantId,cid})
        },
        //清空购物车
        clearCar(state,resId){
            delete state.shoppingData[resId]
            delete state.cState[resId]
        },
        //添加菜单分类商品数量
        addClassNum(state,id){
            const {restaurantId,cid} = id
            var res = state.cState
            if(restaurantId in res){
                if(cid in res[restaurantId]){
                    state.cState[restaurantId][cid]++
                }else{
                    state.cState[restaurantId][cid]=1
                }
            }else{
                state.cState[restaurantId] = {
                    [cid]:1
                }
            }
        },
        //减少菜单分类商品数量
        removeClassNum(state,id){
            const {restaurantId,cid} = id
            if(!cid) return
            var res = state.cState
            res[restaurantId][cid]--
            if(res[restaurantId][cid]<=0){
                delete state.cState[restaurantId][cid]
            }
            if(!state.shoppingData[restaurantId] || !state.shoppingData[restaurantId].all_food){
                delete state.cState[restaurantId]
            }
        }
    },
    getters: {
        bought_list(state) {
            return particularData(state, 'bought_list')
        },
        menu(state) {
            return particularData(state, 'menu')
        },
        recommend(state) {
            return particularData(state, 'recommend')
        },
        redpack(state) {
            return particularData(state, 'redpack')
        },
        rst(state) {
            return particularData(state, 'rst')
        },
        user(state) {
            return particularData(state, 'user')
        }
    }

})
function particularData(state, key) {
    if (state.particularData) {
        return state.particularData[key]
    }
}
export default store