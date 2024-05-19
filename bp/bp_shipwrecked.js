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
	if (dPointer === promptList.length-1) {
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

var eventList = ["hunger","thirst","snake","infection", "injury","sanity","cold","lost","ship","wildfire"]
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
	"snake":"An aggressive snake appeared, it looks big and deadly. You have to face it somehow. ",
	"infection":"From small bruises and wounds on your hand, you got an infection. It started to look worse by day. ",
	"injury":"While wandering you started to feel pain in your limbs, looks like a bleeding from unknown cause. ",
	"sanity":"Spending time alone pushes the limits of your sanity. ",
	"cold":"Harsh weather conditions made you feel the cold. If this continues you are gonna have hypothermia. ",
	"lost":"While looking for valuable resources, you wandered bit to far from your campsite. The time is getting late and you don't know where you are. ",
	"ship":"You see a ship passing by, time is getting late and this might be your only chance",
	"wildfire":"A wildfire has started due to the sun. Its spreading fast. "
}

const eventSolutionMap = {
	"hunger":["Lighter","Pack of Matchsticks","4 kg of canned food","Survival journal","Dog","Pocket knife"],
	"thirst":["5 Gallons of water","Frying Pan","Survival journal"],
	"snake":["Machete","Axe","Antidote kit","Harpoon gun","Tent kit"],
	"infection":["First aid kit","2 bottle of alcohol"],
	"injury":["First aid kit","Magnifying Glass"],
	"sanity":["Dog","Alcohol","Magnifying Glass","Waterproof Notebook & Pens","Music player"],
	"cold":["Lighter","Pack of Matchsticks","Thermal clothing (Cold&Hot)","Tent kit","Alcohol"],
	"lost":["Compass","Waterproof Notebook & Pens","Machete","Flashlight"],
	"ship":["Flare Gun","Lighter"],
	"wildfire":["Fire Extinguisher","5 Gallons of water", "Frying Pan"]
}

