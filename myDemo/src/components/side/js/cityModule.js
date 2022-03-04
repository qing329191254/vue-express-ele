import { getCurrentInstance, reactive, toRefs, onMounted ,computed} from "vue";
function cityData() {
    const { proxy } = getCurrentInstance();//获取上下文,调用axios方法
    const data = reactive({
        citylist:null,
        search:'',
        currentCity:null,
        show:{
            city:false,
            main:false
        }
    })
    const citys = {}
    var arr 
    var key
    const cityName = computed(()=>{//处理城市列表数据
        arr = data.citylist
        if(!arr) return
        for (var itmes of arr) {
            //获取key
            key = itmes.pinyin[0]
            if (key in citys) {//citylist.citylist有key则直接push添加在数组
                citys[key].push(itmes)
            } else {
                citys[key] = [itmes]//没有则添加key,主页这里不能直接点key,key是个字符串
            }
        }
        return citys
    })

    const citySearch = computed(()=>{//处理城市搜索列表数据
        const msg = data.search//获取搜索框内容
        var arrs=[]
        if(!arr || !msg) return
        for (var itmes of arr) {
            if (new RegExp(msg,'ig').test(itmes.label)) {//模糊查询判断
                arrs.push(itmes)
            }
        }
        return arrs
    })

    const selectCity = val=>{
        data.search = '',
        data.currentCity = val,
        proxy.$emit("cName",val)
        data.show.city = false
    }
    const selectLocation = ()=>{
        data.show.main = false
        proxy.$emit("hShow")
    }
    onMounted(() => {//获取axios数据
        proxy
            .$axios("/cityName")
            .then((res) => {
                //获取数据
                data.citylist = res.data
                
            })
            .catch((error) => {
                console.log(error);
            });
    })
    return {
        cityName,
        ...toRefs(data),
        citySearch,
        selectCity,
        selectLocation
    };
}
export default cityData