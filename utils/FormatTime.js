//创建格式化时间
var format = {

	formatDuring : function(mss) {
	    var days = parseInt(mss / (1000 * 60 * 60 * 24));
	    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
	    var seconds = parseInt( (mss % (1000 * 60)) / 1000 );

	    hours = hours==0?"":hours;

	    function addZero(nameStr){
	    	nameStr = String(nameStr)
	    	return nameStr.length<=1? "0"+nameStr : nameStr;
	    }
	    //return days + ":" + hours + ":" + minutes + "" + seconds + "";
	    return  hours + "" + addZero(minutes) + ":" + addZero(seconds) ;
	}
}

exports.formatDuring = format.formatDuring
