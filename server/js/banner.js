   class Banner{
        constructor(){     
            this.img=$("#banner").children(".imgbox").children("a");
            this.left=$("#banner .left");
            this.right=$("#banner .right");
            this.li=$("#banner .list").children("li");
            this.index=0;
            this.iprev=this.img.length-1;
            this.init();
            this.autoPlay();
        }
        init(){   
            var that=this;
            this.left.click(function(){
                that.changeIndex("l");
            })
            this.right.click(function(){
                that.changeIndex("r")
            }) 
            this.li.mouseover(function(){
                if($(this).index()>that.index){
                     that.moveList(1,that.index,$(this).index())
                }
                if($(this).index()<that.index){
                     that.moveList(-1,that.index,$(this).index())
                 }
                 //console.log(that.index)
                that.li.eq(that.index).css({
                   opacity:.6
                }).end().eq($(this).index()).css({
                    opacity:1
                })
                that.li.children("i").eq(that.index).css({
                    display:"none"
                 }).end().eq($(this).index()).css({
                     display:"block"
                 })
                 that.index = $(this).index();
             }) 
                  

        }
        changeIndex(type){
            if(type=="l"){
                if(this.index==0){
                    this.index=this.img.length-1;
                    this.iprev=0;
                }
                else{
                    this.index--;
                    this.iprev=this.index+1;
                }
                this.move(1);
            }
            else{
                if(this.index==this.img.length-1){
                    this.index=0;
                    this.iprev=this.img.length-1;
                }
                else{
                    this.index++;
                    this.iprev=this.index-1;
                }
                this.move(-1);
            }
        }
        move(direct){
            // console.log(this.index)
            this.img.eq(this.index).css({
                left:-this.img.eq(0).width()*direct
            })
            this.img.eq(this.index).animate({
                left:0
            })
            this.img.eq(this.iprev).css({
                left:0
            })
            this.img.eq(this.iprev).animate({
                left:this.img.eq(0).width()*direct
            })
            this.li.eq(this.iprev).css({opacity:.6}).end().eq(this.index).css({opacity:1});
            this.li.children("i").eq(this.iprev).css({display:"none"}).end().eq(this.index).css({display:"block"});
        }
        moveList(direct,iPrev,iNow){
            this.img.eq(iPrev).css({
                left:0,
            }).stop().animate({
                left:this.img.eq(0).width() * direct,
            }).end().eq(iNow).css({
                left:this.img.eq(0).width() * direct,
            }).stop().animate({
                left:0
            })
        }
        autoPlay(){
            let timer;
            var that=this;
                timer = setInterval(() => {
                    that.right.trigger("click")
                },1000);
                $("#banner").hover(function(){
                    clearInterval(timer);
                },function(){
                    timer = setInterval(() => {
                        that.right.trigger("click")
                    },1000);
                })
        }
    }
    new Banner();

   
   
