var nodeDao=require('../dao/noteDao');
exports.addNote = function(req, res) {
    var note=req.body;
    nodeDao.add(note,function (err,result) {
        var msg=err?'增加失败':'添加成功';
        var status=err?'100':'101';
        res.json({
            status:status,
            msg:msg
        })
    })
}
exports.noteDetail = function(req, res) {
    var id=req.params.id;
    nodeDao.queryByID(id,function (err,result) {
        var note=err?{}:result[0];
        if(result&&result.length>0){
            res.render('noteDetail.html',{
                title:'文章详情',
                note:note
            })
        }else {
            res.redirect('/404')
        }
    })
}
exports.articleEdit = function(req, res) {
    var id=req.params.id;
    var user = req.session.user;
    nodeDao.queryByID(id,function (err,result) {
        var note=err?{}:result[0];
        if(user.user_id!=note.create_user_id){
            res.render('userCenter.html',{
                title:"个人中心",
                path:'userCenter',
                userPath:"userCenter"
            })
        }else {
            res.render('articleEdit.html',{
                title:"个人中心",
                path:'userCenter',
                userPath:"userCenter",
                note:note
            })
        }
    })
}
exports.articleUpdate = function(req, res) {
    var note=req.body;
    nodeDao.update(note,function (err,result) {
        console.log(err)
        res.json({
            status:101,
            msg:"修改成功"
        })
    })
}
exports.articleDel = function(req, res) {
    var id=req.body.noteID;
    nodeDao.delete(id,function (err,result) {
        if(err){
            res.json({
                status:100,
                msg:"删除失败"
            })
        }else {
            res.json({
                status:101,
                msg:"删除成功"
            })
        }
    })
}