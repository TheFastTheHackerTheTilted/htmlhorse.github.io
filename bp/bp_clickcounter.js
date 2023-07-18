var count = 0;

function click_increment(){
	let count_text = document.getElementById("id_count");
	count++;
	count_text.innerText = count;

	count_text.classList.add("animatedDiv");
  	setTimeout(function() {
	    count_text.classList.remove("animatedDiv");
	  }, 1000);
}

