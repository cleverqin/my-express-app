//此处使用的是MySQL@2.11.1
var mysql = require('mysql');
//数据库配置
var config = require('./config');
//连接池
var  pool=mysql.createPool(config);
//通用执行sql方法
module.exports.query = function (sql,params,callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            if (callback) {
                callback(err);
            }
        } else {
            connection.query(sql, params, callback);
            connection.release();
        }
    });
}