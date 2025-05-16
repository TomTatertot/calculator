const DISPLAY_MAX_SIZE = 11;

let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let hasError = false;
let errorMessage = "";

const clearButton = document.querySelector("#clear");
const backButton = document.querySelector("#backspace");
const signButton = document.querySelector("#sign");
const display = document.querySelector(".display");
const dotButton = document.querySelector("#dot");
const digitButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

clearButton.addEventListener("click", resetCalculator);
dotButton.addEventListener("click", addDot)
digitButtons.forEach(button => button.addEventListener("click", processDigitInput));
operatorButtons.forEach(button => button.addEventListener("click", processOperatorInput));
document.addEventListener("keydown", handleKeyPress);

const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    return a / b;
}

function operate(a, b, operator) {
    if (!a)
        a = 0;
    
    if (!b)
        b = 0;

    a = Number(a);
    b = Number(b);
    
    switch (operator){
        case "+": 
            return add(a,b);
        case "-": 
            return subtract(a,b);
        case "*": 
            return multiply(a,b);
        case "/":
            if (b == 0)
            {
                hasError = true;
                errorMessage = "Cannot divide by zero!"
                return "error"
            }
            return divide(a,b);
        default:
            hasError = true;
            errorMessage = "Unknown Operator" 
            return "error";
    }
    
    return result;
}

function processDigitInput(event){
    if (hasError)
        resetCalculator();

    let input = event.target.textContent;

    if (getDisplay() == 0 && input == 0)
        return; 

    if (getDisplay() == 0 && input != 0)
    {
        setDisplay(input);
        return;
    }

    if (firstOperator && secondOperand == null)
    {
        setDisplay(input);
        secondOperand = 0;
        return;
    }
    concatDisplay(input);
}

function processOperatorInput(event){
    if (hasError)
        resetCalculator();
    
    let operatorInput = event.target.textContent;
    if (operatorInput === "=" && secondOperand === null)
        return;

    if (firstOperator === null)
    {
        firstOperand = getDisplay();
        firstOperator = operatorInput;
        return;
    }

    secondOperand = getDisplay();
    let result = operate(firstOperand,secondOperand,firstOperator);
    if (result === "error")
    {
        setDisplay(errorMessage);
        return;
    }
    setDisplay(result);
    firstOperand = getDisplay();
    secondOperand = null;

    if (operatorInput === "=")
        firstOperator = null;
    else 
        firstOperator = operatorInput;
}

function handleKeyPress(event){
    const key = event.key;

    if (!isNaN(key)) {
      processDigitInput({ target: { textContent: key } });
    }
  
    if (["+", "-", "*", "/"].includes(key)) {
      processOperatorInput({ target: { textContent: key } });
    }
  
    if (key === "Enter" || key === "=") {
      processOperatorInput({ target: { textContent: "=" } });
    }
  
    if (key === "Backspace") {
      handleBackspace();
    }
  
    if (key.toLowerCase() === "c") {
      handleClear();
    }
  
    if (key === ".") {
      handleDecimalPoint();
    }
}


function handleBackspace(){
    if (getDisplay().length > 1)
        setDisplay((display.textContent).slice(0,-1));
    else
        setDisplay(0);
}

function resetCalculator() {
    setDisplay(0);
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    hasError = false;
    errorMessage = "";
}

function concatDisplay(char){
    if (getDisplay().length >= DISPLAY_MAX_SIZE)
        return;
    display.textContent += char;
}

function addDot(){
    if (getDisplay().includes("."))
        return;
    concatDisplay(".");
}

function setDisplay(value) {
    let valueStr = String(value);
    if (hasError)
    {
        display.textContent = valueStr;
        return;
    }
    display.textContent = valueStr.slice(0,DISPLAY_MAX_SIZE);
}

function getDisplay(){
    return display.textContent;
}