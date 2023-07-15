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
	document.getElementById("id_health").innerText = "Health: "+health;
	document.getElementById("id_win_rate").innerText = "Win rate: "+(win_rounds/total_round)+"%";
	document.getElementById("id_card_count").innerText = "Card count: "+deck.length;
	document.getElementById("id_mycards").innerText = user_cards;
	document.getElementById("id_dealercards").innerText = dealer_cards;
	
}


function user_hit(){
	let deck_length = deck.length;
	let randomNumber = Math.floor(Math.random() * deck_length);

	user_cards.push(deck[randomNumber]);
	deck.splice(randomNumber-1,1);
	console.log(user_cards);


	update_table();

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
	update_table();

	for (i =0; i < 2; i++){
		user_hit();
		dealer_hit();
	}
}

function aftermath(){
	if(user_stands){
		let user_score = 0;
		for (let i = 0; i < user_cards.length; i++) {
		  console.log(myArray[i]);
		}
	}
}