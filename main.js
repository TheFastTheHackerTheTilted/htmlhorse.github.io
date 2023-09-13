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

    addBp("./bp/bp_home.html","bp_home","This blueprint is for simple homepage.")
    addBp("./bp/bp_bp.html","bp_blueprints","This blueprint is for blueprints page, ironic.")
    addBp("./bp/bp_backgroundvideo.html","bp_backgroundvideo","This blueprint is for pages with video background.")
    addBp("./bp/bp_randomizer.html","bp_randomizer","This blueprint is for seed based random number generator.")
    addBp("./bp/bp_blackjack.html","bp_blackjack","This blueprint is for blackjack gamble game.")
    addBp("./bp/bp_sf6.html","bp_sf6","This blueprint is dedicated for street fighter 6.")
    addBp("./bp/bp_clickcounter.html","bp_clickcounter","This blueprint is for click counter.")
    addBp("./bp/bp_wiki_mixedup.html","bp_wiki_mixedup","This blueprint is for the mod Mixedup.")
    addBp("./bp/bp_designshop.html","bp_designshop","This blueprint is for the design of a shopping page.")
	addBp("./bp/bp_game.html","bp_game","This blueprint is for the interactive game.")
	addBp("./bp/bp_shipwrecked.html","bp_shipwrecked","This blueprint is for example game shipwrecked where you think carefully and survive");


}
function addBp(href,title,desc){
    let list = document.getElementById("id_middle");
    theText = '<a class="cl_bp_block" href="'+href+'"><i>'+title+'</i><br>'+desc+'</br></a>';
    list.innerHTML = theText +list.innerHTML;
}