var commentDao=require('../dao/commentDao');
exports.addComment = function(req, res) {
    var comment=req.body;
    commentDao.add(comment,function (err,result) {
        var msg=err?'增加失败':'添加成功';
        var status=err?'100':'101';
        res.json({
            status:status,
            msg:msg
        })
    })
}
exports.allComment = function(req, res) {
    var noteID = req.body.noteID;
    var page={
        noteID:noteID,
        pageNum:1,
        pageSize:10
    }
    commentDao.queryAll(page,function (err,result) {
        var list=err?[]:result;
        res.json({
            list:list
        })
    })
}