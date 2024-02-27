function startRoll(){
  unlockRows();
  getNewValue("1",0);
  getNewValue("2",0);
  getNewValue("3",0);
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
    }, 100+(rollNumber*5))
  }
  else{
    lockRow(rowId);
    soundLocking.play();
  }
}

function lockRow(rowId){
  var row = document.getElementById("id_rowmid_" + rowId);
  row.classList.add("cl_lockedrow")
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
  else {return "1X"}
}