
/*

//获取网站源码
var GetWebSiteDom = require('./../server/GetWebSiteDom.js')
var webUrlPath = 'http://www.imooc.com/learn/348'
var getWebSiteDomObj = new GetWebSiteDom(webUrlPath)

//解析网站源码




*/


class GetWebSiteDom {

	constructor(siteUrl){
		this.siteUrl = siteUrl
	}
	
	toString(){
		return "this is GetWebSiteDom Class"
	}


	catch(callback, character){

		var characterStr = character || 'GBK'//'utf8'

		//var gs = require('nodegrass');
		var iconv = require('iconv-lite');
		var http = require('http')
		//
		var nodegrass = require('nodegrass');
		nodegrass.get(this.siteUrl,function(data,status,headers){
			//console.log(status);
			//console.log(headers);
			//console.log(data);

			callback(data) 

		},null,characterStr.toLowerCase()).on('error', function(e) {
		    console.log("Got error: " + e.message);
		})
		

		// http.get(this.siteUrl,function(res){
			
			

		// 	var htmlStr = ''
			
		// 	res.on('data', function(data){
		// 		htmlStr += data

		// 	})

		// 	res.on('end', function(){
				
		// 		console.log(htmlStr)

		// 		callback("htmlStr") 
		// 	})

		// })


	}
	//
	parseDom(htmlStr){
		const cheerio = require('cheerio')
		const $ = cheerio.load(htmlStr)
		return $
	}

}
module.exports = GetWebSiteDom;
