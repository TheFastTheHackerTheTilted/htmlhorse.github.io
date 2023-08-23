function skill_Basic(){
	let finalDmgValue = charPhyDmg;
	damageEnemyPHY(finalDmgValue);
	charEnergize(5);
	hitAnim();
	updateFight();
}

function skill_Fireball(){
	if(charFightEnergy >= 15){
		let finalDmgValue = charMgcDmg;
		charEnergize(-15);
		damageEnemyMGC(finalDmgValue);
		hitAnim();
		updateFight();
	}
	else{
		writeLog("Fight: Not enough energy!")
	}
}

function skill_Die(){
	damageChar(50);
	updateFight();
}