let num1 = 0;
let num2 = 0;
let currentOperator = "";

const clearButton = document.querySelector("#clear");
const backButton = document.querySelector("#backspace");
const signButton = document.querySelector("#sign");
const display = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");


// clearButton.addEventListener()
clearButton.addEventListener("click", handleClear);
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

function operator(a, b, op) {
    switch (op){
        case "+": return add(a,b);
        case "-": return subtract(a,b);
        case "*": return multiply(a,b);
        case "/": return divide(a,b);
        default: return null;
    }
}

function handleDigitClick(event){
    let displayNum = Number(event.target.textContent);
    if (currentOperator == "")
    {
        updateDisplay(displayNum);
        num1 = Number(display.textContent);
    }
    else if (num2 == 0){
        display.textContent = 0;
        updateDisplay(displayNum);
        num2 = Number(display.textContent);
    }
    else{
        updateDisplay(displayNum);
        num2 = Number(display.textContent);
    }

}

function handleOperatorClick(event){
    let eventOp = event.target.textContent;
    let displayNum = Number(display.textContent);
    if (currentOperator == "")
    {
        num1 = displayNum;
        currentOperator = eventOp;
    }
    else
    {
        num1 = operator(num1,num2,currentOperator);
        display.textContent = num1;
        num2 = 0;
        if (eventOp == "=")
            currentOperator = ""
        else
            currentOperator = eventOp;
    }
}

function handleClear(event) {
    display.textContent = 0;
    num1 = 0;
    num2 = 0;
    currentOperator = "";
}

function updateDisplay(num){
    if (display.textContent == 0)
        display.textContent = num;
    else
        display.textContent += num;
}
