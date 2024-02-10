document.addEventListener("DOMContentLoaded", function() {
  var dropdown = document.getElementById("id_wordsize");
  
  for (var i = 4; i <= 25; i++) {
    var option = document.createElement("option");
    option.text = i;
    option.value = i;
    dropdown.add(option);
  }

  dropdown.addEventListener("change", function() {
    resetWord();
  });
});

function resetWord(){
  var dropdown = document.getElementById("id_wordsize");
  console.log("Resetted");
  var selectedOption = dropdown.options[dropdown.selectedIndex].value;
  console.log("Selected option: " + selectedOption);
  addDigits(selectedOption);
}

function addDigits(n){
  var digitdiv = document.getElementById("id_digits");
  digitdiv.innerHTML = "";

  for (var i = 1; i <= n; i++) {
    let inputElement = document.createElement("input");
    inputElement.setAttribute("type", "number");
    inputElement.setAttribute("class", "cl_digit");
    inputElement.setAttribute("id", `id_digit_${i}`);
    digitdiv.appendChild(inputElement);
  }
}

function setWordCount(n){
  let div1 = document.getElementById("id_length_1");
  let div2 = document.getElementById("id_length_2");
  let div3 = document.getElementById("id_length_3");

  if (n === 1) {
    div1.style.display = "none"
    div2.style.display = "none"
    div3.style.display = "none"
  }
  if (n === 2) {
    div1.style.display = "inline-block"
    div2.style.display = "inline-block"
    div3.style.display = "none"
  }
  if (n === 3) {
    div1.style.display = "inline-block"
    div2.style.display = "inline-block"
    div3.style.display = "inline-block"
  }
}