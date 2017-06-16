var dao=require('../config/dao');
exports.AMD=function (req,res) {
    var data=req.body;
    dao.query(data.sql,data.prams,function (err,result) {
       var json=err?null:result;
       res.json(json)
    })
}