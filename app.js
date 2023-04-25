// Selecting elements.
const firstNumberEle = document.querySelector("#firstNumber");
const operatorEle = document.querySelector("#operator");
const secondNumberEle = document.querySelector("#secondNumber");
const inputEle = document.querySelector("#input");
const resultEle = document.querySelector("#result");
const menuBar = document.querySelector(".menu");
const counter = document.querySelector(".counter");

// Variable.
let randomNumberOne,
  randomNumberTwo,
  result,
  MIN,
  MAX,
  questionNumber = 1;

const updateCounter = function () {
  // the counter element in html whenver change happens
  counter.textContent = questionNumber;
};

const resetCounter = function () {
  // Reset the counter whenever the operation is changed or the digit
  // size is changed.
  questionNumber = 1;
  updateCounter();
  // console.log(questionNumber);
};

const incrementCounter = function () {
  // Increase the question counter whenever a question is solved
  questionNumber++;
  updateCounter();
  // console.log(questionNumber);
};

// icon for correct input
const correctHtml = `<i class="fa fa-solid fa-circle-check" style="font-size: 5rem; color: green"></i>`;
// icon for wrong input
const wrongHtml = `<i class="fa fa-solid fa-circle-xmark" style="font-size: 5rem; color: red"></i>`;

// Swap the two random Numbers.
function swapNumber() {
  const temp = randomNumberOne;
  randomNumberOne = randomNumberTwo;
  randomNumberTwo = temp;
}

// Generate 2 random numbers
function generateQuestion() {
  randomNumberOne = getRandomNumber();
  randomNumberTwo = getRandomNumber();
  // if firstNumber is less than secondNumber, swap the numbers.
  if (randomNumberOne < randomNumberTwo) swapNumber();
  result = getResult();
}

// Display the question in WebPage.
function displayNumbers() {
  // Generate the random Numbers
  generateQuestion();
  inputEle.value = "";
  counter.textContent = questionNumber;  // displays the counter of questions done.
  firstNumberEle.textContent = randomNumberOne;
  secondNumberEle.textContent = randomNumberTwo;
}

// Multiplication operation
function multiplication(first, second) {
  return first * second;
}

// Addition operation
function addition(first, second) {
  return first + second;
}

// Substraction operation.
function substraction(first, second) {
  return first - second;
}

// Division operation.
function division(first, second) {
  return Number((first / second).toFixed(2));
}

// Calculate the result for a respective operation.
function getResult() {
  const currentOperator = operatorEle.textContent;
  switch (currentOperator) {
    case "X":
      return multiplication(randomNumberOne, randomNumberTwo);
    case "+":
      return addition(randomNumberOne, randomNumberTwo);
    case "-":
      return substraction(randomNumberOne, randomNumberTwo);
    case "/":
      return division(randomNumberOne, randomNumberTwo);
    default:
      return undefined;
  }
}

// After Selecting the operation show the operator
function selectOperator(n) {
  switch (n) {
    case 1:
      operatorEle.textContent = "X";
      break;
    case 2:
      operatorEle.textContent = "+";
      break;
    case 3:
      operatorEle.textContent = "-";
      break;
    case 4:
      operatorEle.textContent = "/";
      break;
    default:
      console.log("Operation not supported!");
  }
  // after selecting operation call display number
  // to get a new set of numbers and its result.
  displayNumbers();
}

function changeMinMax(n) {
  switch (n) {
    case 3:
      MIN = 100;
      MAX = 1000;
      break;
    default:
      MIN = 10;
      MAX = 100;
  }
  displayNumbers();
}
// Generate random number.
function getRandomNumber() {
  return Math.floor(Math.random() * (MAX - MIN) + MIN);
}

// Remove the result icon.
function removeResult() {
  resultEle.innerHTML = "";
}

// Check the input provided by the user.
function check() {
  if (Number(inputEle.value) === result) {
    resultEle.innerHTML = correctHtml;
    incrementCounter();
    displayNumbers();
  } else {
    resultEle.innerHTML = wrongHtml;
  }

  // remove the result icon after 3 second
  setTimeout(removeResult, 3000);
}

function main() {
  // Default operator
  selectOperator(1);
  changeMinMax(2);
  displayNumbers();
}

////////////////////////////
//////Event Handling///////
//////////////////////////
menuBar.addEventListener("click", (e) => {
  if (e.target.classList.contains("menu-btn")) {
    resetCounter();
  } else {
    return;
  }
});

main();
