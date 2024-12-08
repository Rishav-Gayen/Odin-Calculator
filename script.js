const previousOperand = document.querySelector('.previous-operand');
const currentOperand = document.querySelector('.current-operand');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const del = document.querySelector('.delete');
const ac = document.querySelector('.clear');
const equals = document.querySelector('.equals');

let firstOperand = '';
let secondOperand = '';
let currentOperation = null;



function clearCalc() {
    previousOperand.textContent = '';
    currentOperand.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}

function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    if(b === 0) {
        alert('Cannot divide by 0!')
        return;
    };
    return a / b;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function operation(operand1, operator, operand2) {
    operand1 = Number(operand1);
    operand2 = Number(operand2);

    switch (operator) {
        case '+':
            return add(operand1, operand2);
        case '-':
            return subtract(operand1, operand2);
        case 'x':
            return multiply(operand1, operand2);
        case '/':
            return divide(operand1, operand2);
        default:
            return null;
    }
}


ac.addEventListener('click', clearCalc);
del.addEventListener('click', () => {
    if (currentOperand.textContent.length > 1) {
        currentOperand.textContent = currentOperand.textContent.slice(0, -1);
    } else {
        currentOperand.textContent = '0';
    }
});


// Input numbers 

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        if (number.textContent === '.' && currentOperand.textContent.includes('.')) return;
        if(currentOperand.textContent == 0) {
            currentOperand.textContent = number.textContent;
        }
        else {
            currentOperand.textContent += number.textContent;
        }
    })
})


operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if(currentOperand.textContent == '0') return;
        if(currentOperation) {
            result = operation(firstOperand, currentOperation, currentOperand.textContent);
            currentOperand.textContent = roundResult(result);
            firstOperand = currentOperand.textContent;
        }
        else {
            firstOperand = currentOperand.textContent;
        }
        
        currentOperation = operator.textContent;
        currentOperand.textContent = '0';
        previousOperand.textContent = `${firstOperand} ${currentOperation}`;
    })
})

equals.addEventListener('click', () => {
    if(currentOperation == null || currentOperand.textContent == '0') return;
    result = operation(firstOperand, currentOperation, currentOperand.textContent);
    currentOperand.textContent = roundResult(result);
    previousOperand.textContent = '';
    currentOperation = null;
})
