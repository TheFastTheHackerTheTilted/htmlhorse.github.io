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
	newDiagList(["Diag1","Here you go","Goodbye(no more content atm)"]);
	diagPosition ="street.jpg";
	endOptions = ["Stay", "Go"]
	endFuncs = ["st_stay()","newFight()"]
	runDiag();
}