const eventSolutionDescMap = {
	"hungerLighter":"But with the lighter, you were able to cook some fishes. Now you won't starve to death.",
	"hungerPack":"But with the Matchsticks, you prepared a fire and  were able to cook some fishes. Now you won't starve to death.",
	"hunger4":"But these canned foods are enough for you to survive a bit longer. Now you won't starve to death.",
	"hungerSurvival":"But from the journal, you recognized edible plants on the island. They don't look good but at least safe. Now you won't starve to death.",
	"hungerFrying":"Using the reflective side of the frying pan, you managed to use the heat of sun and cook the plants and animals to be safe. Now you won't starve to death.",
	"hungerDog":"And the dog looked like it was trying to show you something. Using his nose, he found a familiar plant to eat. Now you won't starve to death.",
	"hungerPocket":"With the pocket knife you easily cleaned the fish and eat it. Now you won't starve to death.",
	"thirst5":"But gallons of fresh water should be enough to survive a bit longer. You won't die because of thirst.",
	"thirstSurvival":"But with survival journal, you managed to make a water collection system with leaves. And luckily there was rain. You won't die because of thirst.",
	"thirstFrying":"Luckily there was rain and you managed to collect some water. You won't die because of thirst.",
	"snakeMachete":"But with a good swing of machete, you managed to bleed the snake. You managed to escape from the snake's attack.",
	"snakeAxe":"But with a good swing of axe, you managed to cut the snake in half. You managed to escape from the snake's attack.",
	"snakeAntidote":"Although snake bit you, you were able to cure it with the Antidote kit. You survived the snake's poison.",
	"snakeHarpoon":"But you aimed carefully and shot the snake. As the snake slowly died, you managed to survive the attack.",
	"snakeTent":"You quickly ran to your tent, closed the entrance and just waited for some time to get rid of snake. You managed to avoid the attack.",
	"infectionFirst":"But using the first aid kit, you got a proper treatment. You no longer suffer from infection.",
	"infection2":"But using the alcohol, you managed to kill the infection. It was quite painful but you wont die.",
	"injuryFirst":"But the first aid kit had proper materials for you to treat the wound. Now you won't die to to injury.",
	"injuryMagnifying":"You managed to see what was the problem with your magnifying glass. You saw little pieces that pierced your skin and managed to clean it. It needs time to heal but now you won't die to to injury.",
	"sanityDog":"But this little fella be your friend, even though it doesn't speak, at least there is someone to play with. You are still sane.",
	"sanityAlcohol":"It's not the optimal solution but why not just get drunk and forgot that you are on a deserted island. You managed to avoid insanity attack, for now.",
	"sanityMagnigying":"It was fun to analyze the surroundings, every plant, every insect. You managed to avoid insanity attack, for now.",
	"sanityWaterproof":"You started to take notes of interesting things that you experience, or draw things you feel like. It makes you feel human for a little more. You managed to avoid insanity attack, for now.",
	"sanityMusic":"You started to listen some music, it feels like you are the main character of this world and you try even harder to survive. You are still sane.",
	"coldLighter":"You started a campfire with the lighter, you started feel warm. You avoided an hypothermia attack.",
	"coldPack":"You started a campfire with the matchsticks, you started feel warm. You avoided an hypothermia attack.",
	"coldThermal":"The thermal clothing made you little warmer. You avoided an hypothermia attack.",
	"coldTent":"You stayed inside your tent for a while to get warm. Staying outside could have froze you. You avoided an hypothermia attack.",
	"coldAlcohol":"Burning some alcohol for quick fire or drinking it made you feel warmer. Its not the best method but you are still not frozen.",
	"lostCompass":"By checking your compass you knew where you needed to head. Eventually you found your campsite. You did not get lost and die somewhere unknown.",
	"lostWaterproof":"You remembered that you made a map of visited places on your notebook. This was a lifesaver movement. You did not get lost and die somewhere unknown.",
	"lostMachete":"You don't know where you are heading towards but you started to cut every plant in front of you until you reached to a shore. You know how to find your campsite from this location.",
	"lostFlashlight":"With the reduced light, without a flashlight it would have been much more difficult to recognize placemarks you remembered to get back to your campsite. You did not die in the dark somewhere unknown.",
	"shipFlare":"To get some attention, you used your flare gun.",
	"shipLighter":"To get some attention, you made a small scaled wildfire and created a smoke.",
	"wildfireFire":"Using the fire Extinguisher you managed to avoid burning the whole island.",
	"wildfire5":"Using a lot of water, you avoided burning the whole island.",
	"wildfireFrying":"Using the frying pan as a bucket. you managed to extinguish the fire. You avoided burning the whole island."
}

const eventEndMap = {
	"hunger":"And you cannot figure out what is safe to consume. Slowly you lost all your energy and died. The END. ",
	"thirst":"And you couldn't find a fresh water source. While thinking about what to do, you did not manage to wake up one day. The END. ",
	"snake":" The snake swiftly attacked you, grasping your body. Strangled you to death without you being able to hurt it. The END. ",
	"infection": "You couldn't manage to treat the infection for a long time and went into a septic shock. Your organs failed to keep you alive. The END. ",
	"injury":"You couldn't manage to treat the wound, the bleeding got worse leading to a death due to losing too much blood. The END. ",
	"sanity":"Eventually you lost your sanity, you don't know whats happening. You couldn't track your needs and died. The END. ",
	"cold":"And in fact, you couldn't find a solution. You have hypothermia that you cannot treat in this condition. The END. ",
	"lost":"Time has passed, its really dark right now and you don't know whats happening around you. Scary sounds are coming. A sneaky attack and you are dead. The END. ",
	"ship":"You couldn't get the attention of the ship. You didn't know it was your last chance. You waited but the next ship never came. Was the previous one even real. The END. ",
	"wildfire":"It was an uncontrollable wildfire, spreading to whole island. You couldn't stop it. Now all wildlife is perished and so do you. The END. "

}

function runEvent(eventName){
	let desc = eventDescMap[eventName]
	let solution = ""
	let endText = eventEndMap[eventName]
	
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
	else if(solution != "" && eventName === "ship"){
		textScreen(desc+solution+" Luckily the ship saw your sign and came to help you")
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
		"The main focus is surviving in an unknown island with some items", 
		"You don't know how long you need to survive", 
		"The help will come when the timer ends",
		"If you die before the help comes, you die",
		"Here are the ground rules:",
		"-From a list of items, you are free to pick 3",
		"-You can't give up",
		"-You can't go away from the island without a modern vehicle",
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