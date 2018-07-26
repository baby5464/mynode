

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
//var mp3FolderPath = "./../../racer/"

// var isExist = file.exist(mp3FolderPath)
// Q.log(isExist)


//获取文件内容对象
// var fileInfoObj = file.getFileStatSync(mp3FolderPath+'下载说明.txt')
// Q.log(fileInfoObj)

// var isDir = file.isDirectory(mp3FolderPath)
// Q.log(isDir)


//获取文件夹 一层文件名。不包含子文件夹
// var fileNameArr = file.getOneFolderFilesName(mp3FolderPath)
// Q.log(fileNameArr)

//获取 全部 文件夹 路径数组
// var folderListArr = file.getFolderAllFolderNameArr(mp3FolderPath)
// Q.log("获取 全部文件夹路径数组")
// Q.log(folderListArr)
// Q.log("--------------------")


//获取 全部 文件名 路径数组
var folderAllFileNameArr = file.getFolderInFolderAllFilesName(mp3FolderPath)
Q.log(folderAllFileNameArr)


var saveTxtStr = folderAllFileNameArr
file.save(JSON.stringify(saveTxtStr), "./../../mynode/dist.txt", ()=>{
	Q.log(saveTxtStr)
})






