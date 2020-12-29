const billRef = document.querySelector("#bill");
const continueBtnRef = document.querySelector("#continue");
const cashDivRef = document.querySelector("#cash-div");
const computeBtn = document.querySelector("#compute");
const cashRef = document.querySelector("#cash");
const moneyRef = document.querySelector("#money");
const resetBtn = document.querySelector("#reset");

var bill = 0;
var cash = 0;
var money = 0;

var notes = [2000, 500, 100, 20, 10, 5, 1];
var noteCtr = [0, 0, 0, 0, 0, 0, 0];

function showNotes(noteCtr) {
  document.querySelector("#output-div").style.display = "inherit";

  for (var i = 0; i < 7; i++) {
    if (noteCtr[i] > 0) {
      var block = document.querySelector("#note" + notes[i]);
      block.style.display = "inherit";
      document.querySelector("#note-val-" + notes[i]).innerText =
        noteCtr[i] + "x";
      noteCtr[i] = 0;
    } else {
      document.querySelector("#note" + notes[i]).style.display = "none";
    }
  }
}

function compute(bill, cash) {
  money = cash - bill;
  var showMoney = money;

  for (var i = 0; i < 7 && money > 0; i++) {
    while (money >= notes[i]) {
      money -= notes[i];
      noteCtr[i]++;
    }
  }

  if (showMoney > 0) {
    moneyRef.innerText = "₹" + showMoney;
    showNotes(noteCtr);
  } else {
    alert("Please collect more cash!");
  }
}

function billClickHandler() {
  bill = Number(billRef.value);

  if (bill <= 0) {
    alert("Please enter correct bill amount!");
  } else {
    cashDivRef.style.display = "inherit";
    computeBtn.style.display = "inherit";
    continueBtnRef.style.display = "none";
    resetBtn.style.display = "inherit";
  }
}

function cashClickHandler() {
  cash = Number(cashRef.value);
  bill = Number(billRef.value);
  compute(bill, cash);
}

function resetClickHandler() {
  document.querySelector("#output-div").style.display = "none";
  computeBtn.style.display = "none";
  cashDivRef.style.display = "none";
  resetBtn.style.display = "none";
  continueBtnRef.style.display = "inherit";
  billRef.value = "";
  cashRef.value = "";
}

continueBtnRef.addEventListener("click", billClickHandler);
computeBtn.addEventListener("click", cashClickHandler);
resetBtn.addEventListener("click", resetClickHandler);
