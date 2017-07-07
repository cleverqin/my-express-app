var User = require('../db/action/userAction');
var Note = require('../db/action/noteAction');
var Comment = require('../db/action/commentAction');
var AMD = require('../db/action/AMD');

module.exports=function (app) {
    app.use(function(req, res, next) {
        var _user = req.session.user;
        app.locals.user = _user;
        next()
    })
    app.get('/',User.index);
    app.post('/addNote',Note.addNote);
    app.post('/noteUpdate',Note.articleUpdate);
    app.get('/nodeDetail/:id',Note.noteDetail);
    app.get('/articleEdit/:id',User.loginRequired,Note.articleEdit);
    app.post('/delArticle',User.loginRequired,Note.articleDel);
    app.post('/addComment',Comment.addComment)
    app.post('/allComment',Comment.allComment)
    app.get('/aboutUs',function (req,res) {
        res.render('aboutUs.html',{
            title:"关于我们",
            path:'aboutUs'
        })
    })
    app.get('/userCenter',User.loginRequired,function (req,res) {
        res.render('userCenter.html',{
            title:"个人中心",
            path:'userCenter',
            userPath:"userCenter"
        })
    })
    app.get('/userInfo',User.loginRequired,function (req,res) {
        res.render('userInfo.html',{
            title:"个人中心",
            path:'userCenter',
            userPath:"userInfo"
        })
    })
    app.get('/myArticle',User.loginRequired,User.myArticle)
    app.post('/updateUserPic',User.loginRequired,User.updateUserPic)
    app.post('/userValid',User.userValid);
    app.get('/login',function (req,res) {
        res.render('login.html',{
            title:"登录"
        })
    })
    app.post('/login',User.login);
    app.get('/logOut',User.logout);
    app.get('/register',function (req,res) {
        res.render('register.html',{
            title:"用户注册"
        })
    });
    app.post('/register',User.register);
    app.post('/AMD',AMD.AMD)
    app.get('/404',function (req,res) {
        res.status(400);
        res.render('404.html', {title: '404，未找到对应的资源'});
    })
    app.get('/500',function (req,res) {
        res.status(500);
        res.render('500.html', {title:'500，服务器出错了', error: error});
    })
    app.get('/admin',function (req,res) {
        res.render('admin.html')
    })
    app.get('/userList',User.allUsers)
}
