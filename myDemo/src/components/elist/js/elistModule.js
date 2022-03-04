import { getCurrentInstance, reactive, toRefs, onMounted ,computed} from "vue";
import { useRouter ,useRoute} from "vue-router"
import {useStore} from "Vuex"
function elistModule() {
    const { proxy } = getCurrentInstance();
    const $store = useStore()
    const data = reactive({
        gps: {
            latitude: 28.215309,
            longitude: 112.925113,
        },
        elistData: [],
        loading: "",
        activitiesListBool: {},
        shoppingDataState:computed(()=>{//加购状态
            return $store.state.shoppingData
        })
    });
    //  活动列表
    function activitiesListFn(i) {
        data.activitiesListBool[i] = !data.activitiesListBool[i]
    }
    function activitiesListKey(i) {
        return data.activitiesListBool[i]?"auto":""
    }
    // 跳转商品详情页,传递id
    const router = useRouter()
    function toParticulars(id){
        router.push({name:'Menu',query:{id}})
    }
    function corner_mark(id){
        if(data.shoppingDataState[id]){
            return data.shoppingDataState[id].all_food
        }
    }
    //滚动页面懒加载
    onMounted(() => {
        var top,
            h,
            _h,
            offset = 0,
            len = 8,
            dHtml = document.documentElement,
            dBody = document.body;
        getData(offset, len);
        window.addEventListener("scroll", () => {
            //判断页面是否到底
            (top = dHtml.scrollTop || dBody.scrollTop),
                (h = dHtml.clientHeight || dBody.clientHeight),
                (_h = dHtml.offsetHeight || dBody.offsetHeight);
            if (top >= _h - h) {
                offset += len;
                getData(offset, len);
            }
        });
    });
    //懒加载获取数据
    function getData(offset, len) {
        proxy.$axios(`/list?offset=${offset}&len=${len}`).then((res) => {
            data.loading = res.data.items.length ? "加载中..." : "没有更多了...";
            if (!res.data.items.length) return;
            data.elistData.push(...res.data.items);
        });
    }

    //获取距离
    function getGps(latitude, longitude) {
        var _latitude = latitude - data.gps.latitude;
        var _longitude = longitude - data.gps.longitude;
        var tanA = _latitude * _latitude + _longitude * _longitude;
        var km = Math.sqrt(tanA) * 100;
        return km.toFixed(2) + "km";
    }
    return { getGps, ...toRefs(data), activitiesListFn, activitiesListKey ,toParticulars,corner_mark};
}
export default elistModule
