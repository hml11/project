class  Magnifer{
    constructor(){
        this.sbox=$(".sImgbox");
        this.simg=$(".sImg");
        this.bbox=$(".bImgbox");
        this.bimg=$(".bImg");
        this.span=$(".sImgbox span")
        this.init();
    }
    init(){
        var that=this;
        this.sbox.mouseover(function(){
            that.show();
        })
        
        this.sbox.mouseout(function(){
            that.hidde();
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
        console.log(event);
    }
}

new Magnifer();