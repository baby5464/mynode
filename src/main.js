

console.log("[ main.js ] start ....")



//--------------------------------
var Promise = require('es6-promise').Promise
//转编码
var iconv = require('iconv-lite')
//Qt 工具类
var Q = require('./../utils/QtUtil.js')
//Qt文件类
var QtFile = require('./../files/QtFile.js')
var file = new QtFile()

//日期输出函数
var timeFormatStr = new Date().format("yyyyMMdd-hhmmss")
//--------------------------------


//获取网站源码
var GetWebSiteDom = require('./../server/GetWebSiteDom.js')
var webUrlPath = 'http://www.imooc.com/learn/348'
var webUrlPath2 = 'http://qq.ip138.com/weather/beijing/'
var webUrlPath3 = 'http://www.qq.com'
var webUrlPath4 = 'http://www.4399.com'
var webUrlPath5 = 'http://www.people.com.cn'

var fileContent = timeFormatStr+" qiter text";
var distPath = "./../dist/q-"+timeFormatStr+".txt";


//保存文件函数
//file.save(fileContent, distPath, function(){
//	Q.log("ok");
//})



function promiseGetWebDom(webUrlPath, characterStr){
	return new Promise(function(resolve, reject){
		var getWebSiteDomObj = new GetWebSiteDom(webUrlPath)
		getWebSiteDomObj.catch(catchHandler, characterStr)
		//
		function catchHandler(htmlDom){
			var $ = getWebSiteDomObj.parseDom(htmlDom)
			Q.log("-------------------")
			Q.log(htmlDom.length)
			Q.log(webUrlPath)
			Q.log($('title').text())
			resolve($)
		}
	})
}


promiseGetWebDom(webUrlPath, 'UTF8')
.then(function(data){
	return promiseGetWebDom(webUrlPath2)
})
.then(function(data){
	return promiseGetWebDom(webUrlPath3)
})
.then(function(data){
	return promiseGetWebDom(webUrlPath4)
})
.then(function(data){
	return promiseGetWebDom(webUrlPath5)
})
.then(function(data){
	Q.log("-------------------")
})


