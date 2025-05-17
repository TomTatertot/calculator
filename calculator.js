const DISPLAY_MAX_SIZE = 13;
const HISTORY_MAX_SIZE = 15;

let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let hasError = false;
let errorMessage = "";

const clearButton = document.querySelector("#clear");
const backButton = document.querySelector("#backspace");
const signButton = document.querySelector("#sign");
const display = document.querySelector(".display");
const history = document.querySelector(".history");
const dotButton = document.querySelector("#dot");
const digitButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const allButtons = document.querySelectorAll("button");

clearButton.addEventListener("click", resetCalculator);
backButton.addEventListener("click", handleBackspace);
signButton.addEventListener("click", reverseSign);
dotButton.addEventListener("click", addDecimal);
digitButtons.forEach(button => button.addEventListener("click", processDigitInput));
operatorButtons.forEach(button => button.addEventListener("click", processOperatorInput));
allButtons.forEach(button => button.addEventListener("click",handleButtonClick));
document.addEventListener("keydown", handleKeyPress);


const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

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
        case "x": 
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
}

function processDigitInput(event){
    if (hasError)
        resetCalculator();

    let input = event.target.textContent;
    if (getDisplay() == 0 && !getDisplay().includes("."))
    {
        setDisplay(input);
        return;
    }    
    concatDisplay(input);
}

function processOperatorInput(event){

    if (hasError)
        resetCalculator();
    
    let operatorInput = event.target.textContent;
    if (operatorInput === "=" && firstOperator === null)
    {
        return;
    }

    if (firstOperator === null)
    {
        firstOperand = getDisplay();
        firstOperator = operatorInput;
        setHistory(firstOperand + " " + firstOperator);
        setDisplay(0);
        return;
    }

    secondOperand = getDisplay();
    let result = operate(firstOperand,secondOperand,firstOperator);
    if (result === "error")
    {
        setDisplay(errorMessage);
        return;
    }

    if (operatorInput === "=")
    {
        setHistory(`${getHistory()} ${secondOperand} = `)
        setDisplay(result);
        firstOperand = result;
        firstOperator = null;
        secondOperand = null;
    }
    else
    {
        setHistory(`${result} ${operatorInput}`)
        firstOperator = operatorInput;
    } 
}
 
function handleButtonClick(event){
    const button = event.target;

    playClickSound();
    playClickAnimation(event);
}

function handleKeyPress(event){
    const key = event.key;

    if (["0","1","2","3","4","5","6","7","8","9",".","+","-","=","x","/", "c","Enter","Backspace"].includes(event.key)) {
        playClickSound();
        playClickAnimation(event);
    }

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
      resetCalculator();
    }
  
    if (key === ".") {
      addDecimal();
    }
}


function handleBackspace(){
    if (getDisplay().length > 1)
        setDisplay((getDisplay()).slice(0,-1));
    else
        setDisplay(0);
}

function reverseSign(){
    setDisplay(Number(getDisplay()) * -1);
}

function resetCalculator() {
    setDisplay(0);
    setHistory(0);
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

function addDecimal(){
    if (getDisplay().includes("."))
        return;null
    concatDisplay(".");
}

function playClickSound(){

}

function playClickAnimation(event){
    event.target.classList.add("active");
    setTimeout(() => event.target.classList.remove("active"), 100);
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

function setHistory(value){
    let valueStr = String(value);
    if (hasError)
    {
        history.textContent = valueStr;
        return;
    }
    history.textContent = valueStr.slice(0,HISTORY_MAX_SIZE);
}
function getHistory(){
    return history.textContent;
}