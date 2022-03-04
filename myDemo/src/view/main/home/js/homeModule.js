import { getCurrentInstance,toRefs,reactive,onMounted,computed } from "vue";
function homeModule(){
    const {proxy} = getCurrentInstance()
    const data = reactive({
        cityName:"",
        commodityData:null,
        homeShow:true,
    })
    const showSide = ()=>{
        proxy.$refs.Side.show.main = true
        data.homeShow = false
    }
    const cityMsg = val=>{
        data.cityName = val
    }
    // 处理商品数据
    const handle = computed(()=>{
        if(!data.commodityData) return
        var arr = []
        do{
            arr.push(data.commodityData.splice(0,10))
        }while(data.commodityData.length)
        return arr
    })
    onMounted(()=>{
        proxy.$axios("/commodity").then((res)=>{
            data.commodityData = res.data.entries
            //arr.push(res.data.entries.splice(0,20))
            //arr.push(res.data.entries.slice(0,20))
        })
    })
    return {
        ...toRefs(data),
        showSide,
        cityMsg,
        handle
    }
}
export default homeModule