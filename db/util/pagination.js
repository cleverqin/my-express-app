var util=require('./util')
module.exports ={
    createLinks:function (total_rows,per_page,per_pages,base_url) {
        var query_string_segment 	= 'pageNum';
        var base_url			=  util.trim(base_url)+query_string_segment+'='; 		// 定义路径
        var total_rows			=  total_rows; 	//数据库返回博客总数量数据
        var per_page			=  per_page; 		//每页显示文章数目
        var num_links			=  4;//定义大于num_links时显示第一页和最后一页
        var use_page_numbers		= parseInt(per_pages); 	// 当前所就收的页码
        var first_link			= '首页';
        var next_link			= '下一页';
        var prev_link			= '上一页';
        var last_link			= '尾页';
        var full_tag_open		= '<div class="pagination pagination-centered"><ul class="pagination pagination-lg">';
        var full_tag_close		= '</ul></div>';
        var first_tag_open		= '<li class="prev page">';
        var first_tag_close		= '</li>';
        var last_tag_open		= '<li class="next page">';
        var last_tag_close		= '</li>';
        var cur_tag_open		= '<li class="active"><a href="">';
        var cur_tag_close		= '</a></li>';
        var next_tag_open		= '<li class="next page">';
        var next_tag_close		= '</li>';
        var prev_tag_open		= '<li class="prev page">';
        var prev_tag_close		= '</li>';
        var num_tag_open		= '<li class="page">';
        var num_tag_close		= '</li>';
        var display_pages		= 'TRUE';
        var display_next_pages		= 'FALSE';
        var display_last_pages		= 'FALSE';
        var display_prev_pages		= 'FALSE';
        var display_first_pages		= 'FALSE';	//FALSE
        var start,
            end,
            i,
            output = '',// 编辑分页插件
            cache_page,//缓存当前页码
            first_url,
            base_page = 1,
            num_pages = parseInt(Math.ceil(total_rows / per_page));//定义总的页数,Math.ceil()向上取整,有小数就整数部分加1;num_pages是页数
        if (use_page_numbers) {
            cache_page = use_page_numbers;
            if ( isNaN(cache_page)) {//如果缓存的页码不是数字则定义缓存页码为１
                cache_page = base_page;
            };
            if (cache_page > num_pages) {//如果缓存的页码大于总的页数
                cache_page = num_pages;
            }
        }else {
            cache_page = num_pages;//接收不到所在页码use_page_numbers时，则设定缓存页码为最后一张页数
        }
        var output_string = {
            first_pages_onclick: function(a,b,c,d){
                return a+'<a '+'href="'+b+'">'+c+'</a>'+d;
            },
            first_pages_no_onclick: function(a,b,c){
                return a+'<a style="background-color: #428bca;color: #fff;border-color: #428bca;">'+b+'</a>'+c;
            },
            prev_pages_onclick: function(prev_tag_open,base_url,prev_link,prev_tag_close,cache_page){
                var i = ((cache_page - 1) == 0) ? '' : (cache_page - 1);
                return prev_tag_open+'<a '+'href="'+base_url+i+'">'+prev_link+'</a>'+prev_tag_close;
            },
            prev_pages_no_onclick: function(prev_tag_open,prev_link,prev_tag_close){
                return prev_tag_open+'<a style="background-color: #428bca;color: #fff;border-color: #428bca;">'+prev_link+'</a>'+prev_tag_close;
            },
            pages: function(num_tag_open,base_url,n,i,num_tag_close){
                return num_tag_open+'<a '+'href="'+base_url+n+'">'+i+'</a>'+num_tag_close;
            },
            next_pages_onclick: function(next_tag_open,base_url,next_link,next_tag_close,cache_page){
                return next_tag_open+'<a '+'href="'+base_url+(cache_page + 1)+'">'+next_link+'</a>'+next_tag_close;
            },
            next_pages_no_onclick: function(next_tag_open,next_link,next_tag_close){
                return next_tag_open+'<a style="background-color: #428bca;color: #fff;border-color: #428bca;">'+next_link+'</a>'+next_tag_close;
            },
            last_pages_onclick: function(last_tag_open,base_url,last_link,last_tag_close,num_pages){
                return last_tag_open+'<a '+'href="'+base_url+num_pages+'">'+last_link+'</a>'+last_tag_close;
            },
            last_pages_no_onclick: function(last_tag_open,last_link,last_tag_close){
                return last_tag_open+'<a style="background-color: #428bca;color: #fff;border-color: #428bca;">'+last_link+'</a>'+last_tag_close;
            },
        };
        // definition "First" link　定义第一页
        if (display_first_pages !== 'TRUE') {
            if  ( first_link  && cache_page > num_links) {//当存在第一页标识且页数大于设定的num_links时，显示第一页
                first_url = (first_url == undefined ) ? base_url+1 : '';//第一页的链接路径
                output += output_string.first_pages_onclick(first_tag_open,first_url,first_link,first_tag_close);
            }
        }else{//固定显示第一页
            first_url = (first_url == undefined ) ? base_url+1 : '';//第一页的链接路径
            if( use_page_numbers == 1){//如果是第一页则禁止点击
                output += output_string.first_pages_no_onclick(first_tag_open,first_link,first_tag_close);
            }else{
                output += output_string.first_pages_onclick(first_tag_open,first_url,first_link,first_tag_close);
            }
        }
        // definition "previous" link　定义上一页
        if (display_prev_pages !== 'TRUE') {
            if  ( prev_link  && cache_page != 1 && num_pages != 0 ) {//存在上一页且不为第一页
                output += output_string.prev_pages_onclick(prev_tag_open,base_url,prev_link,prev_tag_close,cache_page);
            }
        }else{
            if( use_page_numbers == 1){
                output += output_string.prev_pages_no_onclick(prev_tag_open,prev_link,prev_tag_close);
            }else{
                output += output_string.prev_pages_onclick(prev_tag_open,base_url,prev_link,prev_tag_close,cache_page);
            }
        }
        // definition pages　定义分页中间部分
        if (display_pages !== 'FALSE') {
            start = ((cache_page - num_links) > 0) ? cache_page - (num_links - 1) : 1;
            end   = ((cache_page + num_links) < num_pages) ? cache_page + num_links : num_pages;
            for (i = start -1; i <= end; i++) {
                if (i >= base_page && num_pages != 1) {
                    if (cache_page == i) {//缓存的页码等于i，即当前选中的页码
                        output += cur_tag_open+i+cur_tag_close;
                    }else {
                        n = (i == base_page) ? 1 : i;
                        if( (use_page_numbers <= 3) || ( use_page_numbers +3 > num_pages )) {
                            var cache1 = (( (use_page_numbers +3> num_pages )&&(use_page_numbers +2 <= num_pages)&&(use_page_numbers > 3) ) ? use_page_numbers : '');
                            var cache2 = (( (use_page_numbers +2> num_pages )&&(use_page_numbers +1<= num_pages )&&(use_page_numbers > 3)) ? use_page_numbers : '');
                            var cache3 = (( (use_page_numbers +1> num_pages )&&(use_page_numbers <= num_pages )&&(use_page_numbers > 3)) ? use_page_numbers : '');
                            switch( use_page_numbers ){
                                case 1:if( n >= use_page_numbers && n <= (use_page_numbers + 3) ){
                                    output += output_string.pages(num_tag_open,base_url,n,i,num_tag_close);
                                }
                                    break;
                                case 2:if( n >= (use_page_numbers-1) && n <= (use_page_numbers + 2) ){
                                    output += output_string.pages(num_tag_open,base_url,n,i,num_tag_close);
                                }
                                    break;
                                case 3:if( n >= (use_page_numbers-2) && n <= (use_page_numbers + 1) ){
                                    output += output_string.pages(num_tag_open,base_url,n,i,num_tag_close);
                                }
                                    break;
                                case cache1:if( n >= (use_page_numbers-1) && n <= (use_page_numbers + 2) ){
                                    output += output_string.pages(num_tag_open,base_url,n,i,num_tag_close);
                                }
                                    break;
                                case cache2:if( n >= (use_page_numbers-2) && n <= (use_page_numbers + 1) ){
                                    output += output_string.pages(num_tag_open,base_url,n,i,num_tag_close);
                                }
                                    break;
                                case cache3:if( n >= (use_page_numbers-3) && n <= use_page_numbers ){
                                    output += output_string.pages(num_tag_open,base_url,n,i,num_tag_close);
                                }
                                    break;
                            }
                        }else{
                            if( n >= (use_page_numbers - 2) && n <=(use_page_numbers + 1) ){
                                output += output_string.pages(num_tag_open,base_url,n,i,num_tag_close);
                            }
                        }
                    }
                }
            }
        }
        // definition "next" link　定义下一页
        if (display_next_pages !== 'TRUE') {
            if ( next_link && cache_page < num_pages) {
                output += output_string.next_pages_onclick(next_tag_open,base_url,next_link,next_tag_close,cache_page);
            }
        }else{
            if( use_page_numbers == num_pages){
                output += output_string.next_pages_no_onclick(next_tag_open,next_link,next_tag_close);
            }else{
                output += output_string.next_pages_onclick(next_tag_open,base_url,next_link,next_tag_close,cache_page);
            }
        }
        // definition "Last" link 定义最后一页链接按钮
        if (display_last_pages !== 'TRUE') {
            if ( last_link && (cache_page + num_links) <= num_pages) {
                output += output_string.last_pages_onclick(last_tag_open,base_url,last_link,last_tag_close,num_pages);
            }
        }else{
            if( use_page_numbers == num_pages){
                output += output_string.last_pages_no_onclick(last_tag_open,last_link,last_tag_close);
            }else{
                output += output_string.last_pages_onclick(last_tag_open,base_url,last_link,last_tag_close,num_pages);
            }
        }
        output = output.replace("#([^:])//+#", "\\1/");
        output = full_tag_open+output+full_tag_close;
        return output;
    }
}
