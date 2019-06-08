let gulp = require("gulp");

let connect = require("gulp-connect");

let proxy = require('http-proxy-middleware');

let concat = require("gulp-concat");
let uglify = require("gulp-uglify");
let rename = require("gulp-rename");

let babel = require("gulp-babel");

let sass = require("gulp-sass");


// gulp.task()用来定义指令

// 开发环境：src文件夹
// 上线环境：server文件夹

// 为了方便测试，每次在开发环境中创建一个文件，修改一个文件，会自动转存到上线环境

// gulp.src()根据路径获取文件
// .pipe()连缀方法
// gulp.dest()转存到指定目录，目录不存在，会创建

gulp.task("index",()=>{
    // 找到文件
    gulp.src(["src/**/*","!src/sass/*"])
    // 转存
    .pipe(gulp.dest("server"))
    // 当index文件发生转存时，刷新服务器
    .pipe(connect.reload())
})

// gulp.watch()开启监听，监听对应文件（多个）变化，执行指定的指令（多个）
gulp.task("watch",()=>{
    gulp.watch(["src/index.html","src/sass/**/*"],["index","sass"])
})


gulp.task("server",()=>{
    connect.server({
        root:"server",   //以哪个文件夹为服务器
        port:8383,       //端口号
        livereload:true,  //是否可以自动刷新
    })
})

// 批量执行:同时执行监听和服务
gulp.task("qwe",["watch","server"]);

// 合并转存压缩改名转存
gulp.task("hygz",()=>{
    // 找到所有js
    gulp.src("src/js/*.js")
    // 合并js，并起名
    .pipe(concat("index.js"))
    .pipe(babel())
    // 转存合并之后的文件
    .pipe(gulp.dest("server/js"))
    // 压缩文件
    .pipe(uglify())
    // 改名文件
    .pipe(rename("index.min.js"))
    // 转存文件
    .pipe(gulp.dest("server/js"))
})

// ES6转ES5
gulp.task("es6toes5",()=>{
    gulp.src("src/js/*.js")
    .pipe(babel())
    .pipe(gulp.dest("server/js"))
})


gulp.task("sass",()=>{
    gulp.src("src/sass/**/*")
    .pipe(sass().on("error",sass.logError))
    .pipe(gulp.dest("server/css"))
})
