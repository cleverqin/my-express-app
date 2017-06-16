var dao = require('../config/dao');
const noteSql=require('../sql/note');
module.exports = {
    add: function (note,callback) {
        var sql=noteSql.insert(note);
        dao.query(sql.text,sql.values,callback)
    },
    queryAll:function (page,callback) {
        var sql=noteSql.queryAll(page);
        dao.query(sql.text,sql.values,function(err, result) {
            if(!err){
                result.forEach(function (item) {
                    item.create_date=item.create_date.Format("yyyy-MM-dd hh:mm:ss");
                    item.update_date=item.update_date.Format("yyyy-MM-dd hh:mm:ss");
                })
            }
            callback(err,result);
        })
    },
    queryByID:function (id,callback) {
        var sql=noteSql.queryByID(id);
        dao.query(sql.text,sql.values,function(err, result) {
            if(!err){
                result.forEach(function (item) {
                    item.create_date=item.create_date.Format("yyyy-MM-dd hh:mm:ss");
                    item.update_date=item.update_date.Format("yyyy-MM-dd hh:mm:ss");
                })
            }
            callback(err,result);
        })
    },
    queryByUserID:function (id,callback) {
        var sql=noteSql.queryByUserID(id);
        dao.query(sql.text,sql.values,function(err, result) {
            if(!err){
                result.forEach(function (item) {
                    item.create_date=item.create_date.Format("yyyy-MM-dd hh:mm:ss");
                    item.update_date=item.update_date.Format("yyyy-MM-dd hh:mm:ss");
                })
            }
            callback(err,result);
        })
    },
    update: function (note,callback) {
        var sql=noteSql.update(note);
        dao.query(sql.text,sql.values,callback)
    },
    delete:function (id,callback) {
        var sql=noteSql.delete({noteID:id});
        dao.query(sql.text,sql.values,callback)
    }
};