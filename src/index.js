const billRef = document.querySelector("#bill");
const continueBtnRef = document.querySelector("#continue");
const cashDivRef = document.querySelector("#cash-div");
const computeBtn = document.querySelector("#compute");
const cashRef = document.querySelector("#cash");
const moneyRef = document.querySelector("#money");
const resetBtn = document.querySelector("#reset");
const outputDiv = document.querySelector("#output-div");

let bill = 0;
let cash = 0;
let money = 0;

let notes = [2000, 500, 100, 20, 10, 5, 1];
let noteCtr = [0, 0, 0, 0, 0, 0, 0];

function setDisplay(listOfRef, value) {
  listOfRef.forEach((ref) => {
    ref.style.display = value;
  });
}

function showNotes(noteCtr) {
  setDisplay([outputDiv], "inherit");

  notes.forEach((note, index) => {
    if (noteCtr[index] > 0) {
      let block = document.querySelector("#note" + note);
      setDisplay([block], "inherit");
      document.querySelector("#note-val-" + note).innerText =
        noteCtr[index] + "x";
      noteCtr[index] = 0;
    } else {
      let block = document.querySelector("#note" + note);
      setDisplay([block], "none");
    }
  });
}

function compute(bill, cash) {
  money = cash - bill;
  let showMoney = money;

  for (let i = 0; i < 7 && money > 0; i++) {
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
    setDisplay([cashDivRef, computeBtn, resetBtn], "inherit");
    setDisplay([continueBtnRef], "none");
  }
}

function cashClickHandler() {
  cash = Number(cashRef.value);
  bill = Number(billRef.value);
  compute(bill, cash);
}

function resetClickHandler() {
  setDisplay([computeBtn, cashDivRef, resetBtn, outputDiv], "none");

  setDisplay([continueBtnRef], "inherit");
  billRef.value = "";
  cashRef.value = "";
}

continueBtnRef.addEventListener("click", billClickHandler);
computeBtn.addEventListener("click", cashClickHandler);
resetBtn.addEventListener("click", resetClickHandler);
