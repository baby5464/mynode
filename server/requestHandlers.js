

var querystring = require('querystring')


function start(){
	
  console.log("request handler 'start' was called");
  
  function sleep(milliSeconds){
      var startTime = new Date().getTime();
      while(new Date().getTime() < startTime + milliSeconds)
        ;  
  }
  
  sleep(1000);
  return "hello start!";
}

function upload(res, req){

	console.log("request handler 'upload' was called");
	
	var a="";
    req.addListener("data",function(postdata){
        a+=postdata;	//接收到的表单数据字符串，这里可以用两种方法将UTF-8编码转换为中文
        //var b = querystring.parse(a);		//转换成json对象
        //var c = decodeURIComponent(a);		//对表单数据进行解码
        // console.log("-----a----");
        // console.log(a);
        // console.log("-----b----");
        // console.log(b);
        // console.log("-----c----");
        // console.log(c);
        //a = c;

    });
    req.addListener("end",function(){
    	
    	//
    	/**
		{ 	id: '0.8955058842691073',
				type: 'post',
				imageUrl: 'https://open-image.nosdn.127.net/252d0a7a4c2c4506aa9c7d6985bb0e00.jpg' }
    	*/

    	setTimeout(function(){

    		var b = querystring.parse(a);

        	var jsonString = JSON.stringify({
        		pic:b.imageUrl,
        		code:b.id
        	})

        	var headerObj = {
        		"Content-Type":"text/plain; charset=utf-8",
        		"Access-Control-Allow-Origin":"*"
        	}
            res.writeHead(200, headerObj);
            res.write(jsonString);
            res.end();

    	},100)

    	


    });
  
  return "hello upload!";
}

exports.start = start;
exports.upload = upload;