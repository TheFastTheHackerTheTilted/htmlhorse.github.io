document.addEventListener("DOMContentLoaded", function() {
	document.getElementById('id_button_ico_creds').addEventListener('click', toggleCreditsDisplay);
})
function toggleCreditsDisplay() {
	var creditsElement = document.getElementById('id_setting_credits');
	if (creditsElement.style.display === 'none' || creditsElement.style.display === '') {
		creditsElement.style.display = 'block';
	} else {
		creditsElement.style.display = 'none';
	}
}