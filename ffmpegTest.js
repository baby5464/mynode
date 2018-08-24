var homePath = './nd/'
var path = require("path")
//Qt 工具类
var iconv = require('iconv-lite');
var Q = require(homePath+'utils/QtUtil.js')
var QtFile = require(homePath+'files/QtFile.js')
var file = new QtFile()


var mm = require('./node_modules/music-metadata');

var ffmpeg = require('./node_modules/fluent-ffmpeg')
var sizeOf = require('./node_modules/image-size')
var formidable = require('./node_modules/formidable')
var iconv = require('./node_modules/iconv-lite')
var child = require('child_process');
var fs = require('fs')
var http = require('http')
var path = require('path')
var util = require('util')


Q.log(111)