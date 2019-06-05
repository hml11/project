//放大镜效果
class Mag{
    constructor(){
        this.sbox=$("#details").find(".sImgbox");
        this.simg=$("#details").find(".sImg");
        this.bbox=$("#details").find(".bImgbox");
        this.bimg=$("#details").find(".bImg");
        this.span=$("#details").find(".sImgbox").find("span");
        this.init();  
    }
    init(){
        var that=this;
        this.sbox.mouseover(function(){
            that.show();
        })
        
        this.sbox.mouseout(function(){
            that.hide();
        })
        this.sbox.mousemove(function(){
            that.move();
        })
       
    }
    show(){
        this.span.css({
            display:"block"
        })
		this.bbox.css({
            display:"block"
        })
    }
    hide(){
        this.span.css({
            display:"none"
        })
		this.bbox.css({
            display:"none"
        })
    }
    move(){
        var l=event.pageX-this.sbox.offset().left-this.span.width()/2;
        var t=event.pageY-this.sbox.offset().top-this.span.height()/2;
        if(l<0){
            l=0
        }
        if(t<0){
            t=0
        }

        if(l>this.sbox.width()-this.span.width()){
            l=this.sbox.width()-this.span.width();
        }

        this.span.css({
            left:l,
            top:t
        })
        var x=this.span.position().left/(this.sbox.width()-this.span.width());
        var y=this.span.position().top/(this.sbox.height()-this.span.height());
        this.bimg.css({
            left:(this.bbox.width()-this.bimg.width())*x,
            top:(this.bbox.height()-this.bimg.height())*y
        })
    }
}
new Mag();
//商品详情页面
class goodsDetails{
    constructor(){
        this.url=window.location.search;
        this.init();
    }
    init(){
       var that=this;
       this.id=this.url.split("=")[1];
       //console.log(this.id);
       $.ajax({
           url:"http://localhost:8383/data/data.json",
           success:function(res){
            console.log(res);
           }
       })
    }
}

new goodsDetails();