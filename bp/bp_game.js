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

}

function testItemCreation(){
	const testItem = new ItemObject("Fire Sword","SWORD","EPIC",100,0,{special:false});
    const testItem2 = new ItemObject("Water Sword","SWORD","RARE",25,1, {special:true, element: 'fire', extraHealth: 15});
    let itemList = [testItem,testItem2];
    addItemToInv(testItem);
    addItemToInv(testItem2);

}

var curinv= [];
var lastId = 1
function addItemToInv(Item){
	// console.log(Item.name)
	curinv.push(Item);
	updateInvScreen();
}

function removeItem(keyid){
	let indexToRemove = curinv.findIndex(item => item.keyid === keyid);
	if (indexToRemove !== -1) {
	  curinv.splice(indexToRemove, 1);
	}
	updateInvScreen();
}

// resets inv screen, for each item in the inventory add a div
function updateInvScreen(){
	let invScreen = document.getElementById("id_inventory");
	invScreen.innerHTML ="";
	for(let i in curinv){
		invScreen.innerHTML = '<div class="cl_inv_item">'+'<p>'+curinv[i].rarity+' '+curinv[i].name+'</p>'+'<a>Stats</a>'+'<a>Equip</a>'+'<a>Unequip</a>'+'<a onclick="removeItem('+curinv[i].keyid+')">Sell('+curinv[i].value+')</a></div>'+invScreen.innerHTML;
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