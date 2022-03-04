import { getCurrentInstance, onMounted, reactive, toRefs ,computed} from "vue";
import { useStore } from "Vuex"
function particularsModule() {
    const { proxy } = getCurrentInstance();
    const $store = useStore()
    const show = reactive({
        desc:false,
        coupon:false,
		activities:false
    })

    //拿到vuex中的计算数据
    const bought_list = computed(() => {
        return $store.getters.bought_list
    })
    const menu = computed(() => {
        return $store.getters.menu
    })
    const recommend = computed(() => {
        return $store.getters.recommend
    })
    const redpack = computed(() => {
        return $store.getters.redpack
    })
    const rst = computed(() => {
        return $store.getters.rst
    })
    const user = computed(() => {
        return $store.getters.user
    })
    
    onMounted(() => {
        //获取详情页数据,发送给vuex
        proxy
            .$axios("/particulars", {
                params: {
                    id: proxy.$route.query.id,
                },
            })
            .then((res) => {
                for (let key in res.data) {
                    res.data[key] = JSON.parse(res.data[key].body);
                }
                $store.commit('addData', res.data);
            });
    });
    return {
        bought_list,
        menu,
        recommend,
        redpack,
        rst,
        user,
        ...toRefs(show)
      };
}
export default particularsModule