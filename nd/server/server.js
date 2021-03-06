//Qt 工具类
var Q = require('./../utils/QtUtil.js')



var http = require('http')
var url = require('url')

var serverTimes = 0

function serverStart(route, handler, requestHandlers){
    var svrObj = http.createServer(function(req,res){

    	if(url.parse(req.url).path=='/favicon.ico')return

      	serverTimes++


      	//--------------------------------
      	var pathname = url.parse(req.url).pathname;
	    if(pathname=="/")	//访问表单页面
	    {
	        //日期输出函数
			var timeFormatStr = new Date().format("yyyyMMdd-hhmmss")
	        var pathname = url.parse(req.url).pathname;
	        console.log(serverTimes+' http request for '+pathname+' recieved '+timeFormatStr);
	        
	        route(handler, pathname, res, req);
	        
	        var headerObj = {
        		"Content-Type":"text/plain; charset=utf-8",
        		"Access-Control-Allow-Origin":"*"
        	}
	      	res.writeHead(200, headerObj);
	      	res.write('<h1>Node.js</h1><span>'+timeFormatStr+'</span>');  
	      	res.end("");
	    }
	    else if(pathname=="/postdata" && req.method.toLowerCase() === 'post')	//处理post方式请求
	    {
	    	
	    	route(handler, pathname, res, req);

	    }else if(pathname == "/upload" && req.method.toLowerCase() === 'post'){




			route(handler, pathname, res, req);
	        
	        	


	    }else if(pathname == "/upfile" && req.method.toLowerCase() == 'post'){




	        route(handler, pathname, res, req);
	        

	    }
	    //console.log('pathname:'+pathname);


    })

    svrObj.listen(3000,'127.0.0.1');
    





    console.log('http server start on port 3000');
}

exports.serverStart = serverStart;





