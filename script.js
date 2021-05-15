const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display");

keys.addEventListener("click", (event) => {
  const key = event.target;
  const keyValue = key.textContent;
  const displayValue = display.textContent;
  const { type } = key.dataset;
  const { previousKeyType } = calculator.dataset;

  // Number key
  if (type === "number") {
    if (displayValue === "0" || previousKeyType === "operator") {
      display.textContent = keyValue;
    } else {
      display.textContent = displayValue + keyValue;
    }
  }

  // Operator key
  if (type === "operator") {
    const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
    operatorKeys.forEach((el) => {
      el.dataset.state = "";
    });
    key.dataset.state = "selected";
    calculator.dataset.firstNumber = displayValue;
    calculator.dataset.operator = key.dataset.key;
  }

  // Equal key
  if (type === "equal") {
    // Perform calculation
    if(display.textContent === '0' || display.textContent ==='NaN'){
      display.textContent = 'NaN'
    }else{
    const firstNumber = calculator.dataset.firstNumber;
    const operator = calculator.dataset.operator;
    const secondNumber = displayValue;
    console.log(firstNumber, operator, secondNumber);
    display.textContent = calculate(firstNumber, operator, secondNumber);
  }

  }


  // Option key
  if (type==="option"){
    display.textContent = '0';
    delete calculator.dataset.firstNumber;
    delete calculator.dataset.operator;
  }
  calculator.dataset.previousKeyType = type;
});

function calculate(firstNumber, operator, secondNumber) {
  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);

  if (operator === "plus") return firstNumber + secondNumber;
  if (operator === "minus") return firstNumber - secondNumber;
  if (operator === "times") return firstNumber * secondNumber;
  if (operator === "divide") return (firstNumber / secondNumber).toFixed(2);
  if (operator === "percent") return firstNumber / 100;
}
