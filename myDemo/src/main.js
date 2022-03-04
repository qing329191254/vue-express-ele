import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axios from './http/config.js'
import {Button,IndexBar,IndexAnchor,Cell,Swipe, SwipeItem} from 'vant';
import formatImgSrc from './plugin/fomatImgSrc';
import fixed from './plugin/fixedDireactive';
import store from './store';
import autoTop from './plugin/autoTop'

const app = createApp(App)
app.use(Button)
app.use(IndexBar)
app.use(Cell)
app.use(IndexAnchor)
app.use(router)
app.use(store)
app.use(Swipe)
app.use(SwipeItem)
app.config.globalProperties.$axios=axios
app.config.globalProperties.$formatImgSrc=formatImgSrc
app.config.globalProperties.$autoTop=autoTop
app.directive("fixed",fixed)
app.mount('#app')
!(function(){
    var doc = document.documentElement;
    var size = doc.clientWidth/10;
    window.addEventListener("resize",function(){
        size = doc.clientWidth/10;
        doc.style.fontSize = size +"px";
    },false)
    doc.style.fontSize = size +"px";
})();