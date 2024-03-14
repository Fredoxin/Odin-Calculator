let firstNumber = null;
let secondNumber = null;
let operator = null;

const display = document.querySelector(".display");
//const displayValue = "display.innerText;"
const buttons = document.querySelectorAll(".numButton, .operatorButton, .dot, .equalSign, .clearButton")
const dot = document.querySelector(".dot").value;

function addEventListener(){
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", function(e){
            updateDisplay(e.target.innerText)
        })
    }
}
addEventListener()




function updateDisplay(value){

    if(firstNumber == null && secondNumber == null && operator == null && !value){ // initial disyplay value
        console.log("1.")
        display.innerText = "0"
          
    };

    if(!isNaN(value)){
        handleNumber(value)
    }
    

     if (value != undefined && value.match(/[.]/)) { // operator or dot click
        
        if(firstNumber === null) {
            firstNumber = "0";
            addDot(value)
        } 
        else if (!firstNumber.includes(dot) && secondNumber == null) {
            console.log("first dot")
            addDot(value)
            
        }
        if (secondNumber != null && !secondNumber.includes(dot)){
            console.log("second dot")
            addDot(value)
        };
    };

    if(value != undefined && value.match(/[-+*/]/)){
        
        operator = value;

    }

    if(value != undefined && value.match(/["="]/)) {
        console.log("match=")
        if(firstNumber && secondNumber && operator){
        
        firstNumber = parseFloat(firstNumber);
        secondNumber = parseFloat(secondNumber);
        display.innerText = operate(firstNumber, secondNumber, operator)
        //reset
        firstNumber = display.innerText;
        secondNumber = null;
        operator = null;
            }    
        }
   
}





updateDisplay();


    
function handleNumber(value){
    
    if(!isNaN(value) && firstNumber == null){   // first number click
        console.log("2.")
        firstNumber = value;
        display.innerText = value;
    }
    else if(!isNaN(value) && firstNumber != null && operator == null){ // add to firstnumber
        console.log("3.")   
        firstNumber += value;
        display.innerText += value;


    } else if (!isNaN(value) && operator){ //second number
        
        if (secondNumber == null) {       
            console.log("4.");
            secondNumber = value;
            display.innerText = value;
        }
        
       else if(secondNumber != null){
            console.log("4.1")
            secondNumber += value;
            display.innerText += value;
        } 
        
    }

}    
    




function addDot(dot){

    if(!firstNumber.includes(dot) && secondNumber == null){
        console.log(".")
        firstNumber += dot;
        display.innerText += dot;
    }
    else if(secondNumber != null && !secondNumber.includes(dot)){
        console.log("..")
        secondNumber += dot;
        display.innerText += dot;
    }


}

    

 







function operate(firstNumber, secondNUmber, operator){
    
    if (operator == "+") {
        return add(firstNumber, secondNUmber);
    } else if (operator == "-") {
        return subtract(firstNumber, secondNUmber);
    } else if (operator == "*") {
        return multiply(firstNumber, secondNUmber);
    } else if (operator == "/") {
        return divide(firstNumber, secondNUmber);
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
