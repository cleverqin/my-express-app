var dao = require('../config/dao');
const userSql=require('../sql/user');
module.exports = {
    queryByUserName:function (userName,callback) {
        var sql=userSql.queryByUserName({userName:userName});
        dao.query(sql.text,sql.values,callback)
    },
    add:function (user,callback) {
        var sql=userSql.insert(user);
        dao.query(sql.text,sql.values,callback)
    },
    update: function (user,callback) {
        var sql=userSql.update(user);
        dao.query(sql.text,sql.values,callback)
    },
    queryAll:function (callback) {
        var sql=userSql.queryAll();
        dao.query(sql.text,sql.values,callback)
    }
};