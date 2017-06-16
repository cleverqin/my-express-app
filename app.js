var express = require('express')           //express框架引入
var app = express();                       //实例
var bodyParser = require('body-parser');    //表单解析模块
var art = require('express-art-template');                   //模板引擎
var cookieParser = require('cookie-parser');//cookie解析模块
var session = require('express-session');//session解析模块

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'clever'
}))
app.use(express.static('public'));

app.set('views','./views')                 //视图模板位置
app.engine('html', art);

app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
require('./routes/router')(app);
app.use(function(req, res) {
    res.redirect('/404')
});
// Handle 500
app.use(function(error, req, res, next) {
    res.redirect('/500')
});
app.listen(3000);
console.log("sever at 3000");