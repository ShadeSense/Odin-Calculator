import {Queue} from './queue';

function add(x, y){
    return (x + y).toString();
}

function subtract(x, y){
    return (x - y).toString();
}

function multiply(x, y){
    return (x * y).toString();
}

function divide(x, y){
    if(x == 0){
        return "Cannot divide by 0";
    }

    return (x / y).toString();
}

function operate(op, x, y){
    switch (op){
        case '+':
            return add(x, y);
            break;
        case '-':
            return subtract(x, y);
            break;
        case '*':
            return multiply(x, y);
            break;
        case '/':
            return divide(x, y);
            break;
        default:
            console.log("Expression is invalid!");
            return 0;
    }
}

function calculate(){
    /* Add event listener for display screen */
    /* Call queue accordingly */

    /* Once '=' is clicked, parse expression */
}

/* ignore repeated operations (peek queue to check if operation was used) */