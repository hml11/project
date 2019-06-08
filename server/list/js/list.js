class List{
    constructor(){
        this.list=$("#list");
        this.pagecont=$("#Pagination");
        this.url="http://localhost:8383/data/data.json";
        this.num=12;
        this.index=0;
        this.init();
    }
    init(){
        var that=this;
        $.ajax({
           url:this.url,
           success:function(res) {
              //console.log(res);
                that.res=res;
                that.page();
           }
        })
    }
    page(){
        var that=this;
        // console.log(this.pagecont);
        // console.log(this.list);
         this.pagecont.pagination(this.res.length,{
             items_per_page:this.num,
             prev_text:"上一页",
             next_text:"下一页",
             callback:function(index){
                that.index=index;
                that.display();
                that.link();
                //console.log(index);
             }
         })
         
     }
        link(){
            this.list.on("click",".goodslist",function(){
                var goodsId=$(this).attr("id");
                location.href="http://localhost:8383/details/details.html?shangpin="+goodsId;
            })
        }
        display(){
           // console.log(1);
           var that=this;
            var str="";
            //this.index*this.num---this.index*this.display.num+this.num;
            for(var i=this.index*this.num;i<this.index*this.num+this.num;i++){
                if(i<this.res.length){
                    //console.log(i);
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
            }
            //console.log(str);
            //console.log(this.list);
            this.list.html(str);
            for(var i=0;i<$("label").length;i++){
                if($("label").eq(i).html()==""){
                    $("label").eq(i).css({
                        border:0,
                        background:"none"
                    })
                }
            }
            this.setOpacity();
        }
        setOpacity(){
            $("#list img").hover(function(){
                $(this).css({
                    opacity:.6
                })
            },function(){
                $(this).css({
                    opacity:1
                })
            })
        }
    
        
}
new List();