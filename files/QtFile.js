/*

使用方法

var iconv = require('iconv-lite');
var QtFile = require('./../files/QtFile.js');
var file = new QtFile();
var bufferdata = file.readFileSync("./../dist/q.txt");
var data = iconv.decode(Buffer.from(bufferdata), 'GBK');
Q.log(data);


*/
class QtFile
{
	//var fs = null;
	

	constructor(){
		
	}
	
	toString(){
		return "this is QtFile Class"
	}
	
	//显示当前路径
	static showCurrentPath(){
		return process.cwd()
	}
		
	//显示node路径
	static showCurrentNodePath(){
		return process.execPath;
	}


	//


	//read file
	readFile(path, callback){
		var fs = require('fs');
		fs.readFile(path, (error, data) => {
			callback(error,data)
		})
	}

	readFileSync(path){
		var fs = require('fs');
		return fs.readFileSync(path);
	}
	
	//check file is file or folder
	exist(path) {
		try{
			var fs = require('fs'); 
			fs.accessSync(path,fs.F_OK);
		}catch(e){
			return false;
		}
		return true;
	}
	
	//read folder
	readFolder(path) {
		var _this = this
		var fs = require('fs')
	    var files = fs.readdirSync(path) //需要用到同步读取 
	    files.forEach(eachFolder)

	    function eachFolder(fileName){
	    	
	    	var states = fs.statSync(path + '/' + fileName)
	    	if (states.isDirectory()) {
	            
	    		_this.readFolder(path + '/' + fileName)
	    		
	        }else{

	        	_this.readFile(path + '/' + fileName, (error, data) => {
					
					//console.log(path + '/' + fileName)
					
					var obj = new Object()
		            obj.size = states.size//文件大小，以字节为单位 
		            obj.name = fileName;//文件名 
		            obj.path = path + '/' + fileName //文件绝对路径 
		            //filesList.push(obj);
		            console.log(obj)

		            //_this.writeFile(fileName,data)

				})

	        }
	    
	    }

	    
	}

	//写入文件utf-8格式 
	//_this.writeFile(fileName,data)
	writeFile(fileName, data) {
		var fs = require('fs')
	    fs.writeFile(fileName, data, 'utf-8', complete);
	    function complete() {
	        console.log(fileName+"-文件生成成功");
	    }
	}




	//save file to path

	save(__fileContent,__path,__callBackFun){

		

		var path = require('path');
		var fs = require('fs'); 

		//获取路径：path.dirname(__path)
		//获取文件名：path.basename(__path)
		//获取扩展名：path.extname(__path)
		//console.log( path.dirname(__path) );
		//console.log( __path );
		//
		

		var fileFolderName = path.dirname(__path);
		var fileName = path.basename(__path);
		var siff = path.extname(__path);
		//----------------------------------------
		//var stat = fs.Stats(fileFolderName+ '\\' +fileName);
		//console.log(fileFolderName+ '\\' +fileName)

		
		//console.log("is exist:"+this.exist(__path))
		//console.log(stat.isDirectory())
		//console.log(this.exist(path.dirname(__path)));
		//true为文件夹
		//console.log(path.dirname(__path))	
		//console.log(__path);
		//fs.mkdirSync(path.dirname(__path));
		//fs.mkdirSync(fileFolderName);
		//return;

		if (this.exist(__path)) {
			//如果存在，清空文件夹
				

		} else {
			//如果不存在，创建文件夹
			
			//fs.mkdirSync(path.dirname(__path));

		}
		
		//
		fs.writeFile(
			__path,
			__fileContent,
			function (err) {
				//
				if (err) throw err ;
				//
				__callBackFun();
				//
				console.log("[save file]:"+__path);
			}
		);
	}

	
	
	

}
//QtFile.dir = __dirname;
module.exports = QtFile;
