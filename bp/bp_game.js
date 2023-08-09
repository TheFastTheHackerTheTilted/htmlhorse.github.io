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

// things to keep track of
var curinv= [];
var equipped =[];

var lastId = 2; //last item id, increase before use


var charHealth = 100;
var charEnergy = 20;
var charPhyDmg = 8;
var charMgcDmg = 0;
var charPhyDef = 0;
var charMgcDef = 0;
var charEnvDef = 0;
var charLifeSt = 0;
var charCritCh = 0;
var charCritMult = 1;
var charLife = 1;
var charElementalBuffs = [];
var charUniques = [];
var charBalance = 0;

function setStatsDefault(){
	charHealth = 100;
	charEnergy = 20;
	charPhyDmg = 8;
	charMgcDmg = 0;
	charPhyDef = 0;
	charMgcDef = 0;
	charEnvDef = 0;
	charLifeSt = 0;
	charCritCh = 0;
	charCritMult = 1;
	charLife = 1;
	charElementalBuffs = [];
}

function updateCharStats(){
	//update the values with equipped items
	setStatsDefault();
	for (let i in equipped){
		let theItemExtras = equipped[i].extra
		if(theItemExtras.special === true){
			if (theItemExtras.extraHealth !== undefined){charHealth += theItemExtras.extraHealth;}
			if (theItemExtras.extraEnergy !== undefined){charEnergy += theItemExtras.extraEnergy;}
			if (theItemExtras.physicalDamage !== undefined){charPhyDmg += theItemExtras.physicalDamage;}
			if (theItemExtras.magicalDamage !== undefined){charMgcDmg += theItemExtras.magicalDamage;}
			if (theItemExtras.physicalDefense !== undefined){charPhyDef += theItemExtras.physicalDefense;}
			if (theItemExtras.magicalDefense !== undefined){charMgcDef += theItemExtras.magicalDefense;}
			if (theItemExtras.enviromentalDefense !== undefined){charEnvDef += theItemExtras.enviromentalDefense;}
			if (theItemExtras.lifeStealRate !== undefined){charLifeSt += theItemExtras.lifeStealRate;}
			if (theItemExtras.critChance !== undefined){charCritCh += theItemExtras.critChance;}
			if (theItemExtras.critDamageMultiplier !== undefined){charCritMult += theItemExtras.critDamageMultiplier;}
			if (theItemExtras.bonusLife !== undefined){charLife += theItemExtras.bonusLife;}
			if (theItemExtras.element !== undefined){charElementalBuffs.push(theItemExtras.element);}
			if (theItemExtras.unique !== undefined){charUniques.push(theItemExtras.unique);}

		}
	}
	updateStatScreen();
}

function updateStatScreen(){
	document.getElementById("id_char_money").innerText = charBalance;
	document.getElementById("id_char_health").innerText = charHealth;
	document.getElementById("id_char_energy").innerText = charEnergy;
	document.getElementById("id_char_phydmg").innerText = charPhyDmg;
	document.getElementById("id_char_mgcdmg").innerText = charMgcDmg;
	document.getElementById("id_char_phydef").innerText = charPhyDef;
	document.getElementById("id_char_mgcdef").innerText = charMgcDef;
	document.getElementById("id_char_envdef").innerText = charEnvDef;
	document.getElementById("id_char_lifest").innerText = charLifeSt;
	document.getElementById("id_char_critch").innerText = charCritCh;
	document.getElementById("id_char_critmult").innerText = charCritMult;
	document.getElementById("id_char_life").innerText = charLife;
}

/*
	**Items have stats**

	Name
	Type
	Rarity
	Value
	KeyId
	extra{
		special = true/false if other stats exist!
		extraHealth
		extraEnergy
		physicalDefense
		magicalDefense
		enviromentalDefense
		physicalDamage
		magicalDamage
		lifeStealRate
		critChance
		critDamageMultiplier
		element
		bonusLife
		unique
	}
*/
function ItemObject(name,type,rarity,value,keyid,extra){
	this.name = name;
	this.type = type;
	this.rarity = rarity;
	this.value = value;
	this.keyid = keyid;
	this.extra = extra;
}
function randomItemGenerator(){
	let itemNames = ["The Fallen", "Star Piece", "ELEMENT","ELEMENT","ELEMENT","ELEMENT","ELEMENT", "The Queen's", "The King's", "Dwarven ", "The Eternal", "The Phoenix's", "The Shadowed", "The Celestial","ELEMENT","ELEMENT","ELEMENT","ELEMENT","ELEMENT", "Forgotten", "The Enchanted", "The Cursed", "The Radiant", "The Drifter's", "The Guardian's", "The Whispers", "Timeless", "ELEMENT","ELEMENT","ELEMENT","ELEMENT","ELEMENT", "The Stormborn", "The Wanderer's", "The Moonlit", "The Ember", "Dreamer's", "The Ironclad", "Starforged", "The Echoing" ]
	let itemElements = ["Iron","Stone","Wooden","Golden","Fire","Water","Lighting","Mithril", "Dragonhide", "Obsidian", "Elvensteel", "Enchanted Crystal", "Wyvern Scale", "Runestone", "Celestial Silver", "Demonbone", "Phoenix Feather"]
	let itemTypes = ["WEAPONS", "Hat", "Chestplate", "Leggings", "Boots", "Gloves", "Rings", "Amulet", "Cloak", "Potion", "Belt", "Necklace", "Shield", "Robe", "Bracers", "Earrings", "Tunic"]
	let weaponTypes = ["Sword", "Bow","Wand","Gauntlets", "Mace", "Longsword","Daggers", "Spear"]


	let randomName = itemNames[Math.floor(Math.random() * itemNames.length)];
	if (randomName =="ELEMENT") {
		randomName =itemElements[Math.floor(Math.random() * itemElements.length)];
	}
	let randomType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
	if (randomType =="WEAPON") {
		randomWeapon =weaponTypes[Math.floor(Math.random() * weaponTypes.length)];
		randomName = randomName +" "+ randomWeapon;
	}else {
		randomName = randomName +" "+ randomType;
	}

	let randomRarity = Math.random();
	let selectedRarity = "";
	if (randomRarity >=0.35 && randomRarity <=0.75) {
		selectedRarity = "COMMON";
	}else if(randomRarity >=0.2 && randomRarity <=0.90){
		selectedRarity = "RARE";

	}else if(randomRarity >=0.1 && randomRarity <=0.95){
		selectedRarity = "EPIC";
	}else if(randomRarity >=0.05 && randomRarity <=1){
		selectedRarity = "LEGENDARY";
	}else{selectedRarity = "MYTHIC";}



	lastId++;
	return (new ItemObject(randomName,randomType,selectedRarity,100,lastId,{special:false}));

}

