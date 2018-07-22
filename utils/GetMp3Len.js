

/*

	读取文件夹内的MP3文件，
	获取MP3信息，json形式写入文件输出

*/


const fTime = require("./utils/formatTime.js")

const fs = require("fs")
//创建文件
const createFile = require('create-file');
//获取MP3 长度
const getMP3Duration = require('get-mp3-duration')

var mp3FileName = 'qiter.json'
var mp3NameStr = ""
var mp3TimeStr = ""

var mp3DataArr = []
var mp3DataJson = ""

for(var i = 0 ; i<4 ; i++){
	var mp3Name = 'mp3/test_'+i+'.mp3'
	var buffer = fs.readFileSync(mp3Name)
	var duration = getMP3Duration(buffer)
	var mp3Time = fTime.formatDuring(duration)

	mp3DataArr.push({
		name:mp3Name,
		duration:duration,
		time:mp3Time
	})


	//mp3DataJson += mp3Name + ""

	//console.log(mp3DataArr)

	mp3DataJson = JSON.stringify({data:mp3DataArr})

	//
}

fs.exists(mp3FileName, function(exists) {  
    //console.log(exists ? "创建成功" : "创建失败");  
    if(exists){

    	fs.unlink(mp3FileName, function (err) {
		    if (err) return console.log(err);
		    console.log('[文件删除成功]');
		})

    }
});  


createFile(mp3FileName, mp3DataJson, function (err) {
  // file either already exists or is now created (including non existing directories)

  console.log("done");

});


