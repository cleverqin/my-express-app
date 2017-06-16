var squel=require('../util/squel');
module.exports={
    queryAll:function (page) {
        return squel.select()
            .from("note_tb")
            .field("*")
            .field( squel.select().field("count(*)").from("note_tb").where("note_tb.note_title like ?",'%'+page.keyWord+'%'), 'count')
            .where("note_tb.note_title like ?",'%'+page.keyWord+'%')
            .order("note_tb.create_date",'DESC')
            .limit(page.pageSize)
            .offset((page.pageNum-1)*page.pageSize)
            .toParam()
    },
    queryByID:function (id) {
        return squel.select()
            .from("note_tb")
            .from("user_tb")
            .where("note_tb.create_user_id = user_tb.user_id")
            .where("note_tb.note_id = ?",id)
            .toParam()
    },
    queryByUserID:function (id) {
        return squel.select()
            .from("note_tb")
            .where("note_tb.create_user_id = ?",id)
            .toParam()
    },
    insert:function (note) {
        var now=new Date().Format("yyyy-MM-dd hh:mm:ss");
        return squel.insert()
            .into("note_tb")
            .set("note_title", note.title)
            .set("note_content", note.content)
            .set("create_date", now)
            .set("update_date", now)
            .set("create_user_id", note.userID)
            .toParam();
    },
    update:function (note) {
        var now=new Date().Format("yyyy-MM-dd hh:mm:ss");
        return squel.update()
            .table("note_tb")
            .set("note_title", note.title)
            .set("note_content", note.content)
            .set("update_date", now)
            .where("note_tb.note_id = ?",note.noteID)
            .toParam()
    },
    delete:function (note) {
        return squel.delete()
            .from("note_tb")
            .where("note_tb.note_id = ?",note.noteID)
            .toParam()
    }
}