function addItemToInv(Item){
	// console.log(Item.name)
	curinv.push(Item);
	updateInvScreen();
}

function equipItem(keyid){
	let indexToEquip = curinv.findIndex(item => item.keyid === keyid);
	let findCopy = equipped.findIndex(eitem => eitem.keyid === keyid);
	if (indexToEquip !== -1 && (curinv[indexToEquip] !== equipped[findCopy])) {
	  	equipped.push(curinv[indexToEquip])
	}
	// equipped.push(Item);
	updateInvScreen();
}

function sellItem(keyid){
	let indexToSell = curinv.findIndex(item => item.keyid === keyid);
	if (indexToSell !== -1) {
	  charBalance += curinv[indexToSell].value;
	}
	
	removeItem(keyid);
}
function removeItem(keyid){
	let indexToRemove = curinv.findIndex(item => item.keyid === keyid);
	if (indexToRemove !== -1) {
	  curinv.splice(indexToRemove, 1);
	}
	unequipItem(keyid);
}

function unequipItem(keyid){
	let equipIndexToRemove = equipped.findIndex(item => item.keyid === keyid);
	if (equipIndexToRemove !== -1) {
	  equipped.splice(equipIndexToRemove, 1);
	}
	updateInvScreen();
}

// resets inv screen, for each item in the inventory add a div
function updateInvScreen(){
	console.log("Equipped item list: "+equipped)
	let invScreen = document.getElementById("id_inventory");
	invScreen.innerHTML ="";
	for(let i in curinv){
		invScreen.innerHTML = '<div class="cl_inv_item" id="id_invitem_'+curinv[i].keyid+'">'+'<p>'+curinv[i].rarity+' '+curinv[i].name+'</p>'+'<a>Stats</a>'+'<a onclick="equipItem('+curinv[i].keyid+')">Equip</a>'+'<a onclick="unequipItem('+curinv[i].keyid+')">Unequip</a>'+'<a onclick="sellItem('+curinv[i].keyid+')">Sell('+curinv[i].value+')</a></div>'+invScreen.innerHTML;
	}

	updateEquippedScreen();
	updateCharStats();
}

function updateEquippedScreen(){
	for(let i in equipped){
		document.getElementById("id_invitem_"+equipped[i].keyid).style.backgroundColor  = "#b18a50"
	}
}


function showInventory(){
	let showinv= document.getElementById("id_inventory");
	let showovw= document.getElementById("id_overview");
	showinv.style.display = "block";
	showovw.style.display = "none";
}
function showOverview(){
	let showinv= document.getElementById("id_inventory");
	let showovw= document.getElementById("id_overview");
	showinv.style.display = "none";
	showovw.style.display = "block";
}
function showPromptscreen(){
	let showprompt= document.getElementById("id_upper_left");
	let showchar= document.getElementById("id_upper_right");
	showprompt.style.display = "block";
	showchar.style.display = "none";
}
function showCharscreen(){
	let showprompt= document.getElementById("id_upper_left");
	let showchar= document.getElementById("id_upper_right");
	showprompt.style.display = "none";
	showchar.style.display = "block";
}

function testItemCreation(){
	const testItem = new ItemObject("Stone Sword","SWORD","LEGENDARY",100,0,{special:false});
    const testItem2 = new ItemObject("Fire Sword","SWORD","RARE",25,1, {special:true, element: 'fire', extraHealth: 15});
    const testItem3 = new ItemObject("Water Sword","SWORD","EPIC",35,2, {special:true, element: 'water', physicalDamage: 15});

    let itemList = [testItem,testItem2];
    addItemToInv(testItem);
    addItemToInv(testItem2);
    addItemToInv(testItem3);
    addItemToInv(randomItemGenerator());

}