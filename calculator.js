import Queue from './queue.js';

class Calculator{
    add(x, y){
        return x + y;
    }

    subtract(x, y){
        return x - y;
    }

    multiply(x, y){
        return x * y;
    }

    divide(x, y){
        if(x === 0){
            alert("Cannot divide by 0! Calculator is now cleared!");
            let clear = document.querySelector("#btn-clear");
            clear.click();
            location.reload();
        }

        return x / y;
    }

    operate(op, x, y){
        switch (op){
            case "+":
                return this.add(x, y);
                break;
            case "-":
                return this.subtract(x, y);
                break;
            case "*":
                return this.multiply(x, y);
                break;
            case "/":
                return this.divide(x, y);
                break;
            default:
                console.log("Expression is invalid!");
                return 0;
        }
    }
}

const calculator = new Calculator();
const queue = new Queue();
/*
queue.enqueue(0);
queue.enqueue("+");
*/

/* Display */
let display = document.querySelector(".display");

/* Keeps track of current amount */
let currNum = "";

/* Sign for negative */
let sign = false;

/* Usage for decimal */
let decimal = false;

/*  Truncating number without rounding
    (cite: https://stackoverflow.com/questions/4187146/truncate-number-to-two-decimal-places-without-rounding)
    (Author: Guya)
*/
function toFixed(number, fixed) {
    let trunc = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return number.toString().match(trunc)[0];
}

/* Number buttons and sign & decimal */
let numberEle = document.querySelectorAll(".num");

/* Operator buttons and clear*/
let opEle = document.querySelectorAll(".op");

/* Event listener to for number buttons */
for(let i = 0; i < numberEle.length; i++){
    numberEle[i].addEventListener("click", () => {
        /* If any number was pressed after "=" */
        if(queue.length === 1){
            queue.dequeue();
            currNum = "";
            display.textContent = currNum;
        }

        display.textContent = "";
        let item = numberEle[i].textContent;
        if(item === "+/-"){
            sign = !sign;
            if(currNum === ""){
                currNum = "0";
            }
            /*
            if(sign){
                display.textContent = "-" + currNum;
            }
            else{
                display.textContent = currNum;
            }
            */
        }
        else if(item === "."){
            currNum += item;
            decimal = true;
            numberEle[i].disabled = true;
        }
        else{
            currNum += item;
        }

        if(sign){
            display.textContent = "-" + toFixed(currNum, 8);
        }
        else{
            display.textContent = toFixed(currNum, 8);
        }
        //display.textContent = toFixed(currNum, 8);
    });
}

/* Event listener for operations and display current result */
for(let i = 0; i < opEle.length; i++){
    opEle[i].addEventListener("click", () => {
        let op = opEle[i].textContent;
        if(op === "C"){
            currNum = 0;
            for(let i = 0; i < queue.length; i++){
                queue.dequeue();
            }


            /* Default queue */
            /*
            queue.enqueue(0);
            queue.enqueue("+");*/

            currNum = "";

            display.textContent = currNum;
        }
        else if(op !== "="){
            /*
            let y = numParser();
            let x = queue.dequeue();
            let operator = queue.dequeue();
            let item = calculator.operate(operator, x, y);
            */
            /* Setup for next operation */
            /*
            queue.enqueue(item);
            queue.enqueue(op);

            currNum = "";
            */
            /* If any operator was pressed after "=" */
            if(queue.length !== 1){
                let item = numParser();
                queue.enqueue(item);
            }
            queue.enqueue(op);
            currNum = "";
        }
        else{
            if(queue.length === 0 || typeof queue.peekTail === 'string'){
                currNum = "0";
            }

            let item = numParser();
            queue.enqueue(item);

            let total = queue.dequeue();
            while(queue.length !== 0){
                let operator = queue.dequeue();
                let y = queue.dequeue();

                total = calculator.operate(operator, total, y);
            }
            total = +(toFixed(total, 8));
            queue.enqueue(total);
            display.textContent = total;
            currNum = total.toString();

            /*
            let y = numParser();
            let x = queue.dequeue();
            let operator = queue.dequeue();
            let item = calculator.operate(operator, x, y);

            currNum = "";
            */
        }
        /* Clear check comes at the bottom for reset purposes */
        let decimal = document.querySelector("#decimal");
        decimal.disabled = false;
        decimal = false;

        sign = false;
        
    })
}


/* Parse string for queue */
function numParser(){
    if(decimal){
        currNum = +(toFixed(currNum, 8));
    }
    else{
        currNum = parseInt(currNum);
    }

    if(sign){
        currNum *= -1;
    }

    return currNum;
}


/* Add event listener for display screen */
/* Call queue accordingly */

/* Once '=' is clicked, parse expression */

/* SIGN ON CALCULATOR MEANS "S" IN QUEUE */
/* ignore repeated operations (peek queue to check if operation was used) */