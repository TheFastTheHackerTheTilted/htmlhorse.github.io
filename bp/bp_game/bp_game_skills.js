function skill_Basic(){
	let finalDmgValue = charPhyDmg;
	damageEnemyPHY(finalDmgValue);
	hitAnim();

	charEnergize(5);

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
	damageChar(20);
	charHurtAnim();
	updateFight();
}