class Register{
    constructor(){
        this.user = $("#user");
        this.pass =$("#pass");
        this.pass2 =$("#pass2");
        this.btn = $("#btn");
        this.msg = $(".msg");
        this.init(); 
        
    }
    init(){
        var userOnoff=0;
        var passOnoff=0;
        var pOnoff=0;
        var that=this;
        this.user.blur(function(){
            var reg=/^[\u2E80-\u9FFF\w-]{4,20}$/;
            if(reg.test($(this).val())){
                $(this).next().html("正确");
                    userOnoff=1;
            }
            else{
                $(this).next().html("不正确");
                   userOnoff=0;
            }
        })
        this.pass.blur(function(){
            var a=0;
            var b=0;
            var c=0;
            var lengthReg=/^.{6,18}$/;
            if(!lengthReg.test($(this).val())){
                $(this).next().html("长度不符");
                    passOnoff=0;
                return;
            }
            var numReg=/\d/;
            if(numReg.test($(this).val())){
                a=1;
            }
            var azReg=/[a-zA-Z]/;
            if(azReg.test($(this).val())){
                b=1;
            }
            var tsReg=/[\W_]/;
            if(tsReg.test($(this).val())){
                c=1;
            }
            switch(a+b+c){
                case 1:$(this).next().html("简单");break;
                case 2:$(this).next().html("一般");break;
                case 3:$(this).next().html("复杂");break;
            }
                passOnoff=1;
            if($("#pass2").val()!=""){
                if($("#pass2").val()===$(this).val()){
                    $("#pass2").next().html("一致");
                        passOnoff=1;
                }
                else{
                    $("#pass2").next().html("不一致");
                    passOnoff=0;
                }
            }
        })
        this.pass2.blur(function(){
            if($(this).val()===that.pass.val()){
                $(this).next().html("一致");
                    pOnoff=1;
            }
            else{
                $(this).next().html("不一致");
                    pOnoff=0;
            }
        })
        this.btn.click(function(){
            if(userOnoff&&passOnoff&&pOnoff){
                that.getUserMsg();
                 // 先获取指定的localStorage，用来判断是否是第一次注册
                 console.log("注册成功")
            }
            else{
                console.log(userOnoff);
                console.log(passOnoff);
                console.log(pOnoff);
                that.msg.html("注册失败");
            }
        })
        
    }
    getUserMsg(){
        this.usermsg = localStorage.getItem("usermsg");
        console.log(this.usermsg);
        // 开始判断是否是第一次
        this.setUserMsg()
    }
    setUserMsg(){
        // localStorage中的数据的格式为:[{user:"admin",pass:1234,onoff:0},{user:"admin",pass:1234,onoff:0}]
        // 如果是第一次，直接注册，如果不是第一次要判断是否重名
        if(this.usermsg == null){
            // 第一次
            this.usermsg = [{
                user:this.user.val(),
                pass:this.pass.val(),
                onoff:0
            }]
            this.msg.html("");
        }
        else{
            // 不是第一次:获取的同时，转成数组，然后开始判断是否重名
            this.usermsg = JSON.parse(localStorage.getItem("usermsg"));
            for(var i=0;i<this.usermsg.length;i++){
                if(this.usermsg[i].user == this.user.val()){
                    this.msg.html("重名");
                    return;
                }
            }
            this.msg.html("");
            this.usermsg.push({
                user:this.user.val(),
                pass:this.pass.val(),
                onoff:0
            })
        }
        localStorage.setItem("usermsg",JSON.stringify(this.usermsg))
    }
}

new Register;