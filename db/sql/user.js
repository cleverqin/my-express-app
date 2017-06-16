var squel=require('../util/squel');
module.exports={
    insert:function (user) {
        var now=new Date().Format("yyyy-MM-dd hh:mm:ss");
        return squel.insert()
            .into("user_tb")
            .set("user_name", user.userName)
            .set("password", user.password)
            .set("nick_name", user.nickName)
            .set("user_pic", "1.jpg")
            .set("register_date", now)
            .toParam();
    },
    queryByUserName:function (user) {
        return squel.select()
            .from("user_tb")
            .where("user_tb.user_name = ?", user.userName)
            .toParam()
    },
    update:function (user) {
        return squel.update()
            .table("user_tb")
            .set("user_pic", user.pic)
            .where("user_tb.user_id = ?",user.userID)
            .toParam()
    }
}