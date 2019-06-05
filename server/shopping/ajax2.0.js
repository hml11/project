function ajax(options){
    //1.处理参数
    var type=options.type?options.type:"get";
    var data=options.data?options.data:{};
    var str="";
    for(var i in data){
        str+=`${i}=${data[i]}&`;
    }
    if(type=="jsonp"){
        options.url=options.url+"?"+str.slice(0,str.length-1);
        //1.script标签
        var script=document.createElement("script");
        script.src=options.url;
        document.body.appendChild(script);
        //2.函数
        window[data[data.cloumnName]]=function(res){
            options.success(res);
        }
        return;
    }
    var d=new Date();
    var ajax=new XMLHttpRequest();
    if(type=="get"){
        options.url=options.url+"?"+str+d.getTime();
        ajax.open(type,options.url,true);
        str="";
    }
    else if(type=="post"){
        ajax.open(type,options.url,true);
        str=str.slice(0,str.length-1);
        ajax.setRequestHeader("Content-Tyspe","application/x-www-form-urlencoded");
    }
    
    ajax.onreadystatechange=function(){
        if(ajax.readyState==4&&ajax.status==200){
           options.success(ajax.responseText);
        }
    }
    ajax.send(str);
}