var dao = require('../config/dao');
const commentSql=require('../sql/comment');
module.exports = {
    add: function (comment,callback) {
        var sql=commentSql.insert(comment);
        dao.query(sql.text,sql.values,callback)
    },
    queryAll:function (page,callback) {
        var sql=commentSql.queryAll(page);
        dao.query(sql.text,sql.values,function(err, result) {
            if(!err){
                result.forEach(function (item) {
                    item.commentDate=item.commentDate.Format("yyyy-MM-dd hh:mm:ss");
                })
            }
            callback(err,result);
        })
    },
};