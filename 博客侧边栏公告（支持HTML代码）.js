<script src="//cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>


    <script type="text/javascript" defer="defer">
// 设置公告
var news = '博客园主题Bili2.0发布啦，<a href="https://www.cnblogs.com/gshang/p/12150369.html">快来看看(点击查看)</a>';

// 设置博客信息
var myprofile = [{
    blogName: "Leesin Dong",
    blogAvatar: "https://files.cnblogs.com/files/LeesinDong/header.gif",
    blogSign: "世界上有两种最耀眼的光芒，一种是太阳，还有一种是你努力的模样。",
    blogFollow: "follow('30807ee3-3273-4cff-72df-08d619358b99')",
    QQ: "32248827",
    Github: "https://github.com/dataiyangu",
    WeChat: "https://files.cnblogs.com/files/LeesinDong/erweima.gif"
}];

// 设置首页轮播
var mybanner = [

    {
        url: "https://mp.weixin.qq.com/s/OmJdyucuQo4_4Tyjv3cM3A",
        img: "https://files.cnblogs.com/files/LeesinDong/20191021231503836.gif",
        title: "如何让自己像打王者荣耀一样发了疯、拼了命、石乐志的学习？"
    },

    {
        url: "https://mp.weixin.qq.com/s/nsbf2OItxwluJYBRGMmLTA",
        img: "https://files.cnblogs.com/files/LeesinDong/simon-abrams-k_T9Zj3SE8k-unsplash.gif",
        title: "写给程序员的n+1条建议"
    },

    {
        url: "https://mp.weixin.qq.com/s/RA7Q_UHaOUbxZ4w9bozd8Q",
        img: "https://files.cnblogs.com/files/LeesinDong/patrick-tomasso-Oaqk7qqNh_c-unsplash.gif",
        title: "你怎么睡得着的，你这个年龄段，你这个阶段，你睡得着觉?"
    },

    {
        url: "https://www.cnblogs.com/gshang/p/11185613.html",
        img: "https://files.cnblogs.com/files/LeesinDong/philippe-bout-93W0xn4961g-unsplash.gif",
        title: "每天能不能安排一个小时两个小时，看看书听听音乐，搞点像人的活动可不可以！"
    },



];

// 设置导航栏扩展

var mynav = [{
    id: "blog_nav_cnblogs",
    url: "https://home.cnblogs.com",
    title: "园子"
},
    {
        id: "blog_nav_maintain",
        url: "https://www.cnblogs.com/LeesinDong/p/12210451.html",
        title: "维护"
    },

    {
        id: "blog_nav_frieds",
        url: "https://www.cnblogs.com/LeesinDong/p/12210458.html",
        title: "友链"
    },
    {
        id: "blog_nav_theme",
        url: "javascript:changeTheme()",
        title: "切换主题"
    }
];
//loadNewsinfo(news); //公告
setFavio(myprofile); // 网页tab图像
loadThemeColor(); //导入主题颜色
extendNav(mynav); // 导航栏扩展
loadBanner(mybanner); //首页轮播
setPostSideBar(); //侧边栏目录
loadMobileContent(); //移动端目录功能栏
blankTarget(); //文章链接新窗口打开
copyCode(); //代码块复制
tableScorll(); //表格滚动
mymd(); //自定义语法
ninghtTip(); //夜间模式提醒
owoEmoji(); //owo表情插件
myscroll();
</script>














<script >
$(function () {
    //阅读全文的
    //动态添加遮罩元素，必须放在上面，否则下面的函数识别不到。
    var  value_read_more= ' <div class="readall_box" ><div class="read_more_mask"></div><a class="read_more_btn" target="_self">阅读全文</a></div>';
    $("#cnblogs_post_body"). after(value_read_more);
    //二维码验证的
    var str='<div id="QR_code_container">';
    str+=' <p id="firest">扫码关注微信公众号:Java糖果罐</p>';
    str+='<p>回复：more</p>';
    str+='<p>获得永久解锁本站全部文章二维码</p>';
    str+='<div id="input_center">';
    str+='<input id="input_text" type="text" value="">';
    str+='<input id="input_submit" type="submit" value="提交">';
    str+='</div>';
    str+='<img src="https://files.cnblogs.com/files/LeesinDong/erweima.gif"/>';
    str+='<div class="content">';
    str+='<div class="info"></div>';
    str+='</div>';
    str+='</div>';
    //$("#cnblogs_post_body").after(str);
    //$(".article_content").after(str);
    $("#cnblogs_post_body").after(str);

    var verify_code = false;
    $('#input_submit').click(function () {
        var value = $("#input_text").val();
        if (value == "301493") {
            $("#QR_code_container").css('display',"none");
            verify_code = true;
            //设置一个值为'verify_flag'的cookie,浏览器中会一直存在着,expires期限
            $.cookie('verify_flag','true',{ expires: 30});
            //点击了显示全文，且二维码校验通过
            //显示全文
            $('#cnblogs_post_body').height("").css({'overflow':'hidden'});
            $('.readall_box').show().addClass('readall_box_nobg');
            $('.readall_box').hide().addClass('readall_box_nobg');
            article_show = false;
        }else{
            $("#input_text").css('border',"1px solid red");
            $("#input_text").val("验证码错误");
            $("#input_text").css('color',"red");
            verify_code = false;
            //不显示全文
            $('#cnblogs_post_body').height(widHeight*1.5).css({'overflow':'hidden'});
            $('.readall_box').show().removeClass('readall_box_nobg');
            article_show = true;
        }
    })

    //阅读全文的js
    var widHeight = $(window).height();
    var artHeight = $('#cnblogs_post_body').height();
    if(artHeight>(widHeight*1.5)){
        $('#cnblogs_post_body').height(widHeight*1.5-285).css({'overflow':'hidden'});
        var article_show = true;
        $('.read_more_btn').on('click',bindRead_more);
    }else{
        article_show = true;
        $('.readall_box').hide().addClass('readall_box_nobg');
    }
    function bindRead_more(){
        console.log(verify_code,$.cookie('verify_flag'));
        //没有cookie的时候再出来
        if(!($.cookie('verify_flag')=="true")){
            $("#QR_code_container").css({'display':'block'});
        }else{
            $("#QR_code_container").css({'display':'true'});
            verify_code=true;
        }
        if(article_show&&(verify_code==true)){
            //点击了显示全文，且二维码校验通过
            //显示全文
            $('#cnblogs_post_body').height("").css({'overflow':'hidden'});
            $('.readall_box').show().addClass('readall_box_nobg');
            $('.readall_box').hide().addClass('readall_box_nobg');
            article_show = false;
        }else{
            //不显示全文
            $('#cnblogs_post_body').height(widHeight*1.5).css({'overflow':'hidden'});
            $('.readall_box').show().removeClass('readall_box_nobg');
            article_show = true;
        }
    }
})
</script>


