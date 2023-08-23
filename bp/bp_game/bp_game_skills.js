function skill_Basic(){
	let finalDmgValue = charPhyDmg;
	damageEnemyPHY(finalDmgValue);
	hitAnim();
	updateFight();
}

function skill_Fireball(){
	let finalDmgValue = charMgcDmg;
	damageEnemyMGC(finalDmgValue);
	updateFight();
}

function skill_Die(){
	
}