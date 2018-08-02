var fs = require('fs');
var child = require('child_process');
var files = fs.readdirSync('./');
var path=require('path');
var glb_args = process.argv;


function DYAutoMpeg(){

	
	this.List_URL = "";
	//
	this.Wait_mov_URL = "";
	//
	this.Tob_logo_Mov_URL = "";
	//
	this.Lift_logo_Gif_URL = "";
	//
	this.End_logo_Mov_URL = "";
	//
	var Tempfile = "temps";
	//-----------------------
	var Audio_mov_out_put = "temp_audio_out.wav";

	var Size_mov_out_put = "temp_size_out.mov";
	//tob_logo_put
	var One_mov_out_put = "temp_one_out.mov";
	//lift_logo_gif_put
	var Two_mov_out_put = "temp_two_out.mov";
	//black_ending_put
	var Three_mov_out_put = "temp_three_out.mpg";

	var Mix_mov_out_put = "temp_mix_out.mpg";
	//end_put
	var Four_mov_out_put = "temp_ending_out.mpg";

	var Size720_mov_out_put = "temp_720ending_out.mpg";


	this.go_render = function(){

		if (!fs.existsSync(this.List_URL+Tempfile)) {

			fs.mkdirSync(this.List_URL+Tempfile);

    	}
    	//audio 
    	let ffmpeg_play= 'ffmpeg -i '+ this.Wait_mov_URL + ' -vn -y ' + this.List_URL + Tempfile+ "/" + Audio_mov_out_put;
    	
    	let _this = this;

    	im = child.exec(ffmpeg_play,function(err,out,err2){

        	console.log("audio ok");

        	_this.size_render();
        	
    	});

	}


	this.size_render = function(){
		//size big 1080p
    	let ffmpeg_play= 'ffmpeg -i '+ this.Wait_mov_URL + ' -s 1920x1080 -an -y ' + this.List_URL + Tempfile+ "/" + Size_mov_out_put;
    	
    	let _this = this;

    	im = child.exec(ffmpeg_play,function(err,out,err2){

        	console.log("size 1080p ok");

        	_this.one_render();
        	
    	});

	}


	this.one_render = function(){

    	let ffmpeg_play= 'ffmpeg -i '+ this.List_URL + Tempfile+ "/" + Size_mov_out_put + ' -i ' + this.Tob_logo_Mov_URL + ' -filter_complex "[0:v][1:v]overlay[out]" -map "[out]" -y ' + this.List_URL + Tempfile+ "/" + One_mov_out_put;
    	
    	let _this = this;

    	im = child.exec(ffmpeg_play,function(err,out,err2){

        	console.log("one ok");

        	_this.two_render();
        	
    	});

	}

	this.two_render = function(){

		let _this = this;

		let ffmpeg_play= 'ffmpeg -y -i ' + this.List_URL + Tempfile+ "/" + One_mov_out_put + ' -ignore_loop 0 -i ' + this.Lift_logo_Gif_URL + ' -filter_complex  overlay=0:0:1 ' + this.List_URL + Tempfile+ "/" + Two_mov_out_put;

		im = child.exec(ffmpeg_play,function(err,out,err2){

        	console.log("two ok");

        	_this.three_render();

    	});
	}

	this.three_render = function(){

		let _this = this;

		let time = 0;

    	let ffmpeg_play = "ffmpeg -i " + this.List_URL + Tempfile+ "/" + Two_mov_out_put + " 2>&1 | grep 'Duration' | cut -d ' ' -f 4 | sed s/,//";

    	im=child.exec(ffmpeg_play,function(err,out,err2){

	        if(out!=""){
	            let strtime = out.split(":");
	            
	            for(let i =0;i<strtime.length;i++){
	                let num = Math.round(Number(strtime[i]));
	                
	                if(i==0){
	                    num = num * 3600;
	                }else if(i==1){ 
	                    num = num * 60;
	                }
	                time += num;
	            }
	        }
	        console.log("three ok");
        	_this.four_render(time);  
		});


	}

	this.four_render = function(time){
		let _this = this;
	    let time_ = time-0.5;
	    let ffmpeg_play = "ffmpeg -i " + this.List_URL + Tempfile+ "/" + Two_mov_out_put + ' -vf "fade=out:st='+time_+':d=0.5" -y ' + this.List_URL + Tempfile+ "/" + Three_mov_out_put;

	    im=child.exec(ffmpeg_play,function(err,out,err2){
	        console.log("four ok");
	        _this.mix_render();
	    });
		
	}


	this.mix_render = function (){


		let _this = this;

		let ffmpeg_play= 'ffmpeg -y -i ' + this.List_URL + Tempfile+ "/" + Three_mov_out_put + ' -i ' + this.List_URL + Tempfile+ "/" + Audio_mov_out_put + ' -filter_complex  "[1:0]apad" -shortest ' + this.List_URL + Tempfile+ "/" + Mix_mov_out_put;

		im = child.exec(ffmpeg_play,function(err,out,err2){

        	console.log("mix ok");

        	_this.five_render_end();

    	});


	}


	this.five_render_end = function(){

		let _this = this;
	    let ffmpeg_play = 'ffmpeg -i "concat:'+ this.List_URL + Tempfile+ "/" + Mix_mov_out_put + '|' + this.End_logo_Mov_URL + '" -c copy -y '  + this.List_URL + Tempfile+ "/" + Four_mov_out_put;
	    
		im=child.exec(ffmpeg_play,function(err,out,err2){

	        console.log("1080p to 720p ok");

	        _this.size720_render_end();
	    });	
	}


	this.size720_render_end = function(){

		let _this = this;
	    let ffmpeg_play = 'ffmpeg -i '+ this.List_URL + Tempfile+ "/" + Four_mov_out_put + ' -s 1280x720 -y ' + this.List_URL + Tempfile+ "/" + Size720_mov_out_put;
	    
		im=child.exec(ffmpeg_play,function(err,out,err2){

	        console.log("ending ok");

	        _this.end_message(_this.List_URL + Tempfile+ "/" + Size720_mov_out_put);
	    });	
	}


	this.end_message = function(news){
		//删除临时文件
		console.log(news);
		fs.unlinkSync(this.List_URL + Tempfile+ "/" + One_mov_out_put);
		fs.unlinkSync(this.List_URL + Tempfile+ "/" + Two_mov_out_put);
		fs.unlinkSync(this.List_URL + Tempfile+ "/" + Three_mov_out_put);
		fs.unlinkSync(this.List_URL + Tempfile+ "/" + Audio_mov_out_put);
		fs.unlinkSync(this.List_URL + Tempfile+ "/" + Size_mov_out_put);
		fs.unlinkSync(this.List_URL + Tempfile+ "/" + Mix_mov_out_put);
		fs.unlinkSync(this.List_URL + Tempfile+ "/" + Four_mov_out_put)
		Size720_mov_out_put
		return news;

	}

}



function main(){
	let txt_URL = glb_args[2];
	var data = fs.readFileSync(txt_URL,"utf-8"); 
	var newstr = "";
	for(var i=0;i<data.length;i++){
		if(data.charAt(i)!=" " && data.charAt(i)!="\r" && data.charAt(i)!="\n" && data.charAt(i)!="\t"){
			newstr += data.charAt(i);
		}

	}
	var arr = newstr.split(";");
	myauto = new DYAutoMpeg();
	myauto.List_URL = arr[0];
	myauto.Wait_mov_URL = arr[1];
	myauto.Tob_logo_Mov_URL = arr[2];
	myauto.Lift_logo_Gif_URL = arr[3];
	myauto.End_logo_Mov_URL = arr[4];
	myauto.go_render();
}

main();
