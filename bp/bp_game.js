var line = 0
function writeLog(text){

	let logs = document.getElementById("id_logs");
	logs.innerText = "\n<"+line+"> "+text+logs.innerText;
	line++;
}



// DEPRECATED, not used
function fancyWriteLog(text, colorcode){

	let logs = document.getElementById("id_logs");
	logs.innerHTML = '<span style="color:'+colorcode+';">'+"<br><"+line+">"+text+'</span>'+logs.innerHTML;
	line++;
}