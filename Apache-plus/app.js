//引入网络模块
let http = require('http');
//引入路径模块
let path = require('path');
//引入文件模块
let fs = require('fs');
//引入第三方插件
let mime =require('mime');   
//创建根目录
let rootPath = path.join(__dirname,'www');
//console.log(rootPath);
//开启服务
http.createServer((request,response)=>{
    //console.log("ksdkskd");
    
    //拼接全路径  根据请求的url 生成静态资源服务器中的绝对路径
    let filePath = path.join(rootPath,request.url);
    //console.log(request.url);
    
   // console.log(filePath);
    //判断访问的这个目录是否存在
   // console.log(fs.existsSync(filePath));
    if(fs.existsSync(filePath)){
        //读取文件
        fs.readdir(filePath,(err,files)=>{
            if(err){
                console.log('da1');
                //如果是文件 读取文件 返回
                fs.readFile(filePath,(err,data)=>{
                    if(err){
                        console.log(err);
                        
                    }else{
                        //设置mime(描述消息内容类型的因特网标准) 文件类型如:Content-Type: application/javascript 方便浏览器识别文件类型
                        //使用插件
                        response.writeHead(200,{'content-type':mime.getType(filePath)});
                        response.end(data);
                    }
                });
                
            }else{
               
                //文件夹
                //判断的是否是首页 是 读取文件 返回
                if(files.indexOf('index.html') != -1){
                    console.log(filePath);
                    fs.readFile(path.join(filePath,'index.html'),(err,data)=>{
                       
                        if(err){
                            console.log(err);
                        }else{
                            response.end(data);
                        }
                    });
                }else{
                   
                    // 不是首页 生成文件列表 
                    let backData='';
                    for(let i=0;i<files.length; i++){
                        //把数组中的元素 返回 在a标签中添加路径
                        //如果有层级的话 如;css/index.css要在路径前面加上层级
                        backData+=`<h2><a href='${request.url=='/'?'':request.url}/${files[i]}'>${files[i]}</a></h2>`;
                    }
                    response.writeHead(200,{'content-type':'text/html;charset=utf-8'});
                    response.end(backData);
                }
            }
        });
    }else{
        // 不存在 返回 404
        response.writeHead(404,{'content-type':'text/html;charset=utf-8'});
        response.end(` <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
        <html><head>
        <title>404 Not Found</title>
        </head><body>
        <h1>Not Found</h1>
        <p>The requested URL /index.hththt was not found on this server.</p>
        </body></html>`);
    }

    
}).listen(80,'127.0.0.1',()=>{
    console.log('监听 127.0.0.1:80');
    
});