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