import {Queue} from './queue';

class Calculator{
    add(x, y){
        return (x + y).toString();
    }

    subtract(x, y){
        return (x - y).toString();
    }

    multiply(x, y){
        return (x * y).toString();
    }

    divide(x, y){
        if(x == 0){
            alert("Cannot divide by 0! Calculator is now cleared!");
            let clear = querySelector("#btn-clear");
            clear.click();
            return console.log("Cannot divide by 0");
        }

        return (x / y).toString();
    }

    operate(op, x, y){
        switch (op){
            case "+":
                return add(x, y);
                break;
            case "-":
                return subtract(x, y);
                break;
            case "*":
                return multiply(x, y);
                break;
            case "/":
                return divide(x, y);
                break;
            default:
                console.log("Expression is invalid!");
                return 0;
        }
    }
}

const calculator = new Calculator();
const queue = new Queue();
queue.enqueue("0");
queue.enqueue("+");

/* Display */
let display = querySelector(".display");

/* Keeps track of current amount */
let currNum = "";

/* Sign for negative */
let sign = false;

/* Usage for decimal */
let decimal = false;

/* Number buttons and sign & decimal */
let numberEle = querySelectorAll(".num");

/* Operator buttons and clear*/
let opEle = querySelectorAll(".op");

/* Event listener to queue expression */
for(let i = 0; i < numberEle.length; i++){
    numberEle[i].addEventListener("click", () => {
        let item = numberEle[i].textContent;
        if(item === "+/-"){
            bool = !bool;
            if(sign){
                display.textContent = "-" + currNum;
            }
            else{
                display.textContent = currNum;
            }
        }
        else if(item === "."){
            currNum += item;
            decimal = true;
            numberEle[i].disabled = true;
        }
        display.textContent = currNum;
    });
}

/* Event listener for operations and display current result */
for(let i = 0; i < opEle.length; i++){
    opEle[i].addEventListener("click", () => {
        let op = opEle[i].textContent;
        if(op === "C"){
            if(confirm("Are you sure you want to clear?")){
                currNum = 0;
                for(let i = 0; i < queue.length(); i++){
                    queue.dequeue();
                }

                /* Default queue */
                queue.enqueue("0");
                queue.enqueue("+");
                currNum = "";

                display.textContent = currNum;

                let decimal = querySelector("#btn-clear");
                decimal.disabled = false;
            }
        }
        else if(op !== "="){
            let y = numParser();
            let x = queue.dequeue();
            let operator = queue.dequeue();
            let item = calculator.operate(operator, x, y);

            /* Setup for next operation */
            queue.enqueue(item);
            queue.enqueue(op);
        }
        else{
            let y = numParser();
            let x = queue.dequeue();
            let operator = queue.dequeue();
            let item = calculator.operate(operator, x, y);

            display.textContent = item;
            currNum = "";
        }
    })
}


/* Parse string for queue */
function numParser(){
    if(decimal){
        currNum = parseFloat(currNum);
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