var currentDiag = 0;
var currentDiagList = [];
var diagPosition = "";
var endOptions = [];
var endFuncs = [];


function runDiag(){
	if (1 < currentDiagList.length){
		quickPrompt(currentDiagList[0],["Next"],["nextDiag()"],diagPosition);
	}
}

function newDiagList(diagList){
	currentDiagList = [];
	currentDiag = 0;
	currentDiagList = diagList;
}


function nextDiag(){
	if (currentDiagList.length -2 > currentDiag) {
		currentDiag++;
		quickPrompt(currentDiagList[currentDiag],["Next"],["nextDiag()"],diagPosition);
	}
	else if (currentDiagList.length -1 > currentDiag) {
		currentDiag++;
		quickPrompt(currentDiagList[currentDiag],endOptions,endFuncs,diagPosition);
	}
}

function st_newStory(){
	newDiagList(["I just turned 21, and I am officially allowed to be an ADVENTURER!!","I am so excited!!","First i need to Register to adventurer's guild"]);
	diagPosition ="street.jpg";
	endOptions = ["Go"];
	endFuncs = ["st_main00()"];
	runDiag();
}

function st_main00(){
	newDiagList(["Receptionist: Hello adventurer, lets register you.","*She gets my name and info to register me*","*After signing some documents i am now officially an adventurer!!*","Receptionist: take these beginner equipment and go on to your first adventure!"]);
	diagPosition = "tavern.jpg";
	endOptions = ["Start Adventure"];
	endFuncs= ["st_main01()"];
	runDiag();
}

function st_main01(){
	addItemToInv(randomWearableItemGenerator(0));
	addItemToInv(randomWearableItemGenerator(0));
	addItemToInv(randomWearableItemGenerator(0));
	addItemToInv(randomWearableItemGenerator(1));
	inCity = false;
	newFight();
}