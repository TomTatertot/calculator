const DISPLAY_MAX_SIZE = 11;

let firstOperand = null;
let secondOperand = null;
let firstOperator = null;

const clearButton = document.querySelector("#clear");
const backButton = document.querySelector("#backspace");
const signButton = document.querySelector("#sign");
const display = document.querySelector(".display");
const dotButton = document.querySelector("#dot");
const digitButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

clearButton.addEventListener("click", clearCalculator);
dotButton.addEventListener("click", addDot)
digitButtons.forEach(button => button.addEventListener("click", handleDigitClick));
operatorButtons.forEach(button => button.addEventListener("click", handleOperatorClick));


const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b == 0) {
        return "ERROR: Cannot divide by zero!";
    }
    return a / b;
}

function operate(a, b, operator) {
    if (!a)
        a = 0;
    
    if (!b)
        b = 0;

    a = Number(a);
    b = Number(b);
    
    let result = 0;
    switch (operator){
        case "+": 
            result = add(a,b);
            break;
        case "-": 
            result = subtract(a,b);
            break;
        case "*": 
            result = multiply(a,b);
            break;
        case "/": 
            result = divide(a,b);
            break;
        default: 
            result = null;
    }
    
    return result;
}

function handleDigitClick(event){
    let digitClicked = event.target.textContent;
    if (firstOperator && secondOperand == null)
    {
        setDisplay(digitClicked);
        secondOperand = 0;
        return;
    }
    concatDisplay(digitClicked);

}

function handleOperatorClick(event){
    let clickedOperator = event.target.textContent;
    if (firstOperator == null && clickedOperator === "=")
        return;

    if (firstOperator == null)
    {
        firstOperand = getDisplay();
        firstOperator = clickedOperator;
        return;
    }

    secondOperand = getDisplay();
    setDisplay(operate(firstOperand,secondOperand,firstOperator));
    firstOperand = getDisplay();
    secondOperand = null;

    if (clickedOperator === "=")
        firstOperator = null;
    else 
        firstOperator = clickedOperator;
}

function clearCalculator() {
    setDisplay(0);
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
}

function concatDisplay(num){
    if (getDisplay() == 0 && !getDisplay().includes("."))
        setDisplay(num);
    else
        display.textContent += num;

    display.textContent = getDisplay().slice(0,DISPLAY_MAX_SIZE);
}

function addDot(){
    if (getDisplay().includes("."))
        return;
    display.textContent += ".";
}

function setDisplay(value) {
    let valueStr = String(value);
    display.textContent = valueStr.slice(0,DISPLAY_MAX_SIZE);
}

function getDisplay(){
    return display.textContent;
}
