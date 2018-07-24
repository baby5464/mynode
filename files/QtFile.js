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
	




	/*
	
	遍历获取文件夹内，全部文件夹名称

	参数：
	path:路径

	return 获取文件夹路径，总数组
	example:
		
		[ './../../mp3//张信哲2010年新歌/qiter-folder',
		  './../../mp3//张信哲2010年新歌/qt-soft/msoutlook',
		  './../../mp3//张信哲2010年新歌/qt-soft/qiter-folder',
		  './../../mp3//张信哲2010年新歌/qt-soft',
		  './../../mp3//张信哲2010年新歌' ]
	
	*/

	getFolderTotal(path){
		var _this = this
		if (!this.exist(path)) {
			//空文件夹
			console.log("[===Not find file or folder====]\n"+path)
			return
		}
		var folderListNameArr = []
		eachFolderHandler(path)
		function eachFolderHandler(path){
			if (!_this.exist(path)) {
				console.log("[===Not find file or folder====]\n"+path)
				return
			}
			var fs = require('fs')
		    var files = fs.readdirSync(path)
		    files.forEach(eachFolder)
		    function eachFolder(fileName){
		    	var pathStr = path + '/' + fileName
		    	var states = fs.statSync(pathStr)
		    	if (states.isDirectory()) {
		            eachFolderHandler(pathStr)
		            folderListNameArr.push(pathStr)
		        }
		    }
		}
		return folderListNameArr
	}



	/*
	
	功能: 遍历当前文件夹所有文件

	return 数组（文件夹中所有文件名，保存在数组中）
	
	*/
	readFolderAllFilesName(path) {

		var _this = this
		if (!this.exist(path)) {
			//空文件夹
			console.log("[===Not find file or folder====]\n"+path)
			return
		}

		var fileNameArr = []

		var fs = require('fs')
	    var files = fs.readdirSync(path)

	    var fileTotal = files.length

	    //console.log("fileTotal-----:"+fileTotal)

	    files.forEach(eachFolder)
	    //
	    function eachFolder(fileName){
	    	var pathStr = path + '/' + fileName
	    	var states = fs.statSync(pathStr)
	    	if (states.isDirectory()) {
	            //folderTotal++
	    		//_this.readFolder(pathStr)
	        }else{

	        	if (typeof pathStr === 'string'){
	        		fileNameArr.push(pathStr)
	        	}


	   //      	_this.readFile(pathStr, (error, data) => {
					
					

				// 	var obj = {}
		  //           obj.size = states.size
		  //           obj.name = fileName
		  //           obj.path = pathStr

		  //           console.log(fileListArr.length+"---"+fileName)

		  //           //_this.writeFile(fileName,data)


		  //           fileListArr.push(obj)

		  //           //console.log("fileCurrent:"+fileListArr.length)
		            


				// })

	        }
	    
	    }//end eachFolder
	    //


	    return fileNameArr

	    
	}



	/**
	* 

	用途: 遍历获取 文件夹中全部文件（包括二级文件夹中的文件）
	
	return: 全部文件名数组

	*
	*/

	getFolderAllFilesName ( pathUrl ) {
		var _this = this
		if (!this.exist(pathUrl)) {
			//空文件夹
			console.log("[===Not find file or folder====]\n"+pathUrl)
			return
		}
		var fileListNameArr = []
		var path = require("path")
		var filesArr = this.readFolderAllFilesName(pathUrl)
		for( var i in filesArr){
			var filePath = filesArr[i]
			if (typeof filePath === 'string'){

				var pathObj = path.parse(filePath)
				
				if(pathObj.ext === '.mp3'){
					var fileData = _this.readFileSync(filePath)
					//console.log(pathObj.base)

					// fileData.forEach(eachFolder)
				 //    //
				 //    function eachFolder(fileName){
				 //    	//var pathStr = path + '/' + fileName
				 //    	var states = fileData.statSync(filePath)
				 //    	console.log(states)
				 //    }
					
					fileListNameArr.push(filePath)

				}

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
