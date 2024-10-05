import React, { useState } from "react";

const Calculator = () => {
  const [num, setNum] = useState("0");
  const [prevOperator, setPrevOperator] = useState(null);
  const [isResultDisplayed, setIsResultDisplayed] = useState(false);
  const [formula, setFormula] = useState("");

  const buttonHandler = (e) => {
    const input = e.target.value;

    if (isResultDisplayed) {
      setNum(input);
      setFormula(input);
      setIsResultDisplayed(false);
      return;
    }

    if (input === "0" && num === "0") return;

    if (input === "." && num.includes(".")) return;

    setNum(num === "0" ? input : num + input);
    setFormula(formula + input);
  };

  const buttonClearHandler = () => {
    setNum("0");
    setPrevOperator(null);
    setFormula("");
    setIsResultDisplayed(false);
  };

  const calculateHandler = () => {
    try {
      const result = parseFloat(eval(formula).toFixed(4));
      setNum(result.toString());
      setFormula(result.toString());
      setIsResultDisplayed(true);
    } catch (error) {
      console.log("error has occurred", error);
      setNum("error");
      setTimeout(() => {
        buttonClearHandler();
      }, 1000);
    }
  };

  const operatorHandler = (e) => {
    const operator = e.target.value;

    if (isResultDisplayed) {
      setFormula(num + operator);
      setIsResultDisplayed(false);
    } else {
      if (/[\+\-\*\/]$/.test(formula)) {
        if (operator === "-") {
          if (!/[\+\-\*\/]-$/.test(formula)) {
            setFormula(formula + operator);
          }
        } else {
          setFormula(formula.slice(0, -1) + operator);
        }
      } else if (/[\d]$/.test(formula)) {
        setFormula(formula + operator);
      }
    }

    setPrevOperator(operator);
    setNum("0");
  };

  return (
    <>
      <div className="wrapper">
        <div className="calculator">
          <div id="display" aria-readonly>
            {num}
          </div>
          <div className="buttons">
            <button id="seven" value={7} onClick={buttonHandler}>
              7
            </button>
            <button id="eight" value={8} onClick={buttonHandler}>
              8
            </button>
            <button id="nine" value={9} onClick={buttonHandler}>
              9
            </button>
            <button id="divide" value="/" onClick={operatorHandler}>
              /
            </button>
            <button id="four" value={4} onClick={buttonHandler}>
              4
            </button>
            <button id="five" value={5} onClick={buttonHandler}>
              5
            </button>
            <button id="six" value={6} onClick={buttonHandler}>
              6
            </button>
            <button id="multiply" value="*" onClick={operatorHandler}>
              x
            </button>
            <button id="one" value={1} onClick={buttonHandler}>
              1
            </button>
            <button id="two" value={2} onClick={buttonHandler}>
              2
            </button>
            <button id="three" value={3} onClick={buttonHandler}>
              3
            </button>
            <button id="subtract" value="-" onClick={operatorHandler}>
              -
            </button>
            <button id="zero" value={0} onClick={buttonHandler}>
              0
            </button>
            <button id="decimal" value="." onClick={buttonHandler}>
              .
            </button>
            <button id="equals" onClick={calculateHandler}>
              =
            </button>
            <button
              id="add"
              className="add-btn"
              value="+"
              onClick={operatorHandler}
            >
              +
            </button>
            <button id="clear" onClick={buttonClearHandler}>
              C
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
