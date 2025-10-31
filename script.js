let currentInput = "";
let previousValue = "";
let currentOperator = "";
let justEvaluated = false;

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

// ✅ Always show full expression
function updateDisplay() {
  let displayString = "";

  if (previousValue) displayString += previousValue;
  if (currentOperator) displayString += " " + currentOperator;
  if (currentInput) displayString += " " + currentInput;

  display.textContent = displayString.trim() || "0";
}

function calculate() {
  if (!previousValue || !currentOperator || !currentInput) return;

  let a = parseFloat(previousValue);
  let b = parseFloat(currentInput);
  let result;

  switch (currentOperator) {
    case "+": result = a + b; break;
    case "-": result = a - b; break;
    case "×": result = a * b; break;
    case "÷":
      if (b === 0) {
        currentInput = "Error";
        updateDisplay();
        resetAll();
        return;
      }
      result = a / b;
      break;
  }

  currentInput = result.toString();
  previousValue = "";
  currentOperator = "";
  justEvaluated = true;
  updateDisplay();
}

function resetAll() {
  currentInput = "";
  previousValue = "";
  currentOperator = "";
  justEvaluated = false;
  updateDisplay();
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const type = button.dataset.type;
    const value = button.textContent;

    if (type === "number") {
      if (justEvaluated) {
        currentInput = value;
        justEvaluated = false;
      } else {
        currentInput += value;
      }
    }

    else if (type === "operator") {
      if (currentInput === "" && previousValue === "") return;

      if (previousValue && currentInput) {
        calculate();
      }

      previousValue = currentInput || previousValue;
      currentInput = "";
      currentOperator = value;
    }

    else if (type === "equals") {
      calculate();
    }

    else if (type === "clear") {
      resetAll();
    }

    else if (type === "delete") {
      if(currentInput) {
          currentInput = currentInput.slice(0, -1);
      }
      else if(currentOperator){
        currentOperator = "";
      }
      else if(previousValue){
          previousValue = previousValue.slice(0, -1);

      }
    }

    else if (type === "decimal") {
      if (!currentInput.includes(".")) {
        currentInput += currentInput ? "." : "0.";
      }
    }

    else if (type === "toggle") {
      if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
      }
    }

    else if (type === "percent") {
      if (currentInput) {
        currentInput = (parseFloat(currentInput) / 100).toString();
      }
    }

    updateDisplay(); 
  });
});

updateDisplay();
