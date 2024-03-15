let firstNumber = null;
let secondNumber = null;
let operator = null;
let operationPerformed = false;

const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".numButton, .operatorButton, .dot, .equalSign, .clearButton")
const dot = document.querySelector(".dot").value;
const operators = document.querySelectorAll(".operatorButton")

function addEventListener(){
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", function(e){
            
            if(buttons[i].classList.contains("clearButton")){
                clear();
            }
            else{
            updateDisplay(e.target.innerText)
        }
        })
    }
}
addEventListener();


function updateDisplay(value){
   
    if(!isNaN(value)){

        handleNumber(value)
    }
    if (value === ".") { 
        
        if(operationPerformed){ // when user clicks . after a calculation, it will not append the ".". it will start a new calculation and add 0. to the display.
            operationPerformed = false;
            firstNumber = null,
            updateDisplay("0")
            updateDisplay(".");
            
        } else {
         addDot(value)
        }
    }
    if(value.match(/[-+*/]/)){
        removeGlow()
        if(firstNumber && secondNumber && operator){ // handles operator click when firstNumber, secondNumber and operator are privided. 
            handleEqual()                            // operator becomes equal
            operator = value;
            addGlow(value)
        }
        else{
            operator = value
            addGlow(value)
        }
    };

    if(value === "=" && firstNumber && secondNumber && operator){ // only allows the calculation to be done if all arguments are provided.

        handleEqual()
    };
 };



function handleEqual() {   
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);
    display.innerText = operate(firstNumber, secondNumber, operator)
    firstNumber = display.innerText;
    secondNumber = null;
    operator = null;
    operationPerformed = true;
 }




    
function handleNumber(value){

    if(firstNumber == null){   // gives firstNumber a value
        
        firstNumber = value;
        display.innerText = value;
       
    }
    else if(firstNumber != null && operator == null){ // appends value to firstnumber
        
        
        if(operationPerformed){ // starts a new calc, number clicked becomes new firstNumber value. only runs when result is present.
            
            firstNumber = value;
            display.innerText = value;
            operationPerformed = false;
        } 
        
        else {  //add to the firstNumber if no operation was performed or operator is provided  
        firstNumber += value;   
        display.innerText += value;
        }
    } 
    else if (operator){ //second number clicks. runs when operator is provided.
        removeGlow();
        if (secondNumber == null) {     // gives the secondNumber a value
            
            secondNumber = value;
            display.innerText = value;
        }
        
       else{                            // appends to the secondNUmber value
            
            secondNumber += value;
            display.innerText += value;
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
    } else if (operator == "*") {
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
    }})}

function removeGlow(){

    operators.forEach(operator => {
        if(operator.classList.contains("glow")){
            operator.classList.remove("glow")
        }
    })

}

function clear(){
    display.innerText = "0";
    firstNumber = null;
    secondNumber = null;
    operator = null;
    operationPerformed = false;

}


 // if(firstNumber == null && secondNumber == null && operator == null && !value){ // initial disyplay value
    //     console.log("1.")
    //     display.innerText = "0"
          
    // };