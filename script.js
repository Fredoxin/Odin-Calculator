//next thing to do:
// divide by 0 √
// prozent √
// round results√
// display limit√
// css


let firstNumber = null;
let secondNumber = null;
let operator = null;
let operationPerformed = false;

const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".numButton, .operatorButton, .dot, .equalSign, .clearButton, .plusMinus, .percent" )

const operators = document.querySelectorAll(".operatorButton")
const plusMinusButton = document.querySelector(".plusMinus")

function addEventListener(){
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", function(e){

            if(buttons[i].classList.contains("plusMinus")) {
                plusMinus()
            }
            else if(buttons[i].classList.contains("percent")){
                percent()
            }
            else if(buttons[i].classList.contains("clearButton")){
                clear();
            }
            else{
                handleInput(e.target.value) // handles Numbers, dots and operators
        }
        })
    }
}
addEventListener();


function handleInput(value){
   
    if(!isNaN(value)){
        
        handleNumber(value)
    }
    else if (value === ".") { 
        
        if(operationPerformed){ // when user clicks . after a calculation, it will not append the ".". it will start a new calculation and add 0. to the display.
            operationPerformed = false;
            firstNumber = null,
            handleInput("0")
            handleInput(".");
        } 
        else {
            addDot(value)
        }
    }
    else if(value.match(/[-+x/]/)){
       // removeGlow()
        handleOperator(value)       
    }
    else if(value === "=" && firstNumber && secondNumber && operator){ // only allows the calculation to be done if all arguments are provided.
        handleEqual()
    };
 };

 function updateDisplayText(value){ // String - Number - String - Number - String LOL
  //  value = parseFloat(value)  
    if(operationPerformed){
    display.innerText = parseFloat(value.toFixed(4).substring(0, 9));
    }   
    else{
    display.innerText = value.substring(0, 9)
    }
};


function handleEqual() {   
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);
    
    if(secondNumber == 0 && operator == "/"){
        display.innerText = "ERROR";
    } 
    else{
    operationPerformed = true;    
    updateDisplayText(operate(firstNumber, secondNumber, operator))
    firstNumber = display.innerText; // User can continue calculating with last result
    secondNumber = null;
    operator = null;
    
    };
};

function handleOperator(value){
    
    if(firstNumber && secondNumber && operator){ // handles operator click when firstNumber, secondNumber and operator are provided. 
        handleEqual()                            // operator becomes equal
        operator = value;
        addGlow(value)
    }
    else{
        removeGlow()
        operator = value
        operationPerformed = false; // to ensure that user can continue calculating with a floating point number
        addGlow(value)
    }

}

    
function handleNumber(value){

    if(firstNumber == null){   // gives firstNumber a value
        
        firstNumber = value;
        updateDisplayText(value)
       
    }
    else if(firstNumber != null && operator == null){ // appends value to firstnumber or starts new calculation
        
        
        if(operationPerformed){ // starts a new calc, number clicked becomes new firstNumber value. only runs when result is present.
            
            firstNumber = value;
            updateDisplayText(value)
            operationPerformed = false;
        }  
        else {  //add to the firstNumber if no operation was performed or operator is provided  
        firstNumber += value;   
        updateDisplayText(display.innerText + value)
        }
    } 
    else if (operator){ //secondNumber clicks. runs when operator is provided.
            removeGlow();
        if (secondNumber == null) {     // gives the secondNumber a value
            
            secondNumber = value;
            updateDisplayText(value)
        }
        else{                            // appends to the secondNUmber value
            
            secondNumber += value;
            updateDisplayText(display.innerText + value)
        }    
    }
}    
    

function addDot(dot){

    if(firstNumber === null) { //adds decimal point to intial disyplay value "0"
        firstNumber = "0";
        addDot(dot)
    }
    else if(!firstNumber.includes(dot) && secondNumber == null && !operator){ // adds decimal point to firstNumber
        firstNumber += dot;
        display.innerText += dot;
    }
    else if(secondNumber != null && !secondNumber.includes(dot)){  // adds decimal point to secondNumber
        
        secondNumber += dot;
        display.innerText += dot;
    }
}


function operate(firstNumber, secondNumber, operator){
    
    if (operator == "+") {
        return add(firstNumber, secondNumber);
    } else if (operator == "-") {
        return subtract(firstNumber, secondNumber);
    } else if (operator == "x") {
        return multiply(firstNumber, secondNumber);
    } else if (operator == "/") {
        return divide(firstNumber, secondNumber);
    }; 
};


function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function addGlow(value){

  operators.forEach(operator => {
    if(value == operator.innerText){
        operator.classList.add("glow")
    }})
}

function removeGlow(){

    operators.forEach(operator => {
        if(operator.classList.contains("glow")){
            operator.classList.remove("glow")
        }
    })

}

function clear(){
    removeGlow()
    display.innerText = "0";
    firstNumber = null;
    secondNumber = null;
    operator = null;
    operationPerformed = false;

}


function plusMinus() { // adds a minus to a number
    
    if(firstNumber != null && secondNumber == null){
        firstNumber = firstNumber * (-1)
        firstNumber = firstNumber.toString()
        updateDisplayText(firstNumber)
    } 
    else if(secondNumber != null) {

        secondNumber = secondNumber * (-1)
        secondNumber = secondNumber.toString()
        updateDisplayText(secondNumber)
    }
   
}

function percent(){
    if(firstNumber != null && secondNumber == null){
        firstNumber = firstNumber / 100;
        firstNumber = firstNumber.toString();
        updateDisplayText(firstNumber);


    } else if(secondNumber != null){
        secondNumber = secondNumber / 100;
        secondNumber = secondNumber.toString();
        updateDisplayText(secondNumber);
    }
}