class Product{
    constructor(){
        this.list=$(".hotsale").children("ul");
        this.mlist=$(".boys").children("dl");
        this.glist=$(".girls").children("dl");
        this.klist=$(".kids").children("dl");
        this.slist=$(".shoes").children("dl");
        this.url="http://localhost:8383/data/data.json";
        this.init();
    }
    init(){
        var that=this;
        $.ajax({
           url:this.url,
           success:function(res) {
              // console.log(res);
                that.res=res;
                that.display();
           }
        })
    }
    display(){
        //console.log(this.res);
        var str="";
        var str1=`<dt>
                    <a href="">
                        <img src="https://img.banggo.com/sources/cms/banggo2017/PC/pc_190425lc_01.jpg" alt="">
                    </a>
                </dt>`;
        var str2=`<dt>
                    <a href="">
                        <img src="https://img.banggo.com/sources/cms/banggo2017/PC/pc_190425lc_02.jpg" alt="">
                    </a>
                </dt>`;
        var str3=`<dt>
                    <a href="">
                        <img src="https://img.banggo.com/sources/cms/banggo2017/PC/pc_190425lc_03.jpg" alt="">
                    </a>
                </dt>`;
        var str4=`<dt>
                    <a href="">
                        <img src="https://img.banggo.com/sources/cms/banggo2017/PC/pc_190425lc_04.jpg" alt="">
                    </a>
                </dt>`;
        for(var i=0;i<this.res.length;i++){
            if(this.res[i].type=="hot"){
                str+=`<li class="goodslist">
                        <div class="goods_img_box">
                            <a>
                                <img class="goods_img" src="${this.res[i].src}">
                            </a>
                        </div>
                        <div class="name">
                            <label class="goodlist_discount">${this.res[i].discount}</label>
                            <a class="brand_name">${this.res[i].brandname}</a>
                            <span>
                                <a>${this.res[i].name}</a>
                            </span>
                        </div>
                        <div class="price">
                            <b>￥${this.res[i].price}</b>
                            <i>￥${this.res[i].oldprice}</i>
                        </div>
                    </li>`
            }  
            if(this.res[i].type=="m"){
                str1+=`<dd class="goodslist">
                            <div class="goods_img_box">
                                <a>
                                    <img class="goods_img" src="${this.res[i].src}">
                                </a>
                            </div>
                            <div class="name">
                                <label class="goodlist_discount">${this.res[i].discount}</label>
                                <a class="brand_name">${this.res[i].brandname}</a>
                                <span>
                                    <a>${this.res[i].name}</a>
                                </span>
                            </div>
                            <div class="price">
                                <b>￥${this.res[i].price}</b>
                                <i>￥${this.res[i].oldprice}</i>
                            </div>
                        </dd>`
            }  
            if(this.res[i].type=="w"){
                str2+=`<dd class="goodslist">
                            <div class="goods_img_box">
                                <a>
                                    <img class="goods_img" src="${this.res[i].src}">
                                </a>
                            </div>
                            <div class="name">
                                <label class="goodlist_discount">${this.res[i].discount}</label>
                                <a class="brand_name">${this.res[i].brandname}</a>
                                <span>
                                    <a>${this.res[i].name}</a>
                                </span>
                            </div>
                            <div class="price">
                                <b>￥${this.res[i].price}</b>
                                <i>￥${this.res[i].oldprice}</i>
                            </div>
                        </dd>`
            }  
            if(this.res[i].type=="kid"){
                str3+=`<dd class="goodslist">
                            <div class="goods_img_box">
                                <a>
                                    <img class="goods_img" src="${this.res[i].src}">
                                </a>
                            </div>
                            <div class="name">
                                <label class="goodlist_discount">${this.res[i].discount}</label>
                                <a class="brand_name">${this.res[i].brandname}</a>
                                <span>
                                    <a>${this.res[i].name}</a>
                                </span>
                            </div>
                            <div class="price">
                                <b>￥${this.res[i].price}</b>
                                <i>￥${this.res[i].oldprice}</i>
                            </div>
                        </dd>`
            }  
            if(this.res[i].type=="shoes"){
                str4+=`<dd class="goodslist">
                            <div class="goods_img_box">
                                <a>
                                    <img class="goods_img" src="${this.res[i].src}">
                                </a>
                            </div>
                            <div class="name">
                                <label class="goodlist_discount">${this.res[i].discount}</label>
                                <a class="brand_name">${this.res[i].brandname}</a>
                                <span>
                                    <a>${this.res[i].name}</a>
                                </span>
                            </div>
                            <div class="price">
                                <b>￥${this.res[i].price}</b>
                                <i>￥${this.res[i].oldprice}</i>
                            </div>
                        </dd>`
            }     
        }
       
        this.list.html(str);
        this.mlist.html(str1);
        this.glist.html(str2);
        this.klist.html(str3);
        this.slist.html(str4);
        for(var i=0;i<$("label").length;i++){
            if($("label").eq(i).html()==""){
                $("label").eq(i).css({
                    border:0,
                    background:"none"
                })
            }
        }
        $("img").hover(function(){
           $(this).css({
                opacity:.8
            })
        },function(){
            $("img").css({
                opacity:1
            })
        })
      
    }
}

new Product();