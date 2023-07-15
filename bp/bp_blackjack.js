var deck = new Array();
var health = 0;
var ingame = false;
var shuffle_score = 0.05
var shuffle_increase_rate = 0.007
var total_round = 0;
var win_rounds = 0;
var user_cards = new Array();
var user_stands = false;
var dealer_cards = new Array();

function bj_new_game(){
	shuffle_cards();
	health = 3;
	ingame = true;
	total_round++;

	update_table();
	new_round();
}


function shuffle_cards(){
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
	console.log(deck);
	document.getElementById("id_status").innerText = "System Message: Cards Shuffled"

}

function update_table(){
	aftermath();
	document.getElementById("id_health").innerText = "Health: "+health;
	document.getElementById("id_win_rate").innerText = "Win rate: "+(win_rounds/total_round)+"%";
	document.getElementById("id_card_count").innerText = "Card count: "+deck.length;
	document.getElementById("id_mycards").innerText = "("+calc_user_score()+"): "+user_cards;
	document.getElementById("id_dealercards").innerText = dealer_cards;
	
}

function highlight_ngame(){
	var newgamebt = document.getElementById("id_ngame");
	newgamebt.classList.add("cl_highlight");
	setTimeout(function() {newgamebt.classList.remove("cl_highlight");}, 700);
}

function user_hit(){
	if(ingame){
		let deck_length = deck.length;
		let randomNumber = Math.floor(Math.random() * deck_length);

		user_cards.push(deck[randomNumber]);
		deck.splice(randomNumber-1,1);
		console.log(user_cards);


		update_table();
		}
	else{
		highlight_ngame();
	}
}

function user_stand(){
	if(ingame){
		user_stands = true;
		update_table();
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
	console.log(dealer_cards);


	update_table();

}


function new_round(){
	total_round++;
	shuffle_score +=shuffle_increase_rate;
	dealer_cards = new Array();
	user_cards = new Array()
	user_stands=false;
	update_table();

	for (i =0; i < 2; i++){
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

function aftermath(){
	if(user_stands){
		//first calculate how many points the user has
		user_score = calc_user_score();
		console.log("User score: "+user_score);

		// TO DO: then calculate how many points the dealer has
		// If cards need to be hit for dealer, hit it
		// Get the winner, update the health and win rounds
		// Start new round
	}
}