class List{
    constructor(){
        this.list=$("#list");
        this.url="http://localhost:8383/data/data.json";
        this.init();
    }
    init(){
        var that=this;
        $.ajax({
           url:this.url,
           success:function(res) {
              //console.log(res);
                that.res=res;
                that.display();
           }
        })
    }
    display(){
        var str="";
        for(var i=0;i<this.res.length;i++){
                str+=`<li class="goodslist" id=${this.res[i].id}>
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
        this.list.html(str);
    }
}
new List();