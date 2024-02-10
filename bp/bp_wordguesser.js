document.addEventListener("DOMContentLoaded", function() {
  var dropdown = document.getElementById("id_wordsize");
  
  for (var i = 4; i <= 25; i++) {
    var option = document.createElement("option");
    option.text = i;
    option.value = i;
    dropdown.add(option);
  }

  resetWord();
  setWordCount(1)
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

  // event listener for: skip to next digit auto
  var inputElements = document.querySelectorAll(".cl_digit");
  inputElements.forEach(function(inputElement, index) {
      inputElement.addEventListener("input", function(event) {
          if (inputElement.value && index < inputElements.length - 1) {
              inputElements[index + 1].focus();
          }
      });
  });


}

function addDigits(n){
  var digitdiv = document.getElementById("id_digits");
  digitdiv.innerHTML = "";

  for (var i = 1; i <= n; i++) {
    let inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("class", "cl_digit");
    inputElement.setAttribute("id", `id_digit_${i}`);
    inputElement.setAttribute("maxlength",1);
    inputElement.setAttribute("size",1);
    digitdiv.appendChild(inputElement);
  }
}

function setWordCount(n){
  let div1 = document.getElementById("id_length_1");
  let div2 = document.getElementById("id_length_2");


  if (n === 1) {
    div1.style.display = "none"
    div2.style.display = "none"

  }
  if (n === 2) {
    div1.style.display = "inline-block"
    div2.style.display = "none"

  }
  if (n === 3) {
    div1.style.display = "inline-block"
    div2.style.display = "inline-block"

  }
}

function addBreak(n) {
    var digitsContainer = document.getElementById("id_digits");
    var inputs = digitsContainer.querySelectorAll("input.cl_digit");
    
    if (n <= 0 || n > inputs.length) {
        console.error("Invalid input index");
        return;
    }

    var br = document.createElement("br");
    br.setAttribute("id","id_linebreak")
    digitsContainer.insertBefore(br, inputs[n]);
}