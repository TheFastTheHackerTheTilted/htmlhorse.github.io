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
}

function switchPanel(){
	let fullPanel = document.getElementById("id_fullpanel");
	let game = document.getElementById("id_game");

	if (fullPanel.style.display == 'none') {
	    fullPanel.style.display = 'flex';
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
	loadListeners()
}
function insertItem(item){
	let panel = document.getElementById("id_fullpanel");
	let newdivElement = document.createElement('div');
	newdivElement.classList.add('cl_item')
	let label = document.createElement('label');
	label.textContent = item;
	newdivElement.appendChild(label);
	panel.appendChild(newdivElement);
}

function loadListeners(){
	document.addEventListener('DOMContentLoaded', () => {
    const fullPanelElement = document.getElementById('id_fullpanel');
    const itemElements = fullPanelElement.querySelectorAll('.cl_item');

    itemElements.forEach(itemElement => {
        itemElement.addEventListener('click', () => {
            const labelElement = itemElement.querySelector('label');
            const labelText = labelElement.textContent.trim();
            addToInv(labelText);
        });
    });
});
}
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

function addToInv(item) {
    if (inventory.length < 3) {
        inventory.push(item);
    } else {
        inventory.shift(); // Remove the first element
        inventory.push(item);
    }
    console.log(inventory)
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
