
var Promise = require('es6-promise').Promise
//转编码
var iconv = require('iconv-lite')
//uglify-js
var UglifyJs = require('uglify-js')
//clean-css
var CleanCSS = require('clean-css')
//Qt 工具类
var Q = require('../../utils/QtUtil.js')
//Qt文件类
var QtFile = require('../../files/QtFile.js')
var file = new QtFile()
//日期输出函数
var timeFormatStr = new Date().format("yyyyMMdd-hhmmss")

//=====================================

var version = "3.3.0"
var homePath = "../../../mywork/animation_show/"

var firstSummay = "cb create "+timeFormatStr
var workPath = homePath+"assets/"
var dirName = 'public_compress'
var distFileName = 'pub_cartoon_v'
var distPath = homePath+"dist/"
var resultCode = "/* "+firstSummay+" */"
var options = {
	jsListArr : [
		"js/comp/video.js",
		"js/QtUtils.js",
		"js/loading.js",
		"js/main_v3.3.js"
	],
	cssListArr :[
	    'css/cb_animation_online_view_v1.1.css'
	]
}


init(()=>{

	initCss()

})

function init(completeCallback){
	var jsFileListArr = options.jsListArr
	//
	var fileTotal = 0
	var codeString =  ""
	for(var i in jsFileListArr){
		var filePathStr = workPath+jsFileListArr[i]
		var isDir = file.isDirectory(filePathStr)
		if(!isDir){
			var fileData = getFileData(filePathStr)
			var fileData = uglifyJsFun(fileData)
			codeString += fileData

			Q.log("js-"+fileTotal+'----'+filePathStr)

			fileTotal++
		}
	}
	//
	var resultCode = "/* "+firstSummay+" */" + codeString
	var distPathStr = distPath+"/"+distFileName+version+".min.js"
	file.save(resultCode, distPathStr, ()=>{
		Q.log("完成 "+distPath)
		return completeCallback && completeCallback()
	})
}

function initCss(completeCallback){
	var cssFileListArr = options.cssListArr
	var fileTotal = 0
	var codeString =  ""
	var len = cssFileListArr.length
	for(var i=0; i<len; i++){
		var filePathStr = workPath+cssFileListArr[i]
		var isDir = file.isDirectory(filePathStr)
		if(isDir){
			var fileNameArr = file.getOneFolderFilesName(filePathStr)
			for(var j in fileNameArr){
				var filePathString = fileNameArr[j]
				var fileData = getFileData(filePathString)
				var fileData = cleanCssFun(fileData)
				codeString += fileData
				//
				Q.log("css-"+fileTotal+'----'+filePathString)
				fileTotal++
			}
		}else{
			var fileData = getFileData(filePathStr)
			var fileData = cleanCssFun(fileData)
			codeString += fileData

			Q.log("css-"+fileTotal+'----'+filePathStr)
			fileTotal++
		}
	}

	//
	var resultCodeStr = resultCode + codeString
	var distPathStr = distPath+"/"+distFileName+version+".min.css"
	file.save(resultCodeStr, distPathStr, ()=>{
		return completeCallback && completeCallback()
	})
}

// 
function getFileData(filePath){
	var bufferdata = file.readFileSync(filePath)
	var data = iconv.decode(Buffer.from(bufferdata), 'utf-8')
	return data
}

function uglifyJsFun(codeString){
	return UglifyJs.minify(codeString).code
}

function cleanCssFun(codeString){
	return new CleanCSS({}).minify(codeString).styles
}





