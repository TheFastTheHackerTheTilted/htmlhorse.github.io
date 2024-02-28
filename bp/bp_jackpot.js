var balance = 100;
var totalspent = 0;
var rollprice = 5;
var rollDuration = 100;

function startRoll(){
  if (balance>=rollprice) {
    balance = balance-rollprice
    document.getElementById("id_bal").innerText = balance;
    totalspent = totalspent+rollprice
    document.getElementById("id_spent").innerText = totalspent;

    unlockRows();

    getNewValue("1",0);
    getNewValue("2",0);
    getNewValue("3",0);
  }
}

function insertToRow(rowId, value){
    // Get the row element
    var row = document.getElementById("id_row_" + rowId);
    
    // Get the child elements of the row
    var blocks = row.getElementsByClassName("cl_resblock");
    
    // Update the content of each block
    blocks[2].textContent = blocks[1].textContent;
    blocks[1].textContent = blocks[0].textContent;
    blocks[0].textContent = value;
}
const soundClick = new Audio("./bp_jackpot/click.wav");
const soundLocking = new Audio("./bp_jackpot/locking.wav");

function getNewValue(rowId,rollNumber){
  let rerollchance = Math.random();
  if (rerollchance <= 1-(rollNumber*0.001)){
    soundClick.play();
    insertToRow(rowId,getRandomValue());
    setTimeout(function() {
      getNewValue(rowId,rollNumber+1)
    }, rollDuration+(rollNumber*5))
  }
  else{
    lockRow(rowId);
    soundLocking.play();
  }
}

function lockRow(rowId){
  var row = document.getElementById("id_rowmid_" + rowId);
  row.classList.add("cl_lockedrow")
  checkAllLocked();
}

function checkAllLocked(){
  var e1 = document.getElementById("id_rowmid_1");
  var e2 = document.getElementById("id_rowmid_2");
  var e3 = document.getElementById("id_rowmid_3");

  if (e1.classList.contains("cl_lockedrow") & e2.classList.contains("cl_lockedrow")& e3.classList.contains("cl_lockedrow")) {
      getCombo();
  }
}

function getCombo(){
  var e1 = document.getElementById("id_rowmid_1").innerText;
  var e2 = document.getElementById("id_rowmid_2").innerText;
  var e3 = document.getElementById("id_rowmid_3").innerText;
  let vallist = []
  vallist.push(e1)
  vallist.push(e2)
  vallist.push(e3)

  console.log("get all values and reward player: ")
  console.log(vallist)
  if(checkifhas3(vallist,"💰")){addBal(rollprice*100000);}
  else if(checkifhas2(vallist,"💰")){addBal(rollprice*10000);}
  else if(checkifhas3(vallist,"💲💲💲")){addBal(rollprice*1000);}
  else if(checkifhas2(vallist,"💲💲💲")){addBal(rollprice*250);}
  else if(checkifhas3(vallist,"💲")){addBal(rollprice*200);}
  else if(checkifhas2(vallist,"💲")){addBal(rollprice*50);}
  else if(checkifhas3(vallist,"100X")){addBal(rollprice*100);}
  else if(checkifhas2(vallist,"100X")){addBal(rollprice*20);}
  else if(checkifhas3(vallist,"10X")){addBal(rollprice*10);}
  else if(checkifhas2(vallist,"10X")){addBal(rollprice*2);}
  else if(checkifhas3(vallist,"5X")){addBal(rollprice*5);}
  else if(checkifhas3(vallist,"3X")){addBal(rollprice*3);}
  else if(checkifhas3(vallist,"2X")){addBal(rollprice*2);}
  else if(checkifhas3(vallist,"1.5X")){addBal(rollprice*1.5);}
  else{console.log("No winners")}
}

function checkifhas3(thelist,value){
  let counter = 0;
  for (var i = thelist; i <= 2 ; i++) {
    if(thelist[i] == value){ counter+=1;}
  }
  if (counter >=3) {return true;}
  else {return false;}
}

function checkifhas2(thelist,value){
  let counter = 0;
  for (var i = thelist; i <= 2 ; i++) {
    if(thelist[i] == value){ counter+=1;}
  }
  if (counter ==2) {return true;}
  else {return false;}
}

function addBal(value){
  balance = balance+value;
  document.getElementById("id_bal").innerText = balance;
}

function unlockRows(){
  document.getElementById("id_rowmid_1").classList.remove("cl_lockedrow");
  document.getElementById("id_rowmid_2").classList.remove("cl_lockedrow");
  document.getElementById("id_rowmid_3").classList.remove("cl_lockedrow");
}

function getRandomValue(){
  let value = Math.floor(Math.random() * 99999 +1);
  if (value === 100000) {
    return "💰";
  }
  else if(value >99500){
    return "💲💲💲"
  }
  else if(value >99000){
    return "💲"
  }
  else if(value >95000){
    return "100X"
  }
  else if(value >90000){
    return "10X"
  }
  else if(value >80000){
    return "5X"
  }
  else if(value >65000){
    return "3X"
  }
  else if(value >45000){
    return "2X"
  }
  else {return "1.5X"}
}