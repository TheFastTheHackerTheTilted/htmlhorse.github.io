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
	newDiagList(["I just turned 21, and I am officially allowed to be an ADVENTURER!!","I am so excited!!","First i need to Register to adventurer's guild."]);
	diagPosition ="street.jpg";
	endOptions = ["Go"];
	endFuncs = ["st_main00()"];
	runDiag();
}

function st_main00(){
	newDiagList(["Receptionist: Hello adventurer, lets register you.","*She gets my name and info to register me*","*After signing some documents i am now officially an adventurer!!*","Receptionist: take these beginner equipment for your first adventure!"]);
	diagPosition = "tavern.jpg";
	endOptions = ["Take Items"];
	endFuncs= ["st_main01()"];
	runDiag();
}

function st_main01(){
	addItemToInv(randomWearableItemGenerator(0));
	addItemToInv(randomWearableItemGenerator(0));
	addItemToInv(randomWearableItemGenerator(0));
	addItemToInv(randomWearableItemGenerator(1));
	newDiagList(["Dont forget; you can only heal in cities or with potions.","Thats why its important that you change your equipment before you leave the city so you can heal accordingly.","Equip now and go on.."]);
	diagPosition = "tavern.jpg";
	endOptions = ["Leave city"];
	endFuncs= ["leaveCity()"];
	runDiag();
}