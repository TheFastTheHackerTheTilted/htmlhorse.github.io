function header_expand(){
	var morebox = document.getElementById("id_header_all_buttons");

	if (morebox.classList.contains('cl_visible')) {
    	morebox.classList.remove('cl_visible');
	} 
	else {
		morebox.classList.add('cl_visible');
	}
}