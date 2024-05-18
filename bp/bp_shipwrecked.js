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
	insertItem("5 kgs of canned food")
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
	"hunger":["Lighter","Pack of Matchsticks","5 kgs of canned food","Survival journal"],
	"thirst":["5 Gallons of water","Survival journal"],
	"snake":["Machete","Axe","Antidote kit","Harpoon gun"],
	"infection":["First aid kit","2 bottle of alcohol","Survival journal"]
}

function runEvent(eventName){
	let desc = eventDescMap[eventName]
	let solution = ""

	//find solution from inventory
	for (i in inventory) {
		let invItem = inventory[i]
		console.log(invItem)
		if (eventSolutionMap[eventName].includes(invItem)){
			solution = invItem;
			break;
		}
	}
	let endText = "And you got no solution for this. This is how you die. The END."

	textScreen(eventDescMap[eventName])

	if (solution === "") {
		textScreen(desc + endText)
	}
	else{
		textScreen(desc + solution)
		setTimeout(function() {
				createEvent()
				}, 5000)
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
