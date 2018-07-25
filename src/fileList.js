

//--------------------------------
var Promise = require('es6-promise').Promise
//转编码
var iconv = require('iconv-lite')
//Qt 工具类
var Q = require('./../utils/QtUtil.js')
//Qt文件类
var path = require("path")
var QtFile = require('./../files/QtFile.js')
var file = new QtFile()

//日期输出函数
var timeFormatStr = new Date().format("yyyyMMdd-hhmmss")
//--------------------------------

var mp3FolderPath = "./../../mp3/"
//var mp3FolderPath = "./../../mynode/"
//file.readFolder(mp3FolderPath)



//首先获取 全部文件夹路径数组
var folderListArr = file.getFolderAllFolderNameArr(mp3FolderPath)
Q.log("获取 全部文件夹路径数组")
Q.log(folderListArr)
Q.log("--------------------")




//文件夹中 全部文件
// var filesArr = file.readFolderAllFilesName(mp3FolderPath)
// for( var i in filesArr){
// 	var filePath = filesArr[i]
// 	if (typeof filePath === 'string'){
// 		var pathObj = path.parse(filePath)
		
// 		if(pathObj.ext === '.mp3'){
// 			var fileData = file.readFileSync(filePath)
// 			//Q.log(fileData)
// 			//Q.log(pathObj.base)
// 		}


// 		//Q.log(pathObj)
// 		//Q.log(fileName)
// 	}
// }

file.getFolderInFolderAllFilesName(mp3FolderPath)



//var arr = [0,0,0,3,4,5,6,7,8,9,0]

//var b = arr.unique()

//Q.log(b)






