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
            that.res=res;
            that.display();
           }
       })
    }
    display(){
       // console.log(this.res);
       var str=""
       for(var i=0;i<this.res.length;i++){
            if(this.id==this.res[i].id){
                str+=`<div class="cont">
                            <div class="sImgbox">
                                <span></span>
                                <img class="sImg" src="${this.res[i].src}" alt="" >
                            </div>
                            <div class="bImgbox">
                                <img class="bImg" src="${this.res[i].src}" alt="">
                            </div>
                       </div>
                        <div id="goods_info"> 
                            <div class="brandname">                   
                                <a href="">${this.res[i].brandname}</a>      
                                ${this.res[i].name}
                            </div>  
                            <div class="baseinfo"> 
                                <div class="detail_price">
                                    <b>售价：</b>                 
                                    <strong>￥ ${this.res[i].price}</strong>
                                    <i>吊牌价：</i>                     
                                    <em>￥ ${this.res[i].oldprice}</em>                   <span>${this.res[i].discount}</span>
                                </div>
                                <div class="detail_rebate">
                                    <div> 本品不参加vip，svip折扣 </div>                          <div>                
                                        会员规则                 
                                        <div class="rule">       
                                            在有效期1年内：<br>                     
                                            累计购物满1000元则升级为VIP；未满1000元则降为普通会员。<br>          
                                            在有效期1年内：<br>                     
                                            累计购物满2000元则升级为SVIP；如累计购物1000~1999元，则降为VIP；
                                            如累计购物未满1000元则降为普通会员。<br>              
                                        </div>             
                                    </div>        
                                </div>
                            </div>
                            <div class="saleinfo">     
                                <div class="clipbox">         
                                    <div class="first">销量
                                        <span>1</span>
                                    </div>         
                                    <div>
                                        <i>&nbsp;</i>
                                        累计评价
                                        <span>27</span>
                                    </div>         
                                    <div>
                                        <i>&nbsp;</i>
                                        送邦购积分
                                        <span>109</span>
                                    </div>     
                                </div> 
                            </div>
                            <div class="details_colorsize">
                                <dl>
                                    <dt>
                                        颜色
                                        <b>深蓝组</b>
                                    </dt>
                                    <dd>
                                        <a href="" class="selected"><img src="" alt="">深蓝组</a>
                                    </dd>
                                    <dd>
                                        <a href=""><img src="" alt="">蔓越莓红</a>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>
                                        尺码
                                        <b>请选择尺码</b>
                                    </dt>
                                    <dd>
                                        <a href="" class="selected">S:155/80A</a>
                                    </dd>
                                    <dd>
                                        <a href="">M:160/84A</a>
                                    </dd>
                                </dl>
                            </div>

                            <div class="shoppingbag" index=${this.res[i].id}>
                                <a href="http://localhost:8383/shopping/car.html">加入购物车</a>
                            </div>

                        </div>        `
            }
       }

       $(".detailsImg").html(str);

       new Mag();
       this.addEvent();
      
    }
    addEvent(){
        var that=this;
        $(".shoppingbag").click(function(){
            //console.log("加入购物袋");
            that.id=$(this).attr("index");
            that.setCookie();
        })
    }
    setCookie(){
        this.goods=$.cookie("shangpin");
        if(this.goods){
           // console.log(this.id)
            var onoff=true;
            this.goods=JSON.parse(this.goods);
                for(var i=0;i<this.goods.length;i++){
                    if(this.goods[i].id==this.id){
                        this.goods[i].num++;
                        onoff=false;
                    }
                }
                if(onoff==true){
                    this.goods.push({id:this.id,num:1})
                }
        }
        else{
            this.goods=[{id:this.id,num:1}];   
        }
        $.cookie("shangpin",JSON.stringify(this.goods));
        $.cookie("shangpin",JSON.stringify(this.goods),{path:"/shopping"})
        //console.log(this.goods);
    }
}
new goodsDetails();


