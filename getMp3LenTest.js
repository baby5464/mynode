
/*

	读取文件夹内的MP3文件，
	获取MP3信息，json形式写入文件输出到dist文件夹

*/


var homePath = './nd/'
var path = require("path")
//Qt 工具类
var Q = require(homePath+'utils/QtUtil.js')
var QtFile = require(homePath+'files/QtFile.js')
var file = new QtFile()

//日期输出函数
var timeFormatStr = new Date().format("yyyyMMdd-hhmmss")
var getMP3Duration = require('get-mp3-duration')


//--------------------------

var mp3FolderPath = "./../mp3/"
var mp3FolderPath = "./../mp3/dgg02/"
//var mp3FolderPath = "./../mp3/jpg/"
//获取 全部 文件名 路径数组

var folderAllFileNameArr = file.getOneFolderFilesName(mp3FolderPath)
//var folderAllFileNameArr = file.getFolderInFolderAllFilesName(mp3FolderPath)
//
var mp3DataArr = []




//init()

rename()

function init(){
	var id = 0
	for(var i in folderAllFileNameArr){
		var mp3Path = folderAllFileNameArr[i]
		var pathObj = path.parse(mp3Path)
		if(pathObj.ext === '.mp3'){

			var newPath = i
			var buffer = file.readFileSync(mp3Path)
			var duration = getMP3Duration(buffer)
			var mp3TimeFormatStr = new Date().formatMMTime(duration)
			//
			var signStr = "第一部"
			var mp3Title = pathObj.name.split(signStr)[1];
			var mp3IdStr = mp3Title.split("_")[0];
			var mp3RealTitle = mp3Title.split("_")[1];
			var mp3Obj = {
				id : id,
				bigTitle:pathObj.name.split(signStr)[0]+signStr,
				mp3Id:mp3IdStr,
				fileName:mp3RealTitle,
				ext:pathObj.ext,
				time:mp3TimeFormatStr,
				duration:duration
			}
			mp3DataArr.push(mp3Obj)
			Q.log(pathObj);


			id++
		}
	}

	var timeFormatStr = new Date().format("yyyyMMdd-hhmmss")
	var jsonString = JSON.stringify({data:mp3DataArr,mp3Total:mp3DataArr.length})
	var distNameStr = "dist_"+timeFormatStr+".json"
	var distPath = "dist/"+distNameStr

	file.save(jsonString, distPath, ()=>{
		//Q.log(jsonString)
	})
}


function rename(){


	var signStr = "(第二部)"


	for(var i in folderAllFileNameArr){
		var mp3Path = folderAllFileNameArr[i]
		var pathObj = path.parse(mp3Path)
		var ext = pathObj.ext
		var oldName = pathObj.name
		if(ext!=''){

			var newPath = i
			var buffer = file.readFileSync(mp3Path)
			var duration = getMP3Duration(buffer)
			var mp3TimeFormatStr = new Date().formatMMTime(duration)



			var timeFormatStr = new Date().format("yyyyMMdd-hhmmss")+"_"
			var newPath = pathObj.dir+"/dist/"+i+ext
			//file.copyFile(mp3Path, newPath)
			//Q.log(mp3Path)

			var mp3Title = pathObj.name.split(signStr)[1];
			var mp3Title = mp3Title.split("-")[0];
			Q.log(mp3Title)
		}
	}


	// var timeFormatStr = new Date().format("yyyyMMdd-hhmmss")
	// var jsonString = JSON.stringify({data:mp3DataArr,mp3Total:mp3DataArr.length})
	// var distNameStr = "dist_"+timeFormatStr+".json"
	// var distPath = "dist/"+distNameStr

	// file.save(jsonString, distPath, ()=>{
	// 	//Q.log(jsonString)
	// })

}
