
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
    //设置图片透明性
    $("main img").hover(function(){
        $(this).css({
             opacity:.6
         })
     },function(){
         $("img").css({
             opacity:1
         })
     })

     //登录注册
     class Index{
        constructor(){
            this.notLogin = document.querySelector(".not-login")
            this.loginS = document.querySelector(".login-success")
            this.user = document.querySelector(".login-success span")

            this.logout = document.querySelector(".logout");

            // 获取所有的用户信息
            this.init();
            // 添加注销事件
            this.addEvent();
        }
        addEvent(){
            // 点击注销时
            this.logout.onclick = ()=>{
                for(var i=0;i<this.usermsg.length;i++){
                    // 找到要注销的账号
                    if(this.name == this.usermsg[i].user){
                        // 修改当前账号的登录状态为0
                        this.usermsg[i].onoff = 0;
                        // 隐藏登录成功的信息
                        this.notLogin.style.display = "block";
                        this.loginS.style.display = "none";
                        // 再将用户的信息设置回去，实现真正的注销
                        localStorage.setItem("usermsg",JSON.stringify(this.usermsg))
                        // 结束
                        return ;
                    }
                }
            }
        }
        init(){
            // 获取所有的用户信息直接转换，方便使用
            this.usermsg = localStorage.getItem("usermsg") ? JSON.parse(localStorage.getItem("usermsg")) : [];
            // 开始验证
            this.check()
        }
        check(){
            // 拿到所有的信息
            for(var i=0;i<this.usermsg.length;i++){
                // 判断哪个用户的状态为已登录
                if(this.usermsg[i].onoff == 1){
                    // 显示登录成功的信息
                    this.notLogin.style.display = "none";
                    this.loginS.style.display = "block";
                    // 设置当前用户名
                    this.user.innerHTML = this.usermsg[i].user;
                    // 保存当前用户名，用作注销
                    this.name = this.usermsg[i].user;
                    
                    return;
                }
            }
        }
    }

    new Index;

    //楼梯效果
    $(".stairs").children("li").click(function(){
        $("html").animate({
            scrollTop:$("main").children(".margin").children("div").eq($(this).index()).offset().top
        })
    })
    //搜索栏下拉菜单
    class Search{
        constructor(){
            this.txt=$("#txt");
            this.list=$(".searchList");
            this.url="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su"
            this.index=0;
            this.onoff=0;
            this.init();
            this.addEvent();
        }
        init(){
           // console.log(this.txt)
           var that=this;
           this.txt.on("input",function(){
            $.ajax({
                url:that.url,
                data:{
                wd:that.txt.val()
                },
                success:function(res){
                that.res=res;
                that.display();
                },
                dataType:"jsonp", 
                jsonp:"cb" 
                })
           })
        
        }
        display(){
            if(this.onoff==1){
                this.list.css({
                    display:"block"
                })
            }
            var str="";
            for(var i=0;i<this.res.s.length;i++){
                str+=`<li index=${i}>
                        ${this.res.s[i]}
                        </li>`
            }
            this.list.html(str);
        }
        addEvent(){
            var that=this;
            this.list.on("click","li",function(){
                that.txt.val($(this).html());
                that.list.hide();
            })
           // console.log($(document))
           
        }
        
    }
    new Search();
    

