const previousValue = document.querySelector(".previous_value");
const currentValue = document.querySelector(".current_value");
const allClear = document.querySelector("#ac");
const del = document.querySelector("#del");
const equalBtn = document.querySelector("#equal");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

let previousData = "";
let currentData = "";
let operator = "";

// clear output field
allClear.addEventListener("click", function () {
  previousValue.innerHTML = "";
  currentValue.innerHTML = "";
  operator = "";
  displayResult();
});

del.addEventListener("click", function () {
  currentData = currentData.slice(0, -1);
  displayResult();
});

// assign values
function assignValues(value) {
  currentData += value;
}

// get numbers
numbers.forEach((number) => {
  number.addEventListener("click", function () {
    if (number.textContent === "." && currentData.includes(".")) {
      return;
    }
    assignValues(number.textContent);
    displayResult();
  });
});

// operators
function operatorText(value) {
  if (previousData) {
    previousData = calculation();
  } else {
    previousData = currentData;
  }
  operator = value;
  currentData = "";
}

// operations
operators.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", function () {
    if (!currentData) {
      return;
    }
    operatorText(operatorBtn.textContent);
    displayResult();
  });
});

// equal operation

equalBtn.addEventListener("click", function () {
  if (!previousData) {
    return;
  }
  if (currentData) {
    currentData = calculation();
  } else {
    currentData = previousData;
  }
  previousData = "";
  operator = "";
  displayResult();
});

function formateNumbers(numbers) {
  const num = Number(numbers).toLocaleString("en");
  if (num !== "0") {
      return num
  } else {
    return "";
  }
}

// show output to display
function displayResult() {
  currentValue.innerHTML = formateNumbers(currentData);
  previousValue.innerHTML = `${previousData} ${operator}`;
}

// calculation

function calculation() {
  switch (operator) {
    case "/":
      return Number(previousData) / Number(currentData);
      break;
    case "+":
      return Number(previousData) + Number(currentData);
      break;
    case "-":
      return Number(previousData) - Number(currentData);
      break;
    case "*":
      return Number(previousData) * Number(currentData);
      break;
    case "%":
      return Number(previousData) * (Number(currentData) / 100);
      break;
  }
}
