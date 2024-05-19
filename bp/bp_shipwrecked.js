const inventory = [] 


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
	if (dPointer === 16) {
		removeChoices();
		for (l in choiceList){
			addChoice(choiceList[l][0],choiceList[l][1])
		}
	}
	changePrompt(promptList[dPointer]);
	dPointer +=1;
}

function emptyFullPanel(){
	let fp = document.getElementById("id_fullpanel");
	fp.innerHTML = ""
	document.getElementById("id_startsimulation").style.display = "none"
}

function switchPanel(){
	let fullPanel = document.getElementById("id_fullpanel");
	let game = document.getElementById("id_game");
	let startButton = document.getElementById("id_startsimulation")

	if (fullPanel.style.display == 'none') {
		fullPanel.style.display = 'flex';
		startButton.style.display = 'block'
		game.style.display = 'none';
	} else {
		fullPanel.style.display = 'none'
		game.style.display = 'flex';
	}
}
function itemSelectionScreen(){
	emptyFullPanel()
	switchPanel()
	insertAllItems()

}
function insertItem(item){
	let panel = document.getElementById("id_fullpanel");
	let newButton = document.createElement('button');
	newButton.classList.add('cl_item')
	let label = document.createElement('label');
	label.textContent = item;
	newButton.appendChild(label);
	panel.appendChild(newButton);
}

document.addEventListener('DOMContentLoaded', () => {
	const fullPanelElement = document.getElementById('id_fullpanel');

	fullPanelElement.addEventListener('click', event => {
		const buttonElement = event.target.closest('button.cl_item');

		if (buttonElement) {
			const labelElement = buttonElement.querySelector('label');
			const labelText = labelElement.textContent.trim();
			addToInv(labelText);
		}
	});
});

function insertAllItems(){
	insertItem("First aid kit")
	insertItem("Frying Pan")
	insertItem("Dog")
	insertItem("Lighter")
	insertItem("Pack of Matchsticks")
	insertItem("2 bottle of alcohol")
	insertItem("Pocket knife")
	insertItem("Machete")
	insertItem("Compass")
	insertItem("Flare Gun")
	insertItem("5 Gallons of water")
	insertItem("4 kgs of canned food")
	insertItem("Thermal clothing (Cold&Hot)")
	insertItem("Waterproof Notebook & Pens")
	insertItem("Flashlight")
	insertItem("Tent kit")
	insertItem("Music player")
	insertItem("Antidote kit")
	insertItem("Life jacket")
	insertItem("Survival journal")
	insertItem("Radiation Detector")
	insertItem("Harpoon gun")
	insertItem("Fire Extinguisher")
	insertItem("Magnifying Glass")
	insertItem("Axe")

}

function updateButtonClasses() {
	const fullPanelElement = document.getElementById('id_fullpanel');
	const buttonElements = fullPanelElement.querySelectorAll('button.cl_item');

	buttonElements.forEach(button => {
		const labelElement = button.querySelector('label');
		const labelText = labelElement.textContent.trim();

		if (inventory.includes(labelText)) {
			button.classList.add('cl_active');
		} else {
			button.classList.remove('cl_active');
		}
	});
}

function addToInv(item) {
	if (!inventory.includes(item)) {
		if (inventory.length < 3) {
			inventory.push(item);
		} else {
			inventory.shift(); // Remove the first element
			inventory.push(item);
		}
	}
	console.log(inventory);
	updateButtonClasses()
}

function startSim(){
	if (inventory.length == 3) {
		console.log("started")
		emptyFullPanel()

		createEvent()

	}
}

var eventList = ["hunger","thirst","snake","infection"]
var round = 0
function createEvent(){
	let randomNumber = Math.floor(Math.random() * 101);

	if (round < 3 && eventList.length > 0) {
		round +=1;

		let randomIndex = Math.floor(Math.random() * eventList.length);
		let eventName = eventList[randomIndex];
		eventList.splice(randomIndex, 1);
		
		runEvent(eventName)


		

	}
	else{
		textScreen("Help came in time, You Survived..")
	}
}

const eventDescMap = {
	"hunger":"The island does not have healthy looking plants or animals to eat. With time you start to feel the starvation. ",
	"thirst":"Because you cannot drink sea water, you start to feel thirsty. ",
	"snake":"An aggresive snake appeared, if you cant find a way to get rid of it, it might kill you. ",
	"infection":"From small bruises and wounds on your hand, you got an infection. It started to look worse by day. "
}

const eventSolutionMap = {
	"hunger":["Lighter","Pack of Matchsticks","4 kgs of canned food","Survival journal"],
	"thirst":["5 Gallons of water","Frying Pan","Survival journal"],
	"snake":["Machete","Axe","Antidote kit","Harpoon gun"],
	"infection":["First aid kit","2 bottle of alcohol"]
}

const eventSolutionDescMap = {
	"hungerLighter":"But with the lighter, you were able to cook some fishes. Now you won't starve to death.",
	"hungerPack":"But with the Matchsticks, you prepared a fire and  were able to cook some fishes. Now you won't starve to death.",
	"hunger4":"But these canned foods are enough for you to survive a bit longer. Now you won't starve to death.",
	"hungerSurvival":"But from the journal, you recognized edible plants on the island. They don't look good but atleast safe. Now you won't starve to death.",
	"thirst5":"But gallons of fresh water should be enough to survive a bit longer. You won't die because of thirst.",
	"thirstSurvival":"But with survival journal, you managed to make a water collection system with leaves. And luckily there was rain. You won't die because of thirst.",
	"thirstFrying":"Luckily there was rain and you managed to collect some wother. You won't die becuase of thirst.",
	"snakeMachete":"But with a good swing of machete, you managed to bleed the snake. You managed to escape from the snake's attack.",
	"snakeAxe":"But with a good swing of axe, you managed to cut the snake in half. You managed to escape from the snake's attack.",
	"snakeAntidote":"Altough snake bit you, you were able to cure it with the Antidote kit. You survived the snake's poison.",
	"snakeHarpoon":"But you aimed carefully and shot the snake. As the snake slowly died, you managed to survive the attack.",
	"infectionFirst":"But using the first aid kit, you got a proper treatement. You no longer suffer from infection",
	"infection2":"But using the alcohol, you managed to kill the infection. It was quite painful but you wont die."
}

function runEvent(eventName){
	let desc = eventDescMap[eventName]
	let solution = ""
	let endText = "And you got no solution for this. This is how you die. The END."
	
	//find solution from inventory
	for (i in inventory) {
		let invItem = inventory[i]
		if (eventSolutionMap[eventName].includes(invItem)){
			solution = eventSolutionDescMap[(eventName + getFirstWord(invItem))];
			break;
		}
	}


	console.log(inventory)
	if (solution === "") {
		textScreen(desc + endText)
	}
	else{
		textScreen(desc + solution)
		setTimeout(function() {
				createEvent()
				}, 7000)
	}
}


function textScreen(context){
	emptyFullPanel()
	let panel = document.getElementById("id_fullpanel");
	let label = document.createElement('label');
	label.classList.add('cl_textscreen')
	label.textContent = context;
	panel.appendChild(label);

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

function getFirstWord(str) {
    str = str.trim();
    const words = str.split(' ');
    return words[0] || '';
}