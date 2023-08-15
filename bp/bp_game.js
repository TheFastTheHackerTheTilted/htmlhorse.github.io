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
var progressMultiplier = 1;
var curinv= [];
var equipped =[];
var otherItems = [];

var lastId = 0; //last item id, increase before use


var charHealth = 100;
var charEnergy = 20;
var charPhyDmg = 8;
var charMgcDmg = 0;
var charPhyDef = 0;
var charMgcDef = 0;
var charEnvDef = 0;
var charLifeSt = 0;
var charCritCh = 0;
var charCritMult = 1.3;
var charLife = 1;
var charElementalBuffs = [];
var charUniques = [];
var charBalance = 0;


var defcharHealth = 100;
var defcharEnergy = 20;
var defcharPhyDmg = 8;
var defcharMgcDmg = 0;
var defcharPhyDef = 0;
var defcharMgcDef = 0;
var defcharEnvDef = 0;
var defcharLifeSt = 0;
var defcharCritCh = 0;
var defcharCritMult = 1.3;
var defcharLife = 1;
var defcharElementalBuffs = [];
var defcharUniques = [];

function setStatsDefault(){
	charHealth = defcharHealth;
	charEnergy = defcharEnergy;
	charPhyDmg = defcharPhyDmg;
	charMgcDmg = defcharMgcDmg;
	charPhyDef = defcharPhyDef;
	charMgcDef = defcharMgcDef;
	charEnvDef = defcharEnvDef;
	charLifeSt = defcharLifeSt;
	charCritCh = defcharCritCh;
	charCritMult = defcharCritMult;
	charLife = defcharLife;
	charElementalBuffs = defcharElementalBuffs;
	charUniques = defcharUniques;
}

function updateCharStats(){
	//update the values with equipped items
	setStatsDefault();
	for (let i in equipped){
		let theItemExtras = equipped[i].extra
		if(theItemExtras.wearable === true){
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
			if (theItemExtras.element !== undefined && !charElementalBuffs.includes(theItemExtras.element)){charElementalBuffs.push(theItemExtras.element);}
			if (theItemExtras.unique !== undefined && !charUniques.includes(theItemExtras.unique)){
				for (let i in theItemExtras.unique){
					if( !charUniques.includes(theItemExtras.unique[i])){
						charUniques.push(theItemExtras.unique[i]);
					}
				}
				
			}

		}
	}
	updateStatScreen();
}

function updateStatScreen(){
	document.getElementById("id_char_money").innerText = charBalance.toFixed(2);
	document.getElementById("id_char_health").innerText = charHealth.toFixed(1);
	document.getElementById("id_char_energy").innerText = charEnergy.toFixed(1);
	document.getElementById("id_char_phydmg").innerText = charPhyDmg.toFixed(1);
	document.getElementById("id_char_mgcdmg").innerText = charMgcDmg.toFixed(1);
	document.getElementById("id_char_phydef").innerText = charPhyDef.toFixed(1);
	document.getElementById("id_char_mgcdef").innerText = charMgcDef.toFixed(1);
	document.getElementById("id_char_envdef").innerText = charEnvDef.toFixed(1);
	document.getElementById("id_char_lifest").innerText = charLifeSt.toFixed(1);
	document.getElementById("id_char_critch").innerText = charCritCh.toFixed(1);
	document.getElementById("id_char_critmult").innerText = charCritMult.toFixed(1);
	document.getElementById("id_char_life").innerText = charLife;
	document.getElementById("id_char_elem_bonus").innerText = charElementalBuffs;
	document.getElementById("id_char_uniques").innerText = charUniques;
}

