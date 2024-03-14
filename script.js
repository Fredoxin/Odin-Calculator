let firstNumber = null;
let secondNumber = null;
let operator = null;

const display = document.querySelector(".display");
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

    if(!isNaN(value)){
        handleNumber(value)
    }
    if (value === ".") { // operator or dot click
         addDot(value)
    }
    if(value != undefined && value.match(/[-+*/]/)){
        
        operator = value;
    }
    if(value === "=" && firstNumber && secondNumber && operator){

        handleEqual()
    }
 
}



function handleEqual() {

      
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);
    display.innerText = operate(firstNumber, secondNumber, operator)
    firstNumber = display.innerText;
    secondNumber = null;
    operator = null;
        

    }




    
function handleNumber(value){

    
    if(firstNumber == null){   // first number click
        console.log("2.")
        firstNumber = value;
        display.innerText = value;
    }
    else if(firstNumber != null && operator == null){ // add to firstnumber
        console.log("3.")   
        firstNumber += value;
        display.innerText += value;


    } else if (operator){ //second number
        
        if (secondNumber == null) {       
            console.log("4.");
            secondNumber = value;
            display.innerText = value;
        }
        
       else{
            console.log("4.1")
            secondNumber += value;
            display.innerText += value;
        } 
        
    }

}    
    




function addDot(dot){

    if(firstNumber === null) {
        firstNumber = "0";
        addDot(dot)
    }
    else if(!firstNumber.includes(dot) && secondNumber == null){
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



 // if(firstNumber == null && secondNumber == null && operator == null && !value){ // initial disyplay value
    //     console.log("1.")
    //     display.innerText = "0"
          
    // };