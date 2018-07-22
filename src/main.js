

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


//获取网站源码
var GetWebSiteDom = require('./../server/GetWebSiteDom.js')
var webUrlPath = 'http://www.imooc.com/learn/348'
var webUrlPath2 = 'http://qq.ip138.com/weather/beijing/'
var webUrlPath3 = 'http://www.qq.com'






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
	
})

// var ps = new Promise(function(resolve, reject){
// 	getWebSiteDomObj.catch(function(htmlDom){
// 		resolve(htmlDom)
// 	})
// }).then(function(data){

// 	console.log(data)

// })

/*
getWebSiteDomObj.catch(function(htmlDom){
	
	var $ = getWebSiteDomObj.paraseDom(htmlDom)

	var $main = $('.course-chapters')

	$main.each(function(item){

		var $el = $(this)
		var title = $el.find('h3').text()
		console.log(title)

	})

})
*/

/*
fs.readFile("./../files/QtFile.js", (error, data) => {


	var data = iconv.decode(Buffer.from(data), 'GBK');
	Q.log(data);

	file.save(data, "f.js", function(){
		Q.log("ok");
	})	

})
*/

//Q.log(QtFile)



/*
Q.log(timeFormatStr);
Q.log("qiter");

Q.log(QtFile.showCurrentPath());

Q.log(file.exist("1.jpg"));
*/

