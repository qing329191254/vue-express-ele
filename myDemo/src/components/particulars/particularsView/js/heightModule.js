import { reactive, toRefs } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { getCurrentInstance } from 'vue'
import { useStore } from "Vuex"
function heightModule() {
    const $store = useStore()
    const { proxy } = getCurrentInstance()
    const menuData = reactive({
        arr:[],
        con_Height: 0,
        highlightShow: 0,
        scrollOf: true
    })
    //计算菜单主体的高度
    const setConHeight = () => {
        let oterH = window.outerHeight
        let nav_H = proxy.$parent.$parent.$refs.nav_el.offsetHeight
        let h = (oterH - nav_H) / 37.5 + 'rem'
        menuData.con_Height = h
    }

    var time //用于取消定时器
    //点击左侧菜单,右侧对应滚动
    const menuStyle = i => {
        menuData.scrollOf = false
        clearInterval(time)
        //设置左侧菜单栏样式
        menuData.highlightShow = i
        //置顶
        proxy.$autoTop(0, proxy.$refs.menu_main)
        //获取右侧列表的滚动高度
        var offset = proxy.$refs.class_list[i].offsetTop
        //设置右侧盒子的滚动高度
        var con_main = proxy.$refs.class_main
        $(con_main).animate({
            scrollTop: offset
        }, 300, () => {
            time = setTimeout(() => {
                menuData.scrollOf = true
            }, 300);
        })
    }
    onMounted(() => {
        setConHeight()
        //保存滚动条高度
        for (var ele of proxy.$refs.class_list) {
            menuData.arr.push(ele.offsetTop)
        }

        var con_main = proxy.$refs.class_main
        var _i = 0
        //滚动商品对应左侧下标
        con_main.addEventListener('scroll', () => {

            var index = menuData.highlightShow
            if (menuData.scrollOf) {
                proxy.$autoTop(0, proxy.$refs.menu_main)
                for (var i = 0; i < menuData.arr.length; i++) {
                    if (con_main.scrollTop <= menuData.arr[i]) {
                        //利用break每次只取第一次循环为true进来的i
                        _i = i>0? i-1:0
                        //相同的值只赋值一次
                        if (index !== i) {
                            menuData.highlightShow = _i
                        }
                        break;
                    }
                }
            }
        })
    })
    return {
        ...toRefs(menuData),
        menuStyle
    }
}
export default heightModule