

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

var mp3FolderPath = "./../../mp3"
file.readFolder(mp3FolderPath)







