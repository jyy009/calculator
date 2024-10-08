let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let currentDisplayValue = "";

const add = (a, b) => a + b;

const subtract = (a, b) => (a * 10 - b * 10) / 10;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const calcContainer = document.querySelector(".calc-container");
const displayButton = document.querySelector(".current-display");
const equal = calcContainer.querySelector(".equal");
const clear = calcContainer.querySelector(".clear");
const sign = calcContainer.querySelector(".sign");
const percent = calcContainer.querySelector(".percentage");
const numbers = calcContainer.querySelectorAll(".operand");
const operators = calcContainer.querySelectorAll(".operator");
const point = calcContainer.querySelector(".point");

const operate = (a, b, oper) => {
  switch (oper) {
    case "\u002B":
      return add(a, b);
    case "\u2212":
      return subtract(a, b);
    case "\u00D7":
      return multiply(a, b);
    case "\u00F7":
      const num = divide(a, b);
      return Number(num.toFixed(10));
    default:
      throw new Error("Invalid operator");
  }
};

// Set current display value
const setCurrentDisplayValue = (value) => {
  currentDisplayValue = value;
  displayButton.textContent = currentDisplayValue;
  console.log("current display value set to:", currentDisplayValue);
};

const setFirstNumber = (value) => {
  firstNumber = value;
  console.log("first number set to:", firstNumber);
};

const setSecondNumber = (value) => {
  secondNumber = value;
  console.log("second number set to:", secondNumber);
};

// Populate display when clicking number buttons
const getNumberValue = (e) => {
  result = e.target.textContent;
  console.log("result of number click", typeof result);

  if (!currentOperator) {
    setFirstNumber(firstNumber + result);
    setCurrentDisplayValue(firstNumber);
  } else {
    setSecondNumber(secondNumber + result);
    setCurrentDisplayValue(secondNumber);
  }
};

// Set operator value
const setOperator = (e) => {
  if (!firstNumber) {
    console.warn("error");
    setCurrentDisplayValue("error");
    return;
  }
  const value = e.target.textContent;

  if (firstNumber && !currentOperator && !secondNumber) {
    currentOperator = value;
    setCurrentDisplayValue(currentOperator);
  }
  if (firstNumber && currentOperator && secondNumber) {
    console.log("current operator value", currentOperator);
    const result = operate(
      parseFloat(firstNumber),
      parseFloat(secondNumber),
      currentOperator
    );
    setFirstNumber(result);
    currentOperator = value;
    setCurrentDisplayValue(currentOperator);
    secondNumber = "";
    console.log("Operation performed:", result);
  }
};

const handleEqualClick = () => {
  if (!firstNumber) {
    console.warn("error");
    setCurrentDisplayValue("error");
    return;
  } else if (firstNumber && currentDisplayValue && !secondNumber) {
    console.warn("error");
    setCurrentDisplayValue("error");
    return;
  } else {
    const result = operate(
      parseFloat(firstNumber),
      parseFloat(secondNumber),
      currentOperator
    );
    setCurrentDisplayValue(result);
    setFirstNumber(result);
    secondNumber = "";
    currentOperator = "";
    console.log("current operator after equal", currentOperator);
  }
};

const clearCurrentDisplay = () => {
  firstNumber = "";
  secondNumber = "";
  setCurrentDisplayValue("");
  currentOperator = "";
  console.log("calc cleared");
};

const handlePointClick = () => {
  const value = point.textContent;
  console.log("point value:", value);
  console.log("current display value", currentDisplayValue);

  let currentDisplayAsString = currentDisplayValue.toString();

  if (!currentDisplayAsString.includes(".")) {
    const newDisplayValue = currentDisplayAsString + value;
    console.log("current display value", newDisplayValue);
    // setCurrentDisplayValue(newDisplayValue)
    if (!currentOperator) {
      firstNumber = newDisplayValue;
      setCurrentDisplayValue(firstNumber);
    } else {
      secondNumber = newDisplayValue;
      setCurrentDisplayValue(secondNumber);
    }
  }
};

const handlePercentClick = () => {
  const result = currentDisplayValue / 100;
  setCurrentDisplayValue(result);
};

const handleSignClick = () => {
  const result = currentDisplayValue * -1;
  setCurrentDisplayValue(result);

  if (!currentOperator) {
    setFirstNumber(result);
  } else {
    setSecondNumber(result);
  }
};

const main = () => {
  numbers.forEach((num) => {
    num.addEventListener("click", getNumberValue);
  });

  clear.addEventListener("click", clearCurrentDisplay);

  equal.addEventListener("click", handleEqualClick);

  operators.forEach((oper) => {
    oper.addEventListener("click", setOperator);
  });

  point.addEventListener("click", handlePointClick);
  clearCurrentDisplay();

  percent.addEventListener("click", handlePercentClick);

  sign.addEventListener("click", handleSignClick);
};

main();
