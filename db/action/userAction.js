var userDao=require('../dao/userDao');
var noteDao=require('../dao/noteDao');
var config=require('../config/config');
var formidable=require('formidable');
var fs = require('fs');
var path = require('path');
//密码加密模块
var bcrypt = require('bcrypt-nodejs');
var pagination = require('../util/pagination');
exports.index = function(req, res) {
    var pageNum = 1;
    var keyWord =req.query.keyWord?req.query.keyWord:'';
    if(req.query.pageNum){
        pageNum = req.query.pageNum;
    };
    if(req.body.pageNum){
        pageNum = req.body.pageNum;
    };
    var pageSize=10;
    var page={
        pageNum:pageNum,
        pageSize:pageSize,
        keyWord:keyWord
    }
    noteDao.queryAll(page,function (err1,result) {
        var list=err1?[]:result;
        var count=list.length>0?list[0].count:0;
        var Create_links = pagination.createLinks(count,pageSize,pageNum,"?keyWord="+keyWord+"&");
        res.render('index.html',{
            title:"首页",
            path:'index',
            nodeList:list,
            links:Create_links,
            keyWord:keyWord
        })
    })
}
exports.login = function(req, res) {
    var user=req.body;
    userDao.queryByUserName(user.userName,function (err,result) {
        var list=err?[]:result;
        if (list.length>0){
            var flag=bcrypt.compareSync(user.password, list[0].password);
            var msg=flag?"登录成功":"密码错误";
            var status=flag?"101":"100";
            if(flag){
                list.forEach(function (item) {
                    item.register_date=item.register_date.Format("yyyy-MM-dd hh:mm:ss");
                })
                req.session.user=list[0];
            }
            res.json({
                status:status,
                msg:msg
            })
        }else {
            res.json({
                status:100,
                msg:"用户名不存在"
            })
        }
    })
}
// logout
exports.logout =  function(req, res) {
    delete req.session.user;
    res.redirect('/login')
}
exports.loginRequired = function(req, res, next) {
    var user = req.session.user;
    if (!user) {
        return res.redirect('/login')
    }
    next()
}
exports.myArticle = function(req, res) {
    var user = req.session.user;
    noteDao.queryByUserID(user.user_id,function (err,result) {
        var list=err?[]:result;
        res.render('myArticle.html',{
            title:"个人中心",
            path:'userCenter',
            userPath:"myArticle",
            articleList:list
        })
    })
}
exports.allUsers=function (req,res) {
    userDao.queryAll(function (err,result) {
        var list=err?[]:result;
        res.json({
            list:list
        })
    })
}
exports.userValid = function(req, res) {
    var name= req.body.userName;
    userDao.queryByUserName(name,function (err,results) {
        if(results.length>0&&results){
            res.json(false)
        }else {
            res.json(true)
        }
    });
}
exports.register=function (req,res) {
    var user=req.body;
    user.password=bcrypt.hashSync(user.password);
    userDao.add(user,function (err,result) {
        var status=err?100:101;
        var msg=err?'注册失败':'注册成功';
        res.json({
            status:status,
            msg:msg
        })
    })
}
exports.updateUserPic=function (req,res) {
    formidableFormParse(req,function (err,result) {
        if(err){
            console.log(err)
        }
        var user = req.session.user;
        user.userID=user.user_id;
        var newName=uuid(8)+'.png';
        user.pic=newName;
        fs.rename(result.file.path,path.resolve('./public/images/user/')+"/"+newName, function(err){
            if(err){
                throw err;
            }
            userDao.update(user,function (err,result1) {
                if(err){
                    res.json({
                        status:'100',
                        msg:"修改失败"
                    })
                }else {
                    var _user=req.session.user;
                    _user.user_pic=newName;
                    req.session.user=_user;
                    res.json({
                        status:'101',
                        msg:"修改成功"
                    })
                }
            })
        })
    })
}
function formidableFormParse(req,callback){
    var obj ={};
    var form = new formidable.IncomingForm({
        encoding:"utf-8",
        uploadDir:path.resolve('./public/images/user/'), //文件上传地址
        keepExtensions:true  //保留后缀
    });
    form.parse(req)
        .on('field', function(name, value) {  // 字段
            obj[name] = value;
        })
        .on('file', function(name, file) {  //文件
            obj[name] = file;
        })
        .on('error', function(error) {  //结束
            console.log(error)
            callback(error);
        })
        .on('end', function() {  //结束
            callback(null,obj);
        });
}
function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random()*16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}