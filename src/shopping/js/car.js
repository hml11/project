class Car{
    constructor(){
        this.tbody=$("tbody");
        this.totalNum=$("tfoot").find(".totalNum");
        this.totalPrice=$("tfoot").find(".totalPrice");
        
        this.url="http://localhost:8383/data/data.json";
        this.init();
    }
    init(){
        var that=this;
        $.ajax({
           url:this.url,
           success:function(res){
            that.res=res;
            that.getcookie();
           } 
        })
    }
    getcookie(){
        //console.log($.cookie("shangpin"))
       this.goods=JSON.parse($.cookie("shangpin"));
       this.display();
    }
    display(){
        // console.log(this.res);
        // console.log(this.goods);
        var str="";
        for(var i=0;i<this.res.length;i++){
            for(var j=0;j<this.goods.length;j++){
                if(this.res[i].id==this.goods[j].id){
                    str+=`<tr index=${this.goods[j].id} align="center">
                            <td><input type="checkbox"></td>
                            <td><img src="${this.res[i].src}"/></td>
                            <td>${this.res[i].name}</td>
                            <td>${this.res[i].price}</td>
                            <td class="btn">
                                <span><input type="button" value="+" class="add"/></span>
                                <input type="text" class="goodsnumber" value="${this.goods[j].num}"/>
                                <span ><input type="button" value="-" class="reduce"/></span>
                            </td>
                            <td class="sum">${(this.goods[j].num*this.res[i].price).toFixed(2)}</td>
                            <td><span class="delete">删除</span></td>
                        </tr>`
                }
            }
        
        }
        //console.log(str);
        this.tbody.html(str);
        this.addEvent();
        // console.log(this.totalNum);
        // console.log(this.totalPrice);
        // console.log(this.goods)
        this.setTotal();
    }
    addEvent(){
        var that=this;
        this.tbody.on("click",".delete",function(){
            that.id=$(this).parent().parent().attr("index");
            $(this).parent().parent().remove();
                that.deletecookie();
                //console.log(that.id);
        })
       // console.log($(".add"));
        $(".add").on("click",function(){
                $(this).parents(".btn").children(".goodsnumber").val(parseInt($(this).parents(".btn").children(".goodsnumber").val())+1);
                that.v=parseInt($(this).parents(".btn").children(".goodsnumber").val())
                //console.log(that.v);
                that.id=$(this).parents("tr").attr("index");
                that.setcookie();
                that.display();
        })

            $(".reduce").on("click",function(){
                $(this).css({
                    background:"yellow"
                })
                if( $(this).parents(".btn").children(".goodsnumber").val()=="1"){
                    $(this).parents(".btn").children(".goodsnumber").val(1);
                }
                else{
                    $(this).parents(".btn").children(".goodsnumber").val((parseInt($(this).parents(".btn").children(".goodsnumber").val())-1));
                }
                    that.v=parseInt($(this).parents(".btn").children(".goodsnumber").val());
                    that.id=$(this).parents("tr").attr("index");

                // console.log($(this).parents("tr"));
                    that.setcookie();
                    that.display();
            })
        this.tbody.on("change",".goodsnumber",function(){
            that.id=$(this).parent().parent().attr("index");
            that.v=$(this).val();
            console.log(that.v);
            console.log("hello")
            that.setcookie();
            that.display();
        })
        
    }

    deletecookie(){
        for(var i=0;i<this.goods.length;i++){
            if(this.goods[i].id==this.id){
            this.goods.splice(i,1);
            }
        }
        $.cookie("shangpin",JSON.stringify(this.goods));
    }
    setcookie(){
        for(var i=0;i<this.goods.length;i++){
            if(this.goods[i].id==this.id){
                this.goods[i].num=this.v;
            }
        }
        $.cookie("shangpin",JSON.stringify(this.goods));
    }
    setTotal(){
        var sum=$("tbody").find(".sum");
       // console.log(sum);
       var p=0;
       for(var i=0;i<sum.length;i++){
          p+=parseFloat(sum.eq(i).html());
       }

       this.totalPrice.html("总价:"+p.toFixed(2));
       var goodsnumber=$("tbody").find(".goodsnumber");
       var n=0;
        for(var i=0;i<goodsnumber.length;i++){
           n+=parseInt(goodsnumber.eq(i).val());
        }
       
        this.totalNum.html("共"+n+"件");

    }
 }
 new Car()
