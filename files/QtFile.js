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


	//创建文件对象


	//读取文件
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
	
	//检测文件或者文件夹存在 nodeJS
	exist(path) {
		try{
			var fs = require('fs'); 
			fs.accessSync(path,fs.F_OK);
		}catch(e){
			return false;
		}
		return true;
	}
	
	//保存文件到指定目录

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
