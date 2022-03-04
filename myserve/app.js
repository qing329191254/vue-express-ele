const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/*+json' }))

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
})
// 城市名称
app.get('/api/cityName', (req, res) => {
    res.json(require('./datas/cityName.json'))
})
// 主页商品轮播
app.get('/api/commodity', (req, res) => {
    res.json(require('./datas/home.json'))
})
// 商品列表
app.get('/api/list', (req, res) => {
    var offset = parseInt(req.query.offset)
    var len = parseInt(req.query.len)
    var data = require('./datas/list.json')
    // console.log(req.query);
    res.json({items:data.items.slice(offset,offset+len),meta:data.meta})
    //res.json({items:data.items.splice(offset,len),meta:data.meta}) 不能用splice,它会把影响原对象,这里的数据不会实时刷新
})
// 商品详情页数据
app.get('/api/particulars',(req,res)=>{
    var id = req.query.id
    var data = require('./datas/detail.json')[id]
    res.json(data)
})
app.listen(4000,()=>{
    console.log('4000端口已启动')
})