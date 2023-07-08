var gl_curNum = 0;
var gl_seed = 0;
function genNum() {

	//get the current seed
	let x = (document.getElementById("id_input")).value;
    x = x.slice(0, 9);
    //handle NaN input(empty input)
    if(x ==''){
    	x=0;
    }

    //check if seed is changed, if so reset everything
    if (gl_seed != x){
    	gl_seed = x;
		gl_curNum = 0;
	}

	//calculate next number based on previous number
    let curNum = 0;
    if(gl_curNum != 0){
    	curNum = mathWork(gl_curNum);
    	gl_curNum = curNum;
    }
    else{
    	curNum = mathWork(x);
    	gl_curNum = curNum;
    }
	console.log(curNum);
	document.getElementById("id_result").innerText = "Here is the random number: "+curNum;
}

function mathWork(x){
	x= parseInt(x)
	x = x+11;
	x = x*x; 
	y = x-(x/2)
	x = x+y

	x = parseInt(x)
	let res = x.toString();
	res = res.slice(0,9);
	//x = x.slice(0, 9);
	while(res.length<9){
		res = mathWork(res);
	}
	return res;
}	