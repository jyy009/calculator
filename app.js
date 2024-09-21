let firstNumber = "";
let secondNumber = "";
let operator = "";
let isOperatorClicked = false;

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const pageContainer = document.querySelector(".page-container");
const calcContainer = document.querySelector(".calc-container");
const displayContainer = document.querySelector(".display-container");
const keypadContainer = pageContainer.querySelector(".keypad-container");
const displayButton = displayContainer.querySelector(".display-button");
const equal = keypadContainer.querySelector(".equal");
const clear = keypadContainer.querySelector(".clear");
const sign = keypadContainer.querySelector(".sign");
const percent = keypadContainer.querySelector(".percentage");
const numbers = keypadContainer.querySelectorAll(".operand");
const operators = keypadContainer.querySelectorAll(".operator");
const point = keypadContainer.querySelector(".point");

const operate = (a, b, oper) => {
  switch (oper) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      const num = divide(a, b);
      return Number(num.toFixed(10));
  }
};

// function when equal is clicked
equal.addEventListener("click", () => {
  if (!firstNumber || !operator) {
    return (displayButton.textContent = "error");
  }
  const a = parseFloat(firstNumber);
  const b = parseFloat(secondNumber);
  const result = operate(a, b, operator);
  displayButton.textContent = result;
  firstNumber = result.toString();
  console.log("operator result:", result);
  console.log("first # after first calc:", firstNumber);
  secondNumber = "";
  operator = "";
});

// function when operators are clicked
operators.forEach((oper) => {
  oper.addEventListener("click", (e) => {
    const operatorValue = e.target.value;

    console.log("Before if:", firstNumber, operator, secondNumber);

    if (firstNumber && secondNumber && operator) {
      const a = parseFloat(firstNumber);
      const b = parseFloat(secondNumber);
      const result = operate(a, b, operator);
      firstNumber = result.toString();
      operator = operatorValue;
      displayButton.textContent = firstNumber;
      secondNumber = "";

      console.log("Intermediate result:", firstNumber);
      console.log("after if:", firstNumber, operator, secondNumber);
    } else {
      operator = operatorValue;
      console.log("operator value:", operator);
      displayButton.textContent = operator;
    }
  });
});

// function when numbers are clicked
numbers.forEach((num) => {
  num.addEventListener("click", (e) => {
    const buttonValue = e.target.value;
    console.log("button value:", typeof buttonValue, buttonValue);

    if (!operator) {
      firstNumber += buttonValue;
      displayButton.textContent = firstNumber;
      console.log("display (first #)", firstNumber);
    } else {
      // displayButton.textContent = "";
      secondNumber += buttonValue;
      displayButton.textContent = secondNumber;
      console.log("display (second #)", secondNumber);
    }
  });
});

// function when clear button is clicked
clear.addEventListener("click", () => {
  isOperatorClicked = false;
  firstNumber = "";
  secondNumber = "";
  operator = "";
  displayButton.textContent = "";
});

// function when negate button is clicked
sign.addEventListener("click", () => {
  const value = displayButton.textContent;
  const negatedValue = value * -1;
  console.log("negated value:", negatedValue);

  if (!operator) {
    firstNumber = negatedValue;
    displayButton.textContent = firstNumber;
    console.log("negated first value:", firstNumber);
  } else {
    secondNumber = negatedValue;
    displayButton.textContent = secondNumber;
    console.log("negated second value:", secondNumber);
  }
});

// function when percentage is clicked
percent.addEventListener("click", () => {
  const value = displayButton.textContent;
  const percent = value / 100;
  displayButton.textContent = percent;
  console.log("percentage:", percent);
});

// function when point is clicked
point.addEventListener("click", () => {
  const pointValue = ".";
  const currentValue = displayButton.textContent;

  if (!currentValue.includes(".")) {
    const newValue = currentValue + pointValue;

    if (!isOperatorClicked) {
      firstNumber = newValue;
      console.log("pointed value:", newValue);
      displayButton.textContent = firstNumber;
    } else {
      secondNumber = newValue;
      console.log("pointed value:", newValue);
      displayButton.textContent = secondNumber;
    }
  }
});
