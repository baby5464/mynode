
/*

	读取文件夹内的MP3文件，
	获取MP3信息，json形式写入文件输出到dist文件夹

*/


var homePath = './nd/'
var path = require("path")
//Qt 工具类
var iconv = require('iconv-lite');
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

//init2()

init3()

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


function init2(){

	var id = 0
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
			file.copyFile(mp3Path, newPath)
			//Q.log(mp3Path)

			var mp3Title = pathObj.name.split(signStr)[1]
			var mp3Title = mp3Title.split("-")[0]
			var mp3IdStr = mp3Title.split("_")[0]
			var mp3RealTitle = mp3Title.split("_")[1]
			Q.log(mp3Title)



			var mp3Obj = {
				id : id,
				bigTitle:pathObj.name.split(signStr)[0].substring(9)+signStr,
				mp3Id:mp3IdStr,
				fileName:mp3RealTitle,
				ext:pathObj.ext,
				time:mp3TimeFormatStr,
				duration:duration
			}
			mp3DataArr.push(mp3Obj)

			id++
		}
	}

	Q.log(mp3DataArr)

	var timeFormatStr = new Date().format("yyyyMMdd-hhmmss")
	var jsonString = JSON.stringify({data:mp3DataArr,mp3Total:mp3DataArr.length})
	var distNameStr = "dist_"+timeFormatStr+".json"
	var distPath = "dist/"+distNameStr

	file.save(jsonString, distPath, ()=>{
		//Q.log(jsonString)
	})

}


function init3(){

	//读取目录列表
	/*
	var bufferdata = file.readFileSync("./../mp3/list.txt")
	var data = iconv.decode(Buffer.from(bufferdata), 'UTF8')
	var dataArr = data.split("\n")
	var titleArr = []
	for(var i in dataArr){
		var title = dataArr[i]
		if(title!=""){
			titleArr.push(title)
		}
	}
	//Q.log(titleArr)
	*/
	var titleResultArr = [ '清十二帝疑案01_努尔哈赤',
						  '清十二帝疑案02_皇太极',
						  '清十二帝疑案03_顺治（上）',
						  '清十二帝画像 清十二帝画像图册 清十二帝疑案04_顺治（下）',
						  '清十二帝疑案05_康熙（上）',
						  '清十二帝疑案06_康熙（下）',
						  '清十二帝疑案07_雍正（上）',
						  '清十二帝疑案08_雍正（下）',
						  '清十二帝疑案09_乾隆（上）',
						  '清十二帝疑案10_乾隆（下）',
						  '清十二帝疑案11_嘉庆（上）',
						  '清十二帝疑案12_嘉庆（下）',
						  '清十二帝疑案13_道光（上）',
						  '清十二帝疑案14_道光（下）',
						  '清十二帝疑案15_咸丰（上）',
						  '清十二帝疑案16_咸丰（下）',
						  '清十二帝疑案17_同治（上）',
						  '清十二帝疑案18_同治（中）',
						  '清十二帝疑案19_同治（下）',
						  '清十二帝疑案20_光绪（上）',
						  '清十二帝疑案21_光绪（中）',
						  '清十二帝疑案22_光绪（下）',
						  '清十二帝疑案23_宣统',
						  '清十二帝疑案24_总说（一）',
						  '清十二帝疑案25_总说（二)',
						  '清十二帝疑案26_总说（三）',
						  '清十二帝疑案27_总说（四）',
						  '清十二帝疑案28_努尔哈赤（续上）',
						  '清十二帝疑案29_努尔哈赤（续下）',
						  '清十二帝疑案30_皇太极（续上）',
						  '清十二帝疑案31_皇太极（续下）',
						  '清十二帝疑案32_答疑（一）_清初宫廷斗争',
						  '清十二帝疑案33_答疑（二）_正说洪承畴降清',
						  '清十二帝疑案34_答疑（三）_清朝皇帝的称谓',
						  '清十二帝疑案35_答疑（四）_清朝皇帝的后宫',
						  '清十二帝疑案36_答疑（五）_皇帝之死与太监命运',
						  '清十二帝疑案37_答疑（六）_清朝兴盛的历史宝鉴' ]
	//Q.log(titleResultArr)
	var mp3FolderPath = "./../mp3/yian/"
	//获取 全部 文件名 路径数组
	var folderAllFileNameArr = file.getOneFolderFilesName(mp3FolderPath)
	var len = folderAllFileNameArr.length
	for(var i=0;i<len;i++){
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
			//Q.log(mp3Path)
			//Q.log(newPath)

			file.copyFile(mp3Path, newPath)



			var mp3Obj = {
				id : i,
				bigTitle:titleResultArr[i],
				mp3Id:i,
				fileName:i,
				ext:pathObj.ext,
				time:mp3TimeFormatStr,
				duration:duration
			}
			mp3DataArr.push(mp3Obj)


		}
	}

	Q.log(mp3DataArr)

	var timeFormatStr = new Date().format("yyyyMMdd-hhmmss")
	var jsonString = JSON.stringify({data:mp3DataArr,mp3Total:mp3DataArr.length})
	var distNameStr = "dist_"+timeFormatStr+".json"
	var distPath = "dist/"+distNameStr

	file.save(jsonString, distPath, ()=>{
		//Q.log(jsonString)
	})

	
}	