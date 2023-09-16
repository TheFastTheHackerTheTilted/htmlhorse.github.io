function initalize(){
	changePrompt("Start Game?");
	removeChoices();
	addChoice("Go","startGame()");
}

function changePrompt(text){
	let prompt = document.getElementById("id_prompt");
	prompt.innerText = text;
}


function removeChoices(){
	let el = document.getElementById("id_choices");
	el.innerHTML = "";
}

function addChoice(name,func){
	let el = document.getElementById("id_choices");
	el.innerHTML = el.innerHTML + '<button class="cl_choice" onClick="'+func+'">'+name+'</button>'
}


function diagStart(){
	changePrompt(promptList[dPointer])
	dPointer+=1;
	removeChoices()
	addChoice("Next", "nextDiag()")
}

function nextDiag(){
	if (dPointer == promptList.length-1) {
		removeChoices();
		for (l in choiceList){
			addChoice(choiceList[l][0],choiceList[l][1])
		}
	}
	changePrompt(promptList[dPointer]);
	dPointer +=1;
}







var dPointer = 0;
var promptList = [];
var choiceList = [];


function startGame(){
	promptList = ["While you were walking, a mysterious man appeared",
		"He has an offer for you",
		"There is a challenge he wants you to do",
		"If you succeed, you will be rewarded with 100.000$", 
		"He starts to explain the details of the challenge" ,
		"The main focus is surviving in an unknown island with 9 more strangers", 
		"You don't know how long you need to survive", 
		"The help will come when the timer ends",
		"Each survivor when the timer ends will get the money",
		"Additionally, for each survivor the money will be increased by 5%",
		"If you die before the help comes, you die",
		"Here are the ground rules:",
		"-From a list of items, you are free to pick 5",
		"-You can't give up",
		"-You can't go away from the island",
		"-No laws against crime",
		"Are you going to accept the offer?"]
	choiceList = [["Accept", "itemSelectionScreen()"]]
	diagStart();
}
