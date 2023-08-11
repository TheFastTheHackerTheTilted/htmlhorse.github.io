var deck = new Array();
var health = 0;
var ingame = false;
var total_round = 0;
var win_rounds = 0;
var user_cards = new Array();
var user_stands = true;
var dealer_cards = new Array();

function bj_new_game(){
	shuffle_cards();
	health = 3;
	win_rounds = 0;
	total_round = 0;
	ingame = true;
	
	new_round();
}


function shuffle_cards(){
	deck = new Array();
	let cardset = ['1','2','3','4','5','6','7','8','9','K','Q','J','A'];

	for(i=0; i<13; i++){
		for(c=0; c<16; c++){
			let randomNumber = Math.floor(Math.random() * 208);
			// console.log(randomNumber);
			while (deck[randomNumber] != undefined){
				randomNumber = Math.floor(Math.random() * 208);
			}
			deck[randomNumber] = cardset[i] ;

		}	

	}
	// console.log(deck);
	update_status("Cards shuffled")
}

function calc_shuffle(){
	let shuffle_value = ((Math.random() * (0.5))+0.5).toFixed(3);
	let shuffle_score = (((208-deck.length)/208).toFixed(3));

	console.log("Shuffle value: "+shuffle_value + ", shufflescode "+shuffle_score);

	if(shuffle_value < shuffle_score){
		shuffle_cards();
		update_status("Cards shuffled");
	}

}

function update_table(){
	document.getElementById("id_health").innerText = "Health: "+health;
	let win_ratio = ((win_rounds/total_round)*100).toFixed(1)
	document.getElementById("id_win_rate").innerText = "Win rate: "+win_ratio+"% in "+(total_round);
	document.getElementById("id_card_count").innerText = "Card count: "+deck.length;
	document.getElementById("id_mycards").innerText = "("+calc_user_score()+"): "+user_cards;
	document.getElementById("id_dealercards").innerText = "("+calc_dealer_score()+"): "+ dealer_cards;
	
}

function update_status(newStatus){
	document.getElementById("id_status").innerText = "System Message: "+newStatus;
	highlight_status();
}

function highlight_ngame(){
	var newgamebt = document.getElementById("id_end_button");
	newgamebt.classList.add("cl_highlight");
	setTimeout(function() {newgamebt.classList.remove("cl_highlight");}, 700);
}

function highlight_status(){
	var idstatus = document.getElementById("id_status");
	idstatus.classList.add("cl_highlight");
	setTimeout(function() {idstatus.classList.remove("cl_highlight");}, 700);
}

function user_hit(){
	if(ingame && !user_stands){
		let deck_length = deck.length;
		let randomNumber = Math.floor(Math.random() * deck_length);

		user_cards.push(deck[randomNumber]);
		deck.splice(randomNumber-1,1);
		// console.log("User cards: "+user_cards);

		if(calc_user_score()>21){user_stand();}

		update_table();
		}
	else{
		highlight_ngame();
	}
}

function user_stand(){
	if(ingame){
		user_stands = true;
		aftermath();
	}
	else{
		highlight_ngame()
	}
}

function dealer_hit(){
	let deck_length = deck.length;
	let randomNumber = Math.floor(Math.random() * deck_length);

	dealer_cards.push(deck[randomNumber]);
	deck.splice(randomNumber-1,1);
	// console.log("Dealer Cards: "+dealer_cards);


	update_table();

}



function new_round(){
	if(user_stands){
		calc_shuffle();
		console.log("Total round: "+total_round)
		dealer_cards = new Array();
		user_cards = new Array()
		user_stands=false;
		user_hit();
		user_hit();
		dealer_hit();
	}
}

function calc_user_score(){
	user_cards.sort(function(a, b) {
			if (a === 'A') {
				return 1; // 'A' is considered greater, move it to the end
			} else if (b === 'A') {
			    return -1; // 'A' is considered greater, move it to the end
			} else {
			    return a.localeCompare(b); // Compare other elements in their default order
			}
		});

		let user_score = 0;
		for (let i = 0; i < user_cards.length; i++) {
			// If its a number, add it to the score
			if(Number.isInteger(parseInt(user_cards[i], 10))){
				user_score+= parseInt(user_cards[i], 10);
			}
			// If not 'A' or not Int, should be K,Q,J
			else if(user_cards[i] != 'A'){
				user_score+=10;
			}
			// Else it should be 'A'
			else{
				if(user_score <11){user_score+=11;}
				else{user_score+=1;}
			}
		}
		// console.log("User score: "+user_score);
		return user_score;
}

function calc_dealer_score(){
	dealer_cards.sort(function(a, b) {
			if (a === 'A') {
				return 1; // 'A' is considered greater, move it to the end
			} else if (b === 'A') {
			    return -1; // 'A' is considered greater, move it to the end
			} else {
			    return a.localeCompare(b); // Compare other elements in their default order
			}
		});

		let dealer_score = 0;
		for (let i = 0; i < dealer_cards.length; i++) {
			// If its a number, add it to the score
			if(Number.isInteger(parseInt(dealer_cards[i], 10))){
				dealer_score+= parseInt(dealer_cards[i], 10);
			}
			// If not 'A' or not Int, should be K,Q,J
			else if(dealer_cards[i] != 'A'){
				dealer_score+=10;
			}
			// Else it should be 'A'
			else{
				if(dealer_score <11){dealer_score+=11;}
				else{dealer_score+=1;}
			}
		}
		// console.log("User score: "+dealer_score);
		return dealer_score;
}

function aftermath(){
	if(user_stands == true){
		//first calculate how many points the user has
		user_score = calc_user_score();
		console.log("User score: "+user_score);

		while(calc_dealer_score()<17){
			dealer_hit();
		}
		dealer_score = calc_dealer_score();
		console.log("Dealer Score: "+dealer_score);

		get_winner(user_score,dealer_score);
	}
}

function get_winner(u_score, d_score){
	console.log(u_score+" and "+d_score);
	if(u_score >21 && dealer_score > 21){
		update_status("No Winner");
	}
	else if(u_score >21 && dealer_score <= 21){
		update_status("Dealer Wins");
		health--;
	}
	else if(u_score <=21 && dealer_score > 21){
		update_status("You Win!");
		health++;
		win_rounds++;
	}
	else if(u_score <= 21 && dealer_score <= 21 && u_score < dealer_score){
		update_status("Dealer Wins");
		health--;
	}
	else if(u_score <= 21 && dealer_score <= 21 && u_score > dealer_score){
		update_status("You Win");
		health++;
		win_rounds++;
	}
	else{
		update_status("Tie");
	}
	total_round++;

	update_table();
	highlight_status();
	to_new_round_button();
	if(health <1){
		to_new_game_button();
	}
}

function to_new_round_button(){
	let finalbutton = document.getElementById("id_end_button");
	finalbutton.innerText = "Next Round"
	finalbutton.onclick = new_round;
}

function to_new_game_button(){
	let finalbutton = document.getElementById("id_end_button");
	finalbutton.innerText = "New Game"
	finalbutton.onclick = bj_new_game;
}