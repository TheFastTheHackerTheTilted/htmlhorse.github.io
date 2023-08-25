function skill_Basic(){
	let finalDmgValue = charPhyDmg;
	let cricChance = Math.random()*100;
	if (cricChance < charCritCh) {
		finalDmgValue = finalDmgValue* charCritMult;
		hitAnim("r_default")
	}else{
		hitAnim("r_basic");
	}
	damageEnemyPHY(finalDmgValue);
	

	charEnergize(5);

	updateFight();
}

function skill_Fireball(){
	if(charFightEnergy >= 15){
		let finalDmgValue = charMgcDmg;
		charEnergize(-15);

		damageEnemyMGC(finalDmgValue);
		hitAnim("r_fireball");

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