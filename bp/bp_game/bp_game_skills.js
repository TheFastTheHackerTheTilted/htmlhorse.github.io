function skill_Basic(){
	if (lastAttackBy!=="char") {
		let finalDmgValue = charPhyDmg;
		let cricChance = Math.random()*100;
		if (cricChance < charCritCh) {
			finalDmgValue = finalDmgValue* charCritMult;
			hitAnim("r_default")
		}else{
			hitAnim("r_basic");
		}
		let damageDone = damageEnemyPHY(finalDmgValue);
		charFightHealth += damageDone*charLifeSt; 

		charEnergize(5);
		lastAttackBy = "char";

		skillButtonStyleBlocked();
		setTimeout(updateFight,500);
		
	}
}

function skill_Fireball(){
	if (lastAttackBy!=="char") {
		if(charFightEnergy >= 15){
			let finalDmgValue = charMgcDmg;
			charEnergize(-15);

			damageEnemyMGC(finalDmgValue);
			hitAnim("r_fireball");

			lastAttackBy = "char";
			skillButtonStyleBlocked();
			setTimeout(updateFight,500);
			
		}
		else{
			writeLog("Fight: Not enough energy!")
		}
	}
}

function skill_Die(){
	if (lastAttackBy!=="char") {
		damageChar(20);
		charHurtAnim();
		lastAttackBy = "char";
		skillButtonStyleBlocked();
		setTimeout(updateFight,500);
	}
}

function skill_Refresh(){
	if (lastAttackBy!=="char") {
		finalHealValue = (charMgcDmg*2)+(charHealth/10)
		charHeal(finalHealValue);
		lastAttackBy = "char";
		skillButtonStyleBlocked();
		setTimeout(updateFight,500);
	}
}