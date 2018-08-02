
var Q = require('./../utils/QtUtil.js')
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
function postdata(res, req){

    
    var a="";
    req.addListener("data",function(postdata){
        a+=postdata;    //接收到的表单数据字符串，这里可以用两种方法将UTF-8编码转换为中文
        //var b = querystring.parse(a);     //转换成json对象
        //var c = decodeURIComponent(a);        //对表单数据进行解码
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
        {   id: '0.8955058842691073',
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
  
  return "hello postdata!";
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


function upfile(res, req){

    var sizeOf = require('./../src/node_modules/image-size')
    var formidable = require('./../src/node_modules/formidable')
    var fs = require('fs')
    var http = require('http')
    var path = require('path')
    var util = require('util')
    var QtFile = require('./../files/QtFile.js')
    var file = new QtFile()

    if (req.url == '/upfile' && req.method.toLowerCase() == 'post') {

        var form = new formidable.IncomingForm();
        form.uploadDir = '/tmp';   //文件保存在系统临时目录
        form.maxFieldsSize = 10 * 1024 * 1024;  //上传文件大小限制为最大10M  
        form.keepExtensions = true;        //使用文件的原扩展名

        form.parse(req, function(err, fields, files) {

            var distPathSaveImg = "./../src/images/"
            var filesUrl = []
            var errCount = 0
            var keys = Object.keys(files)
            keys.forEach(function(key){
                var filePath = files[key].path
                var fileExt = filePath.substring(filePath.lastIndexOf('.'))
                if (('.jpg.jpeg.png.gif.mp4').indexOf(fileExt.toLowerCase()) === -1) {
                    errCount += 1
                } else {
                    //以当前时间戳对上传文件进行重命名
                    var fileName = new Date().getTime() + fileExt
                    var targetFile = path.join(distPathSaveImg, fileName)
                    //移动文件
                    fs.renameSync(filePath, targetFile)
                    

                    if(fileExt.toLowerCase()===".mp4"){

                        var ffmpeg = require('./../src/node_modules/fluent-ffmpeg');
                        var command = ffmpeg(targetFile);
                        ffmpeg(targetFile)
                          .on('filenames', function(filenames) {
                            console.log('Will generate ' + filenames.join(', '))
                          })
                          .on('end', function() {
                            console.log('Screenshots taken');
                          })
                          .screenshots({
                            // Will take screens at 20%, 40%, 60% and 80% of the video
                            count: 4,
                            folder: distPathSaveImg
                          });


                        filesUrl.push({picUrl:targetFile,fileObj:files[key],imageSize:{}})
                    }else{
                        //获取图片宽高
                        var dimensions = sizeOf(targetFile)
                        //{ width: 256, height: 256, type: 'png' }
                        // 文件的Url（相对路径）
                        filesUrl.push({picUrl:targetFile,fileObj:files[key],imageSize:dimensions})
                    }
                    

                }
            })

            var jsonString = JSON.stringify({
                pic:filesUrl[0].picUrl,
                picSize:filesUrl[0].imageSize,//{ width: 256, height: 256, type: 'png' }
                code:filesUrl[0].fileObj.size
            })

            var errorJson = JSON.stringify({
                code:"1",
                msg:"不合法"
            })

            var resultJson = ""
            if(errCount == 0){
                resultJson = jsonString
            }else{
                resultJson = errorJson
            }

            var headerInfo = {'content-type': 'text/plain',"Access-Control-Allow-Origin":"*"}
            res.writeHead(200, headerInfo)
            res.write(resultJson)
            //res.end(util.inspect({fields: fields, files: files}));
            res.end()
        });



      }
    

    return "hello upfile!";
}

exports.start = start;
exports.upload = upload;
exports.postdata = postdata;
exports.upfile = upfile;