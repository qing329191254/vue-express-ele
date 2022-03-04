const fixed = {
    mounted(el, binding) {
        //添加一个元素,在header设置绝对定位之后,占住空缺的位置
        var offsetTop = el.offsetTop
        var dp = document.createElement("p")
        var h = el.offsetHeight / 37.5 + 'rem'
        var arg = binding.arg || 0
        var dt = arg / 37.5 + 'rem'
        window.addEventListener("resize",()=>{
            offsetTop = el.offsetTop
            h = el.offsetHeight / 37.5 + 'rem'
            arg = binding.arg || 0
            dt = arg / 37.5 + 'rem'
            dp.style.cssText = `height:${h};display:none;`
        })
        dp.style.cssText = `height:${h};display:none;`
        el.after(dp)

        //设置元素样式
        window.addEventListener("scroll", fn)
        document.documentElement.addEventListener("scroll", fn)
        document.body.addEventListener("scroll", fn)
        var bool,_bool
        function fn() {
            var top = document.documentElement.scrollTop || document.body.scrollTop
            bool = top >= offsetTop - arg
            if(_bool !== bool){//bool为true的时候进来
                if (bool) {
                    el.style.cssText = `top:${dt};
                                        position: fixed;
                                        z-index:99;
                                        left: 0;`
                    dp.style.cssText = `display:block;
                                        height:${h};`
                    
                } else {
                    el.style.cssText = `position:initial;`
                    el.style.top = ""
                    dp.style.display = 'none'
                }
                _bool = bool //_bool赋值为true,下次bool为true则不进判断
            }
        }
    }
}

export default fixed;