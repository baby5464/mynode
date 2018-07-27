
var Promise = require('es6-promise').Promise
//转编码
var iconv = require('iconv-lite')

//uglify-js
var UglifyJs = require('uglify-js')

//Qt 工具类
var Q = require('./../utils/QtUtil.js')
//Qt文件类
var QtFile = require('./../files/QtFile.js')
var file = new QtFile()

//日期输出函数
var timeFormatStr = new Date().format("yyyyMMdd-hhmmss")

//=====================================

var version = "3.0.0"
var firstSummay = "cb create "+timeFormatStr
var dirName = 'public_compress'
var options = {
	workPath : "./../../mywork/animation_show/assets/",
	jsListArr : [
		"js/comp/video.js",
		"js/QtUtils.js",
		"js/loading.js",
		"js/main_v3.3.js"
	]
}


init()

function init(){
	var mainPath = options.workPath
	var jsFileListArr = options.jsListArr
	//
	var codeString =  ""
	for(var i in jsFileListArr){
		var filePathStr = mainPath+jsFileListArr[i]
		var fileData = getFileData(filePathStr)
		var fileData = uglifyJsFun(fileData)
		codeString += fileData
	}


	var resultCode = "/* "+firstSummay+" */" + codeString
	var distPath = ""+mainPath+dirName+"/"+dirName+"_"+version+".js"
	file.save(codeString, distPath, ()=>{
		Q.log("完成 "+distPath)
	})

}

// 
function getFileData(filePath){
	var bufferdata = file.readFileSync(filePath)
	var data = iconv.decode(Buffer.from(bufferdata), 'utf-8')
	return data
}

function uglifyJsFun(codeString){
	// var options = {
	//     toplevel: true,
	//     compress: {
	//         global_defs: {
	//             "@console.log": "alert"
	//         },
	//         passes: 2
	//     },
	//     output: {
	//         beautify: false,
	//         preamble: "/* "+uglified+" */"
	//     }
	// }
	return UglifyJs.minify(codeString,{}).code
}






