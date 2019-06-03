//登录
$(".login").children("a").hover(function(){
    $(this).css({
        borderLeft:"1px solid #ccc",
        borderRight:"1px solid #ccc"
    }).siblings("ul").show();   
},function(){
    $(this).css({
        border:0
    }).siblings("ul").hide();
})
//我的邦购
$(".order").children("a").hover(function(){
    $(this).css({
        border:"1px solid #ccc",
        borderBottom:0
    }).siblings("ul").show();   
},function(){
    $(this).css({
        border:0
    }).siblings("ul").hide();
})
//下载APP
$(".download").children("a").hover(function(){
    $(this).siblings(".imgbox").show()

},function(){
    $(this).siblings(".imgbox").hide()
})
//微信
$(".wechat").children("span").hover(function(){
    $(this).siblings(".imgbox").show();
},function(){
    $(this).siblings(".imgbox").hide();
})

$("#txt").focus(function(){
    $(this).attr("placeholder","");
}).blur(function(){
    $(this).attr("placeholder","带上六一装扮 第二件半价");
})
//nav
    $(".new_category_list").children("li").mouseover(function(){
        $(this).children(".category_hover_wrap").css({
            display:"flex"
        });
    }).mouseout(function(){
        $(this).children(".category_hover_wrap").css({
            display:"none"
        });
    })
    
    $("img").hover(function(){
        $(this).css({
             opacity:.8
         })
     },function(){
         $("img").css({
             opacity:1
         })
     })

