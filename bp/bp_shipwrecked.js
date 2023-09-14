function startGame(){
	changePrompt("Hello There");
}

function changePrompt(text){
	let prompt = document.getElementById("id_prompt");
	prompt.innerText = text;
}