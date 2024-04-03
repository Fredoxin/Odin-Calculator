let firstNumber = null;
let secondNumber = null;
let operator = null;
let operationPerformed = false;

const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".numButton, .operatorButton, .dot, .equalSign, .clearButton, .plusMinus, .percent" )
const clearButton = document.querySelector(".clearButton")


function buttonClick(){

    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", function(e){

            if(buttons[i].classList.contains("plusMinus")) {
                plusMinus()
                addGlow(buttons[i])
            }
            else if(buttons[i].classList.contains("percent")){
                percent()
                addGlow(buttons[i])
            }
            else if(buttons[i].classList.contains("clearButton")){
                clear();
                clearButtonText()
                addGlow(buttons[i])
            }
            else{
                handleInput(e.target.value) // handles Numbers, dots and operators
                clearButtonText()
                addGlow(buttons[i])
        }
        })
    }
}
    buttonClick();


function addGlow(value){

    buttons.forEach(button => {
        if(button.classList.contains("glow")){
            button.classList.remove("glow")
        }
    })

    if (value.classList.contains("plusMinus") || 
        value.classList.contains("percent") || 
        value.classList.contains("clearButton") ||
        value.classList.contains("numButton") ||
        value.classList.contains("equalSign")||
        value.classList.contains("dot")){

        value.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
        setTimeout(function() {
        value.style.backgroundColor = "";
     }, 100)
} 
else if(value.classList.contains("operatorButton")){
        value.classList.add("glow")
        }   
}

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
       
        handleOperator(value)       
    }
    else if(value === "=" && firstNumber && secondNumber && operator){ // only allows the calculation to be done if all arguments are provided.
        handleEqual()
    };
 };


 
 function updateDisplayText(value){ 
    value = value.toString() // so I can check the length of the value
    
    if(value.length > 9) { // checking length of value
        
        alert("This is a 9 digit calculator. The result has been truncanated") 
    }
    
    if(operationPerformed){
        value = parseFloat(value); // in order to use toFixed on value.
        display.innerText = parseFloat(value.toFixed(4).substring(0, 9))               // add mechanism that shows exponent numbers
        // display.innerText = Number(value).toExponential(6).substring(0, 9);          // add mechanism that ignores "." when substring(0,9)    
        //formatDisyplay()
    }  

    else{
        display.innerText = firstNumber.substring(0, 9)  // had to change value to firstNumber because display.innerText = value.substring(0, 9) would not allow me to enter 0
   // formatDisyplay()                                    // after a decimal point          
        
   if(operator){                                           // had to add this if statement for secondnumbers      
                                                                
            display.innerText = secondNumber.substring(0, 9)
            //formatDisyplay()                                     
        }
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
    }
    else{ 

        operator = value
        operationPerformed = false; 
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
           if(firstNumber.length == 9){
            alert("max 9 digits allowed")
            return
           } 

           else {
            firstNumber += value;   
            updateDisplayText(display.innerText + value)
           }
        
        }
    } 
    else if (operator){ //secondNumber clicks. runs when operator is provided.
        
        if (secondNumber == null) {     // gives the secondNumber a value
            operationPerformed = false; 
            secondNumber = value;
            updateDisplayText(value)
        }
        else{                            // appends to the secondNUmber value
            
            if(secondNumber.length == 9){
                alert("max 9 digits allowed")
                return;  
            } 
            
            else{
            secondNumber += value;
            updateDisplayText(display.innerText + value)
            }
        }    
    }
}    
    
function addDot(dot){

    if(firstNumber === null) { //adds decimal point to intial disyplay value "0"
        firstNumber = "0";
        addDot(dot);
    }
    else if(!firstNumber.includes(dot) && secondNumber == null && !operator && display.innerText.length < 8){ // adds decimal point to firstNumber
        firstNumber += dot;
        display.innerText += dot;
    }
    else if(secondNumber != null && !secondNumber.includes(dot) && display.innerText.length < 8){  // adds decimal point to secondNumber
        
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

function clear(){
     
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


// function formatDisyplay(){

//     if(display.innerText.length > 8){
//         display.style.fontSize = "45px";

//     } else {
//         display.style.fontSize = "90px"
//     }
// }

function clearButtonText() {
    if(display.innerText !== "0") {
        clearButton.innerText = "C";
    } 
    else if(display.innerText == "0" && operationPerformed == false) {
        clearButton.innerText = "AC";
    }
}


