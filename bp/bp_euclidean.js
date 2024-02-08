function addRow(q, x, y, r) {
  var table = document.getElementById("id_euc_table");
  var newRow = table.insertRow(-1); // Insert row at the last position


  var qcell = newRow.insertCell(0);
  qcell.innerHTML = (q);
  var xcell = newRow.insertCell(1);
  xcell.innerHTML = (x);
  var ycell = newRow.insertCell(2);
  ycell.innerHTML = (y);
  var rcell = newRow.insertCell(3);
  rcell.innerHTML = (r);
}

function startCalculate(){
    resetEucTable();
    var numberOne = document.getElementById("id_numberone").value;
    var numberTwo = document.getElementById("id_numbertwo").value;

    numberOne = parseFloat(numberOne);
    numberTwo = parseFloat(numberTwo);

    if (numberOne <= 0 || numberTwo <= 0) {
        document.getElementById("id_gcdresult").innerText = `GCD: No Negative input!`
        return; // Stop execution if any of the numbers is not positive
    }

    getRemainder(Math.max(numberOne, numberTwo), Math.min(numberOne, numberTwo));
}

function getRemainder(x,y){
  let res = x % y;
  console.log(res);
  let multp = Math.floor(x/y);
  
  addRow(multp, x, y, res);
  
  console.log(res + isNaN(res))
  if (y===0 && isNaN(res)) {
    console.log(`finished, gcd(${x})`)
    document.getElementById("id_gcdresult").innerText = `GCD(X): ${x}`
  }
  else if(isNaN(multp) || isNaN(x)){
    document.getElementById("id_gcdresult").innerText = `GCD: possibly wrong input?`
  }
  else{
    setTimeout(function() {
      getRemainder(y, res)
    }, 1000);
  }
}

function resetEucTable(){

  var table = document.getElementById("id_euc_table");

    // Clear the table contents
  table.innerHTML = '';

    // Add the table header row
  var headerRow = table.insertRow();
  var headers = ["Q", "X", "Y", "R"];
  for (var i = 0; i < headers.length; i++) {
    var th = document.createElement("th");
    th.textContent = headers[i];
    headerRow.appendChild(th);
  }
  document.getElementById("id_gcdresult").innerText = `GCD: ...`
}