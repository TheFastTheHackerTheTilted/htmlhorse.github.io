function randomWearableItemGenerator(wantedTier){

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
	
	let selectedRarity = getRarity(wantedTier);
	if(selectedRarity === "MYTHIC"){
		itemValueMultipler = 2;
		itemValue+=100;
		itemStatLimit = 16;
		offensiveMultiplier += 0.3;
		defensiveMultiplier += 0.3;
	}else if(selectedRarity === "LEGENDARY"){
		itemValueMultipler = 1.6;
		itemValue+=60;
		itemStatLimit = 8;
	}else if(selectedRarity === "EPIC"){
		itemValueMultipler = 1.3;
		itemValue+=25;
		itemStatLimit = 4;
		offensiveMultiplier += 0.1;
		defensiveMultiplier += 0.1;
	}else if(selectedRarity === "RARE"){
		itemValueMultipler = 1;
		itemValue+=10;
		itemStatLimit = 2;
	}else {
		itemValueMultipler = 0.7;
		itemStatLimit = 1;
		offensiveMultiplier += -0.1;
		defensiveMultiplier += -0.1;
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

function randomConsumableItemGenerator(wantedTier){
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




	
	
	let selectedRarity = getRarity(wantedTier);
	console.log(selectedRarity);
	if (selectedRarity === "MYTHIC"){
		itemValueMultipler = 2;
		itemValue+=85;
	}else if(selectedRarity === "LEGENDARY"){
		itemValueMultipler = 1.6;
		itemValue+=65;
	}else if(selectedRarity === "EPIC"){
		itemValueMultipler = 1.3;
		itemValue+=45;

	}else if(selectedRarity === "RARE"){
		itemValueMultipler = 1;
		itemValue+=35;
	}else {
		itemValueMultipler = 0.7;
		itemValue+=25;
	}

	statValue = statValue * itemValueMultipler;



	itemStats.Effect = StatSelector;
	itemStats.EffectValue = statValue;

	let finalItemPrice = itemValue*statValue/5;
	lastId++;
	return (new ItemObject(FinalName,randomType,selectedRarity,finalItemPrice,lastId,itemStats));

}


function getRarity(wantedTier){
	let randomRarity = Math.random();
	if (wantedTier==="MYTHIC" || wantedTier===4 || randomRarity < 0.05) {
		return "MYTHIC";
	}else if (wantedTier==="LEGENDARY" || wantedTier===3 || randomRarity < 0.1 || randomRarity > 0.95) {
		return "LEGENDARY";
	}else if (wantedTier==="EPIC" || wantedTier===2 || randomRarity <0.2 || randomRarity >0.85) {
		return "EPIC";
	}else if (wantedTier==="RARE" || wantedTier===1 || randomRarity <0.35 || randomRarity>=0.70) {
		return "RARE";
	}
	else if (wantedTier==="COMMON" || wantedTier===0 || randomRarity < 1) {
		return "COMMON";
	}
}