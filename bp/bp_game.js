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
	for (let i in curinv){
		let theItemExtras = curinv[i].extra
		if(theItemExtras.wearable === true && theItemExtras.equipped === true){
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

	This example item extras are for weapon/armor! 

	Name
	Type
	Rarity
	Value
	KeyId
	extra{
		wearable = true/false // if it is wearable armor/weapon! (was 'special')
		equipped = false/true
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


function addItemToInv(Item){
	console.log(Item)
	writeLog("Added to inventory: "+ Item.name)
	if (Item.extra.wearable) {curinv.push(Item);}
	else {otherItems.push(Item);}
	updateInvScreen();
}



function equipItem(keyid){
	let indexToEquip = curinv.findIndex(item => item.keyid === keyid);

	if (indexToEquip !== -1) {
		unequipItemByType(curinv[indexToEquip].type);
		curinv[indexToEquip].extra.equipped = true;
	}
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
	// unequipItem(keyid);
	updateInvScreen();
}
function unequipItem(keyid){
	let indexToUnequip = curinv.findIndex(item => item.keyid === keyid);
	if (indexToUnequip !== -1) {
	  curinv[indexToUnequip].extra.equipped = false;
	}
	updateInvScreen();
}

function unequipItemByType(type){
	let unequipIndexToRemove = curinv.findIndex(item => item.type === type);
	if (unequipIndexToRemove !== -1) {
	  curinv[unequipIndexToRemove].extra.equipped = false;
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

function getTierColor(rarity){
	if (rarity === "COMMON" || rarity === 0){return "⬛ ";}
	else if (rarity === "RARE" || rarity === 1){return "🟦 ";}
	else if (rarity === "EPIC" || rarity === 2){return "🟪 ";}
	else if (rarity === "LEGENDARY" || rarity === 3){return "🟨 ";}
	else if (rarity === "MYTHIC" || rarity === 4){return "🟥 ";}
}

function showInventoryAll(){
	lastInvShowed = "inv-all";

	let invScreen = document.getElementById("id_inventory");
	invScreen.innerHTML ="";
	for(let i in curinv){
		invScreen.innerHTML = '<div class="cl_inv_item" id="id_invitem_'+curinv[i].keyid+'">'+'<p>'+getTierColor(curinv[i].rarity)+curinv[i].rarity+' '+curinv[i].name+'</p>'+'<a onClick = "printStats('+curinv[i].keyid+')">Stats</a>'+'<a onclick="equipItem('+curinv[i].keyid+')">Equip</a>'+'<a onclick="unequipItem('+curinv[i].keyid+')">Unequip</a>'+'<a onclick="sellItem('+curinv[i].keyid+')">Sell('+curinv[i].value.toFixed(1)+')</a></div>'+invScreen.innerHTML;
	}
	for(let o in otherItems){
		if (!otherItems[o].extra.consumable) {
			invScreen.innerHTML = '<div class="cl_inv_item" id="id_invitem_'+otherItems[o].keyid+'">'+'<p>'+getTierColor(otherItems[o].rarity)+otherItems[o].rarity+' '+otherItems[o].name+'</p>'+'<a onClick = "printDesc('+otherItems[o].keyid+')">Description</a>'+'<a onclick="sellOther('+otherItems[o].keyid+')">Sell('+otherItems[o].value.toFixed(1)+')</a></div>'+invScreen.innerHTML;
		}else if (otherItems[o].extra.consumable) {
			invScreen.innerHTML = '<div class="cl_inv_item" id="id_invitem_'+otherItems[o].keyid+'">'+'<p>'+getTierColor(otherItems[o].rarity)+otherItems[o].rarity+' '+otherItems[o].name+'</p>'+'<a onclick="useConsumable('+otherItems[o].keyid+')">Use</a>'+'<a onclick="sellOther('+otherItems[o].keyid+')">Sell('+otherItems[o].value.toFixed(1)+')</a></div>'+invScreen.innerHTML;
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
	for(let i in curinv){
		if (curinv[i].extra.equipped) {
		invScreen.innerHTML = '<div class="cl_inv_item" id="id_invitem_'+curinv[i].keyid+'">'+'<p>'+getTierColor(curinv[i].rarity)+curinv[i].rarity+' '+curinv[i].name+'</p>'+'<a onClick = "printStats('+curinv[i].keyid+')">Stats</a>'+'<a onclick="equipItem('+curinv[i].keyid+')">Equip</a>'+'<a onclick="unequipItem('+curinv[i].keyid+')">Unequip</a>'+'<a onclick="sellItem('+curinv[i].keyid+')">Sell('+curinv[i].value.toFixed(1)+')</a></div>'+invScreen.innerHTML;
		}
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
			invScreen.innerHTML = '<div class="cl_inv_item" id="id_invitem_'+curinv[i].keyid+'">'+'<p>'+getTierColor(curinv[i].rarity)+curinv[i].rarity+' '+curinv[i].name+'</p>'+'<a onClick = "printStats('+curinv[i].keyid+')">Stats</a>'+'<a onclick="equipItem('+curinv[i].keyid+')">Equip</a>'+'<a onclick="unequipItem('+curinv[i].keyid+')">Unequip</a>'+'<a onclick="sellItem('+curinv[i].keyid+')">Sell('+curinv[i].value.toFixed(1)+')</a></div>'+invScreen.innerHTML;
		}
	}
	for(let o in otherItems){
		if (!otherItems[o].extra.consumable) {
			invScreen.innerHTML = '<div class="cl_inv_item" id="id_invitem_'+otherItems[o].keyid+'">'+'<p>'+getTierColor(otherItems[o].rarity)+otherItems[o].rarity+' '+otherItems[o].name+'</p>'+'<a onClick = "printDesc('+otherItems[o].keyid+')">Description</a>'+'<a onclick="sellOther('+otherItems[o].keyid+')">Sell('+otherItems[o].value.toFixed(1)+')</a></div>'+invScreen.innerHTML;
		}else if (otherItems[o].extra.consumable) {
			invScreen.innerHTML = '<div class="cl_inv_item" id="id_invitem_'+otherItems[o].keyid+'">'+'<p>'+getTierColor(otherItems[o].rarity)+otherItems[o].rarity+' '+otherItems[o].name+'</p>'+'<a onclick="useConsumable('+otherItems[o].keyid+')">Use</a>'+'<a onclick="sellOther('+otherItems[o].keyid+')">Sell('+otherItems[o].value.toFixed(1)+')</a></div>'+invScreen.innerHTML;
		}
	}
	invScreen.innerHTML ='<div id="id_inv_filters"><button onclick="showInventoryAll()">All</button><button onclick="showInventoryEquipped()">Equipped</button><button onclick="showInventoryOthers()">Others</button></div>'+invScreen.innerHTML;

	updateCharStats();
}

function updateEquippedScreen(){
	for(let i in curinv){
		if (curinv[i].extra.equipped) {
			document.getElementById("id_invitem_"+curinv[i].keyid).style.backgroundColor  = "#414141"
		}
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

    addItemToInv(randomConsumableItemGenerator(0));
    addItemToInv(randomWearableItemGenerator(1));
    addItemToInv(randomWearableItemGenerator(2));
    addItemToInv(randomConsumableItemGenerator(3));
    addItemToInv(randomConsumableItemGenerator(4));



}