/*
	**Items have stats**

	Name
	Type
	Rarity
	Value
	KeyId
	extra{
		wearable = true/false if it is wearable armor/weapon! (was 'special')
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
function randomWearableItemGenerator(){

	// item name/type generation
	let itemNames = ["The Fallen", "Star Piece", "ELEMENT","ELEMENT","ELEMENT","ELEMENT","ELEMENT", "The Queen's", "The King's", "Dwarven ", "The Eternal", "The Phoenix's", "The Shadowed", "The Celestial","ELEMENT","ELEMENT","ELEMENT","ELEMENT","ELEMENT", "Forgotten", "Enchanted","Enhanced", "The Cursed", "The Radiant", "Drifter's", "The Guardian's", "The Whisperer's", "Timeless", "ELEMENT","ELEMENT","ELEMENT","ELEMENT","ELEMENT", "The Stormborn", "The Wanderer's", "The Moonlit", "The Ember", "Dreamer's", "The Ironclad", "Starforged", "The Echoing" ]
	let itemElements = ["Iron","Stone","Wooden","Golden","Fire","Water","Lighting","Mithril", "Dragonhide", "Obsidian", "Elvensteel", "Enchanted Crystal", "Wyvern Scale", "Runestone", "Celestial Silver", "Demonbone", "Phoenix Feather"]
	let itemTypes = ["WEAPON", "Hat", "Chestplate", "Leggings", "Boots", "Gloves", "Rings", "Amulet", "Cloak", "Belt", "Necklace", "Shield", "Robe", "Bracers", "Earrings", "Tunic"]
	let weaponTypes = ["Sword", "Bow","Wand","Gauntlets", "Mace", "Longsword","Daggers", "Spear", "Mage Book", "Glaive"]

	let defensiveMultiplier = 1.2;
	let offensiveMultiplier = 1;

	let elementalItem = false;
	let itemElement = "";

	let randomName = itemNames[Math.floor(Math.random() * itemNames.length)];
	if (randomName =="ELEMENT") {
		elementalItem= true;
		randomName =itemElements[Math.floor(Math.random() * itemElements.length)];
		itemElement = randomName;
	}
	let randomType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
	if (randomType =="WEAPON") {
		randomWeapon =weaponTypes[Math.floor(Math.random() * weaponTypes.length)];
		offensiveMultiplier += 0.3;
		defensiveMultiplier += -0.3;
		randomName = randomName +" "+ randomWeapon;
	}else {
		defensiveMultiplier +=0.3;
		offensiveMultiplier += -0.3;
		randomName = randomName +" "+ randomType;
	}

	let itemValue = 1;
	// rarity selection
	let itemStatLimit = 1;
	let itemValueMultipler = 1;
	let randomRarity = Math.random();
	let selectedRarity = "";
	if (randomRarity >=0.35 && randomRarity <=0.75) {
		selectedRarity = "COMMON";
		itemValueMultipler = 0.7;
		itemStatLimit = 1;
		offensiveMultiplier += -0.1;
		defensiveMultiplier += -0.1;
	}else if(randomRarity >=0.2 && randomRarity <=0.90){
		selectedRarity = "RARE";
		itemValueMultipler = 1;
		itemValue+=10;
		itemStatLimit = 2;
	}else if(randomRarity >=0.1 && randomRarity <=0.95){
		selectedRarity = "EPIC";
		itemValueMultipler = 1.3;
		itemValue+=25;
		itemStatLimit = 4;
		offensiveMultiplier += 0.1;
		defensiveMultiplier += 0.1;
	}else if(randomRarity >=0.05 && randomRarity <=1){
		selectedRarity = "LEGENDARY";
		itemValueMultipler = 1.6;
		itemValue+=60;
		itemStatLimit = 8;
	}else{
		selectedRarity = "MYTHIC";
		itemValueMultipler = 2;
		itemValue+=100;
		itemStatLimit = 16;
		offensiveMultiplier += 0.3;
		defensiveMultiplier += 0.3;
	}

	// extra dictionary, used in last parameter of an item
	let itemStats = {wearable:true}
	// item stats
	
	
	let	uniques = [];

	let healthChance = Math.random();
	if (healthChance <= 0.3 && itemStatLimit >0) {
		itemStats.extraHealth = ((Math.random()*100)*progressMultiplier*itemValueMultipler*defensiveMultiplier);
		itemValue +=21;
		itemStatLimit--;
	}

	let energyChance = Math.random();
	if (energyChance <= 0.3 && itemStatLimit >0) {
		itemStats.extraEnergy = ((Math.random()*50)*progressMultiplier*itemValueMultipler);
		itemValue +=21;
		itemStatLimit--;
	}

	let phydefChance = Math.random();
	if (phydefChance <= 0.3 && itemStatLimit >0) {
		itemStats.physicalDefense = ((Math.random()*15)*progressMultiplier*itemValueMultipler*defensiveMultiplier);
		itemValue +=21;
		itemStatLimit--;
	}

	let mgcdefChance = Math.random();
	if (mgcdefChance <= 0.3 && itemStatLimit >0) {
		itemStats.magicalDefense = ((Math.random()*15)*progressMultiplier*itemValueMultipler*defensiveMultiplier);
		itemValue +=21;
		itemStatLimit--;
	}

	let phydmgChance = Math.random();
	if (phydmgChance <= 0.3 && itemStatLimit >0) {
		itemStats.physicalDamage = ((Math.random()*15)*progressMultiplier*itemValueMultipler*offensiveMultiplier);
		itemValue +=21;
		itemStatLimit--;
	}

	let mgcdmgChance = Math.random();
	if (mgcdmgChance <= 0.3 && itemStatLimit >0) {
		itemStats.magicalDamage = ((Math.random()*15)*progressMultiplier*itemValueMultipler*offensiveMultiplier);
		itemValue +=21;
		itemStatLimit--;
	}

	let lifestChance = Math.random();
	if (lifestChance <= 0.2 && itemStatLimit >0) {
		itemStats.lifeStealRate = ((Math.random()*10)*progressMultiplier*itemValueMultipler*offensiveMultiplier);
		itemValue +=41;
		itemStatLimit--;
	}

	let critDmgChance = Math.random();
	if (critDmgChance <= 0.2 && itemStatLimit >0) {
		itemStats.critChance = ((Math.random()*8)*progressMultiplier*itemValueMultipler*offensiveMultiplier);
		itemValue +=41;
		itemStatLimit--;
	}

	// 0.2
	let critDmgMultChance = Math.random();
	if (critDmgMultChance <= 0.2 && itemStatLimit >0) {
		itemStats.critDamageMultiplier = ((Math.random()*0.4)*progressMultiplier*itemValueMultipler*offensiveMultiplier);
		itemValue +=41;
		itemStatLimit--;
	}
	//0.1
	let bonusLifeChance = Math.random();
	if (bonusLifeChance <= 0.1 && itemStatLimit >0) {
		itemValue +=101;
		itemStats.bonusLife = 1;
		uniques.push("Undead")
		itemStatLimit--;
	}

	if(elementalItem==true){
		itemValue +=51;
		itemStats.element = itemElement;
	}

	if (uniques.length > 0){
		itemStats.unique = uniques;
	}


	lastId++;
	return (new ItemObject(randomName,randomType,selectedRarity,(itemValue*itemValueMultipler),lastId,itemStats));

}

function randomConsumableItemGenerator(){
	let itemStats = {wearable:false, consumable:true}

	// item name/type generation
	let itemNames = ["The Witch's","Magician's","Corrupted","Merchant's", "", "", "", ""];
	let itemTypes = ["Potion", "Elixir", "Scroll", "Rune", "Relic", "Charm", "Powder"]
	let potionStats = ["extraHealth", "extraEnergy", "physicalDefense", "magicalDefense", "enviromentalDefense", "physicalDamage", "magicalDamage", "lifeStealRate", "critChance", "critDamageMultiplier"];


	let itemValue = 1;
	let itemValueMultipler = 1;

	let randomName = itemNames[Math.floor(Math.random() * itemNames.length)];
	
	let randomType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
	
	let StatSelector = potionStats[Math.floor(Math.random() * potionStats.length)]

	let middleName = "";
	let statValue = 0;
	if (StatSelector === "extraHealth") {
		if(charHealth >0){
			statValue = (charHealth/10).toFixed(1)
		}
		middleName = "Health";
	} else if (StatSelector === "extraEnergy") {
	    if (charEnergy > 0) {
	        statValue = (charEnergy / 10).toFixed(1);
	    }
	    middleName = "Energy";
	} else if (StatSelector === "physicalDefense") {
	    if (charPhyDef > 5) {
	        statValue = (charPhyDef / 10).toFixed(1);
	    }
	    middleName = "Though Skin";
	} else if (StatSelector === "magicalDefense") {
	    if (charMgcDef > 5) {
	        statValue = (charMgcDef / 10).toFixed(1);
	    }
	    middleName = "Strong Mind";
	} else if (StatSelector === "enviromentalDefense") {
	    if (charEnvDef > 5) {
	        statValue = (charEnvDef / 10).toFixed(1);
	    }
	    middleName = "Awareness";
	} else if (StatSelector === "physicalDamage") {
	    if (charPhyDmg > 0) {
	        statValue = (charPhyDmg / 10).toFixed(1);
	    }
	    middleName = "Strength";
	} else if (StatSelector === "magicalDamage") {
	    if (charMgcDmg > 5) {
	        statValue = (charMgcDmg / 10).toFixed(1);
	    }
	    middleName = "Intelligence";
	} else if (StatSelector === "lifeStealRate") {
	    if (charLifeSt > 3) {
	        statValue = (charLifeSt / 15).toFixed(1);
	    }else{statValue = 1;}
	    middleName = "Vamp";
	} else if (StatSelector === "critChance") {
	    if (charCritCh > 3) {
	        statValue = (charCritCh / 8).toFixed(1);
	    }
	    middleName = "Precision";
	} else if (StatSelector === "critDamageMultiplier") {
	    if (charCritMult > 0) {
	        statValue = (charCritMult / 10).toFixed(1);
	    }
	    else{statValue = 0.5;}
	    middleName = "Focus";
	}

	if (statValue == 0) {statValue = 5;}

	

	let FinalName = randomName+" "+middleName+" "+randomType;




	
	let randomRarity = Math.random();
	console.log(randomRarity);
	let selectedRarity = "";
	if (randomRarity < 0.05) {
		selectedRarity = "MYTHIC";
		itemValueMultipler = 2;
		itemValue+=100;
	}else if(randomRarity <0.1 || randomRarity > 0.95){
		selectedRarity = "LEGENDARY";
		itemValueMultipler = 1.6;
		itemValue+=75;

	}else if(randomRarity <0.2 || randomRarity >0.85){
		selectedRarity = "EPIC";
		itemValueMultipler = 1.3;
		itemValue+=45;

	}else if(randomRarity <0.35 || randomRarity>=0.70){
		selectedRarity = "RARE";
		itemValueMultipler = 1;
		itemValue+=20;

	}
	else {
		selectedRarity = "COMMON";
		itemValueMultipler = 0.7;
		itemValue+=10;
	}

	statValue = statValue * itemValueMultipler;



	itemStats.Effect = StatSelector;
	itemStats.EffectValue = statValue;

	let finalItemPrice = itemValue*statValue/3;
	lastId++;
	return (new ItemObject(FinalName,randomType,selectedRarity,finalItemPrice,lastId,itemStats));

}

function addItemToInv(Item){
	console.log(Item)
	writeLog("Added to inventory: "+ Item.name)
	if (Item.extra.wearable) {curinv.push(Item);}
	else {otherItems.push(Item);}
	updateInvScreen();
}

function equipItem(keyid){
	let indexToEquip = curinv.findIndex(item => item.keyid === keyid);
	let findCopy = equipped.findIndex(eitem => eitem.keyid === keyid);
	if (indexToEquip !== -1 && (curinv[indexToEquip] !== equipped[findCopy])) {
		unequipItemByType(curinv[indexToEquip].type);
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
function unequipItemByType(type){
	let unequipIndexToRemove = equipped.findIndex(item => item.type === type);
	if (unequipIndexToRemove !== -1) {
	  equipped.splice(unequipIndexToRemove, 1);
	}
	updateInvScreen();
}
function sellOther(keyid){
	let indexToSell = otherItems.findIndex(item => item.keyid === keyid);
	if (indexToSell !== -1) {
	  charBalance += otherItems[indexToSell].value;
	}
	
	removeOther(keyid);
}
function removeOther(keyid){
	let indexToRemove = otherItems.findIndex(item => item.keyid === keyid);
	if (indexToRemove !== -1) {
	  otherItems.splice(indexToRemove, 1);
	}
	updateInvScreen();
}
function useConsumable(keyid){
	let indexToConsume = otherItems.findIndex(item => item.keyid === keyid);
	let theConsumStats = otherItems[indexToConsume].extra;
	if (theConsumStats.wearable === false && theConsumStats.consumable === true) {
	  let effectName = theConsumStats.Effect;
	  let effectValue = theConsumStats.EffectValue;
	  if (effectName === "extraHealth") {defcharHealth += effectValue;}
	  else if (effectName === "extraEnergy") {defcharEnergy += effectValue;}
	  else if (effectName === "physicalDefense") {defcharPhyDef += effectValue;}
	  else if (effectName === "magicalDefense") {defcharMgcDef += effectValue;}
	  else if (effectName === "enviromentalDefense") {defcharEnvDef += effectValue;}
	  else if (effectName === "physicalDamage") {defcharPhyDmg += effectValue;}
	  else if (effectName === "magicalDamage") {defcharMgcDmg += effectValue;}
	  else if (effectName === "lifeStealRate") {defcharLifeSt += effectValue;}
	  else if (effectName === "critChance") {defcharCritCh += effectValue;}
	  else if (effectName === "critDamageMultiplier") {defcharCritMult += effectValue;}
	  

	}

	removeOther(keyid);
	updateInvScreen();
}

// resets inv screen, for each item in the inventory add a div
function updateInvScreen(){
	if (lastInvShowed === "inv-all") {showInventoryAll();}
	else if(lastInvShowed === "inv-equipped"){showInventoryEquipped();}
	else if(lastInvShowed === "inv-others"){showInventoryOthers();}
	else{showInventoryAll();}
}

var lastInvShowed = "";

function showInventoryAll(){
	lastInvShowed = "inv-all";

	let invScreen = document.getElementById("id_inventory");
	invScreen.innerHTML ="";
	for(let i in curinv){
		invScreen.innerHTML = '<div class="cl_inv_item" id="id_invitem_'+curinv[i].keyid+'">'+'<p>'+curinv[i].rarity+' '+curinv[i].name+'</p>'+'<a onClick = "printStats('+curinv[i].keyid+')">Stats</a>'+'<a onclick="equipItem('+curinv[i].keyid+')">Equip</a>'+'<a onclick="unequipItem('+curinv[i].keyid+')">Unequip</a>'+'<a onclick="sellItem('+curinv[i].keyid+')">Sell('+curinv[i].value.toFixed(1)+')</a></div>'+invScreen.innerHTML;
	}
	for(let o in otherItems){
		if (!otherItems[o].extra.consumable) {
			invScreen.innerHTML = '<div class="cl_inv_item" id="id_invitem_'+otherItems[o].keyid+'">'+'<p>'+otherItems[o].rarity+' '+otherItems[o].name+'</p>'+'<a onClick = "printDesc('+otherItems[o].keyid+')">Description</a>'+'<a onclick="sellOther('+otherItems[o].keyid+')">Sell('+otherItems[o].value.toFixed(1)+')</a></div>'+invScreen.innerHTML;
		}else if (otherItems[o].extra.consumable) {
			invScreen.innerHTML = '<div class="cl_inv_item" id="id_invitem_'+otherItems[o].keyid+'">'+'<p>'+otherItems[o].rarity+' '+otherItems[o].name+'</p>'+'<a onclick="useConsumable('+otherItems[o].keyid+')">Use</a>'+'<a onclick="sellOther('+otherItems[o].keyid+')">Sell('+otherItems[o].value.toFixed(1)+')</a></div>'+invScreen.innerHTML;
		}
	}
	invScreen.innerHTML ='<div id="id_inv_filters"><button onclick="showInventoryAll()">All</button><button onclick="showInventoryEquipped()">Equipped</button><button onclick="showInventoryOthers()">Others</button></div>'+invScreen.innerHTML;

	updateEquippedScreen();
	updateCharStats();
}

function showInventoryEquipped(){
	lastInvShowed = "inv-equipped";

	let invScreen = document.getElementById("id_inventory");
	invScreen.innerHTML ="";
	for(let i in equipped){
		invScreen.innerHTML = '<div class="cl_inv_item" id="id_invitem_'+equipped[i].keyid+'">'+'<p>'+equipped[i].rarity+' '+equipped[i].name+'</p>'+'<a onClick = "printStats('+equipped[i].keyid+')">Stats</a>'+'<a onclick="equipItem('+equipped[i].keyid+')">Equip</a>'+'<a onclick="unequipItem('+equipped[i].keyid+')">Unequip</a>'+'<a onclick="sellItem('+equipped[i].keyid+')">Sell('+equipped[i].value.toFixed(1)+')</a></div>'+invScreen.innerHTML;
	}
	invScreen.innerHTML ='<div id="id_inv_filters"><button onclick="showInventoryAll()">All</button><button onclick="showInventoryEquipped()">Equipped</button><button onclick="showInventoryOthers()">Others</button></div>'+invScreen.innerHTML;

	updateEquippedScreen();
	updateCharStats();
}

function showInventoryOthers(){
	lastInvShowed = "inv-others";

	let invScreen = document.getElementById("id_inventory");
	invScreen.innerHTML ="";
	for(let i in curinv){
		if (!curinv[i].extra.wearable) {
			invScreen.innerHTML = '<div class="cl_inv_item" id="id_invitem_'+curinv[i].keyid+'">'+'<p>'+curinv[i].rarity+' '+curinv[i].name+'</p>'+'<a onClick = "printStats('+curinv[i].keyid+')">Stats</a>'+'<a onclick="equipItem('+curinv[i].keyid+')">Equip</a>'+'<a onclick="unequipItem('+curinv[i].keyid+')">Unequip</a>'+'<a onclick="sellItem('+curinv[i].keyid+')">Sell('+curinv[i].value.toFixed(1)+')</a></div>'+invScreen.innerHTML;
		}
	}
	for(let o in otherItems){
		if (!otherItems[o].extra.consumable) {
			invScreen.innerHTML = '<div class="cl_inv_item" id="id_invitem_'+otherItems[o].keyid+'">'+'<p>'+otherItems[o].rarity+' '+otherItems[o].name+'</p>'+'<a onClick = "printDesc('+otherItems[o].keyid+')">Description</a>'+'<a onclick="sellOther('+otherItems[o].keyid+')">Sell('+otherItems[o].value.toFixed(1)+')</a></div>'+invScreen.innerHTML;
		}else if (otherItems[o].extra.consumable) {
			invScreen.innerHTML = '<div class="cl_inv_item" id="id_invitem_'+otherItems[o].keyid+'">'+'<p>'+otherItems[o].rarity+' '+otherItems[o].name+'</p>'+'<a onclick="useConsumable('+otherItems[o].keyid+')">Use</a>'+'<a onclick="sellOther('+otherItems[o].keyid+')">Sell('+otherItems[o].value.toFixed(1)+')</a></div>'+invScreen.innerHTML;
		}
	}
	invScreen.innerHTML ='<div id="id_inv_filters"><button onclick="showInventoryAll()">All</button><button onclick="showInventoryEquipped()">Equipped</button><button onclick="showInventoryOthers()">Others</button></div>'+invScreen.innerHTML;

	updateCharStats();
}

function updateEquippedScreen(){
	for(let i in equipped){
		document.getElementById("id_invitem_"+equipped[i].keyid).style.backgroundColor  = "#b18a50"
	}
}


function printStats(keyid){
	let itemStatScreen = document.getElementById("id_item_desc");
	itemStatScreen.innerHTML = "" 
	let indexOfStat = curinv.findIndex(item => item.keyid === keyid);
	if (indexOfStat !== -1) {
		let theItem = curinv[indexOfStat];
	  	let theItemStats = theItem.extra;
	  	if(theItemStats.wearable === true){
	  		console.log(theItemStats);
	  		itemStatScreen.innerHTML = '<p>'+theItem.name+'</p>';
			if (theItemStats.extraHealth !== undefined){itemStatScreen.innerHTML = itemStatScreen.innerHTML+ '<p>Extra Health: '+theItemStats.extraHealth.toFixed(1) +'</p>';}
			if (theItemStats.extraEnergy !== undefined){itemStatScreen.innerHTML = itemStatScreen.innerHTML+ '<p>Extra Energy: '+theItemStats.extraEnergy.toFixed(1) +'</p>';}
			if (theItemStats.physicalDamage !== undefined){itemStatScreen.innerHTML = itemStatScreen.innerHTML+ '<p>Physical Damage: '+theItemStats.physicalDamage.toFixed(1) +'</p>';}
			if (theItemStats.magicalDamage !== undefined){itemStatScreen.innerHTML = itemStatScreen.innerHTML+ '<p>Magical Damage: '+theItemStats.magicalDamage.toFixed(1) +'</p>';}
			if (theItemStats.physicalDefense !== undefined){itemStatScreen.innerHTML = itemStatScreen.innerHTML+ '<p>Physical Defense: '+theItemStats.physicalDefense.toFixed(1) +'</p>';}
			if (theItemStats.magicalDefense !== undefined){itemStatScreen.innerHTML = itemStatScreen.innerHTML+ '<p>Magical Defense: '+theItemStats.magicalDefense.toFixed(1) +'</p>';}
			if (theItemStats.enviromentalDefense !== undefined){itemStatScreen.innerHTML = itemStatScreen.innerHTML+ '<p>Environmental Defense: '+theItemStats.enviromentalDefense.toFixed(1) +'</p>';}
			if (theItemStats.lifeStealRate !== undefined){itemStatScreen.innerHTML = itemStatScreen.innerHTML+ '<p>Life Steal Rate(%): '+theItemStats.lifeStealRate.toFixed(1) +'</p>';}
			if (theItemStats.critChance !== undefined){itemStatScreen.innerHTML = itemStatScreen.innerHTML+ '<p>Critic Chance(%): '+theItemStats.critChance.toFixed(1) +'</p>';}
			if (theItemStats.critDamageMultiplier !== undefined){itemStatScreen.innerHTML = itemStatScreen.innerHTML+'<p>Critic Damage Rate(X): '+theItemStats.critDamageMultiplier.toFixed(1) +'</p>';}
			if (theItemStats.bonusLife !== undefined){itemStatScreen.innerHTML = itemStatScreen.innerHTML+ '<p>Bonus Life: +'+theItemStats.bonusLife+'</p>';}
			if (theItemStats.element !== undefined){itemStatScreen.innerHTML = itemStatScreen.innerHTML+ '<p>Element: '+theItemStats.element +'</p>';}
			if (theItemStats.unique !== undefined){itemStatScreen.innerHTML = itemStatScreen.innerHTML+ '<p>Unique Feature: '+theItemStats.unique+'</p>';}
		}
	}
	showDesc();
}

//the main block of inventory, witch between overview and inventory
function showInventory(){
	let showinv= document.getElementById("id_inventory");
	let showovw= document.getElementById("id_overview");
	showinv.style.display = "block";
	showovw.style.display = "none";
	document.getElementById("id_item_desc").style.display = "none";
}
function showOverview(){
	let showinv= document.getElementById("id_inventory");
	let showovw= document.getElementById("id_overview");
	showinv.style.display = "none";
	showovw.style.display = "block";
	document.getElementById("id_item_desc").style.display = "none";
}
function showDesc(){
	document.getElementById("id_item_desc").style.display = "block";
	document.getElementById("id_overview").style.display = "none";
	document.getElementById("id_inventory").style.display = "none";

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

    addItemToInv(randomWearableItemGenerator());
    addItemToInv(randomWearableItemGenerator());
    addItemToInv(randomConsumableItemGenerator());
    addItemToInv(randomConsumableItemGenerator());


}