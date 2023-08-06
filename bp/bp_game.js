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
	}
*/
function ItemObject(name,type,rarity,extra){
	this.name = name;
	this.type = type;
	this.rarity = rarity;
	this.extra = extra;
}
function randomItemGenerator(){

}

function testItemCreation(){
	const testItem = new ItemObject("Fire Sword","Type.SWORD","Rarity.EPIC",{special:false});
    const testItem2 = new ItemObject("Water Sword","Type.SWORD","Rarity.RARE", {special:true, element: 'fire', extraHealth: 15});
    let itemList = [testItem,testItem2];
    console.log(itemList);
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