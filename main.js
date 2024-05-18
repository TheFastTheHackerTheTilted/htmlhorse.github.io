function header_expand(){
	var morebox = document.getElementById("id_header_all_buttons");

	if (morebox.classList.contains('cl_visible')) {
    	morebox.classList.remove('cl_visible');
	} 
	else {
		morebox.classList.add('cl_visible');
	}
}

function errorPage(){
	setTimeout(function() {
	  	window.location.href = "https://www.htmlhorse.com";
	}, 3000);
}

function addAllBps(){


    addBp("./bp/bp_home","bp_home","For simple homepage.")
    addBp("./bp/bp_bp","bp_blueprints","For blueprints page, ironic.")
    addBp("./bp/bp_backgroundvideo","bp_backgroundvideo","For pages with video background.")
    addBp("./bp/bp_randomizer","bp_randomizer","For seed based random number generator.")
    addBp("./bp/bp_blackjack","bp_blackjack","For blackjack gamble game.")
    addBp("./bp/bp_sf6","bp_sf6","Dedicated for street fighter 6.")
    addBp("./bp/bp_clickcounter","bp_clickcounter","For click counter.")
    addBp("./bp/bp_wiki_mixedup","bp_wiki_mixedup","For the mod Mixed-up.")
    addBp("./bp/bp_designshop","bp_designshop","For the design of a shopping page.")
	addBp("./bp/bp_game","bp_game","For the interactive game.")
	addBp("./bp/bp_shipwrecked","(WIP) bp_shipwrecked","For example game shipwrecked where you think carefully and survive");
	addBp("./bp/bp_space","(WIP) bp_space","For simulation of space traveling");
	addBp("./bp/bp_givethephone","bp_givethephone","For the ' giving the phone to x' game");
	addBp("./bp/bp_jackpot","bp_jackpot","For the jackpot simulation game");
	addBp("./bp/bp_potionmake","bp_potionmake","(WIP) For the potion crafting game");
	addBp("./bp/bp_popupnotif","bp_popupnotif","(WIP) For the example popup notification");
	addBp("./bp/bp_vegetablereminder/vegetable_reminder","bp_vegetablereminder","For the project of vegetable reminder app");
	addBp("./bp/bp_euclidean","bp_euclidean ","For the Euclidean  algorithm calculation visualization");
	addBp("./bp/bp_wordguesser","bp_wordguesser ","For the word guesser game");
	addBp("./bp/bp_chat","bp_chat ","(WIP) For the chatting game");
	addBp("./bp/bp_citygame","bp_citygame ","(WIP) For the city sim game");
	addBp("./bp/bp_scripts","bp_scripts ","For small scripts/apps");


}

var lastBpHref = "";
function addBp(href,title,desc){
    let list = document.getElementById("id_middle");
    if(list){
    	theText = '<a class="cl_bp_block" href="'+href+'"><i>'+title+'</i><br>'+desc+'</br></a>';
    	list.innerHTML = theText +list.innerHTML;
	}
    lastBpHref = href;
}

function gotoLastBp(){
	addAllBps();
	window.location.href = lastBpHref;
}