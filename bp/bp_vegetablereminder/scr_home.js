

function closeFeedSelector(){
	var feedSelectorEl = document.getElementById('id_feed_selector');
	feedSelectorEl.style.display = 'none';
}
document.addEventListener("DOMContentLoaded", function() {
	document.getElementById('id_home_button_feed').addEventListener('click', toggleFeedSelector);
})
function toggleFeedSelector() {
	var creditsElement = document.getElementById('id_feed_selector');
	if (creditsElement.style.display === 'none' || creditsElement.style.display === '') {
		creditsElement.style.display = 'flex';
	} else {
		creditsElement.style.display = 'none';
	}
}

function avatar_interact(){
	const soundMeow = new Audio("./assets/snd_meow.mp3");
    soundMeow.play();
}

function updateMainProgressbar(){

	let prg = getAvgVit();
	console.log("pbar updated %"+prg)
	document.getElementById('id_pbar_health').style.width = `${prg}%`;
}