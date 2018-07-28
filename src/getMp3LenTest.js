
/*

	读取文件夹内的MP3文件，
	获取MP3信息，json形式写入文件输出到dist文件夹

*/


var homePath = './../'
var path = require("path")
//Qt 工具类
var Q = require(homePath+'utils/QtUtil.js')
var QtFile = require(homePath+'files/QtFile.js')
var file = new QtFile()

//日期输出函数
var timeFormatStr = new Date().format("yyyyMMdd-hhmmss")
var getMP3Duration = require('get-mp3-duration')


//--------------------------

var mp3FolderPath = "./../../mp3/"
//获取 全部 文件名 路径数组
var folderAllFileNameArr = file.getFolderInFolderAllFilesName(mp3FolderPath)
//
var mp3DataArr = []


init()

function init(){

	for(var i in folderAllFileNameArr){
		var mp3Name = folderAllFileNameArr[i]
		var pathObj = path.parse(mp3Name)
		if(pathObj.ext === '.mp3'){
			var buffer = file.readFileSync(mp3Name)
			var duration = getMP3Duration(buffer)
			var mp3TimeFormatStr = new Date().formatTime(duration)
			var mp3Obj = {
				fileName:pathObj.name+pathObj.ext,
				path:mp3Name,
				time:mp3TimeFormatStr,
				duration:duration
			}
			mp3DataArr.push(mp3Obj)
		}
	}

	var timeFormatStr = new Date().format("yyyyMMdd-hhmmss")
	var jsonString = JSON.stringify({data:mp3DataArr,mp3Total:mp3DataArr.length})
	var distNameStr = "dist_"+timeFormatStr+".json"
	var distPath = "./../../mynode/dist/"+distNameStr
	file.save(jsonString, distPath, ()=>{
		Q.log(jsonString)
	})
}



