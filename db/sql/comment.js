var squel=require('../util/squel');
module.exports={
    insert:function (comment) {
        var now=new Date().Format("yyyy-MM-dd hh:mm:ss");
        return squel.insert()
            .into("comment_tb")
            .set("comment_user_id", comment.userID)
            .set("comment_note_id", comment.noteID)
            .set("comment_content", comment.content)
            .set("comment_create_date", now)
            .toParam();
    },
    queryAll:function (page) {
        return squel.select()
            .from("comment_tb")
            .from("user_tb")
            .field("user_tb.user_id","userID")
            .field("user_tb.nick_name","userNickName")
            .field("user_tb.user_name","userName")
            .field("user_tb.user_pic","userPic")
            .field("comment_tb.comment_id","commentID")
            .field("comment_tb.comment_note_id","noteID")
            .field("comment_tb.comment_content","commentContent")
            .field("comment_tb.comment_create_date","commentDate")
            .field( squel.select().field("count(*)").from("comment_tb").where('comment_tb.comment_note_id=?',page.noteID), 'count')
            .where("comment_tb.comment_user_id = user_tb.user_id")
            .where("comment_tb.comment_note_id=?",page.noteID)
            .order("comment_tb.comment_create_date",'DESC')
            .limit(page.pageSize)
            .offset((page.pageNum-1)*page.pageSize)
            .toParam()
    }
}