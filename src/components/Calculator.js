import React, { useState } from "react";
import { evaluate } from 'mathjs';

const Calculator = () => {
    const [expression, setExpression] = useState("");
    const [result, setResult] = useState("0");

    const updateExpression = (value) => {
        setExpression((prev) => prev === result ? value : prev + value);
        setResult("");
    };

    const clearHandler = () => {
        setExpression("");
        setResult("0");
    };

    const operatorHandler = (operator) => {
        if (expression !== "") {
            const lastChar = expression.slice(-1);
            setExpression((prev) =>
                ["+", "-", "*", "/"].includes(lastChar)
                    ? prev.slice(0, -1) + operator
                    : prev + operator
            );
        } else if (result !== "0") {
            setExpression(result + operator);
        }
    };

    const equalHandler = () => {
        try {
            if (expression !== "") {
                const newResult = evaluate(expression).toFixed(2).toString();
                setResult(newResult);
                setExpression(newResult);
            }
        } catch (error) {
            setResult("Error");
        }
    };


    const buttons = [
        { label: "C", className: "calculator__button--top", onClick: clearHandler },
        { label: "(", className: "calculator__button--top", onClick: () => updateExpression("(") },
        { label: ")", className: "calculator__button--top", onClick: () => updateExpression(")") },
        { label: "×", className: "calculator__button--right", onClick: () => operatorHandler("*") },
        { label: "7", className: "calculator__button", onClick: () => updateExpression("7") },
        { label: "8", className: "calculator__button", onClick: () => updateExpression("8") },
        { label: "9", className: "calculator__button", onClick: () => updateExpression("9") },
        { label: "÷", className: "calculator__button--right", onClick: () => operatorHandler("/") },
        { label: "4", className: "calculator__button", onClick: () => updateExpression("4") },
        { label: "5", className: "calculator__button", onClick: () => updateExpression("5") },
        { label: "6", className: "calculator__button", onClick: () => updateExpression("6") },
        { label: "-", className: "calculator__button--right", onClick: () => operatorHandler("-") },
        { label: "1", className: "calculator__button", onClick: () => updateExpression("1") },
        { label: "2", className: "calculator__button", onClick: () => updateExpression("2") },
        { label: "3", className: "calculator__button", onClick: () => updateExpression("3") },
        { label: "+", className: "calculator__button--right", onClick: () => operatorHandler("+") },
        { label: "0", className: "calculator__button", onClick: () => updateExpression("0") },
        { label: ".", className: "calculator__button", onClick: () => updateExpression(".") },
        { label: "00", className: "calculator__button", onClick: () => updateExpression("00") },
        { label: "=", className: "calculator__button--right", onClick: equalHandler },
    ];

    return (
        <div className="calculator">
            <div className="calculator__content">
                <span className="calculator__values">{expression}</span>
                <span className="calculator__result">{result}</span>
            </div>
            <div className="calculator__input-area">
                {buttons.map((button, index) => (
                    <button key={index} className={`calculator__button ${button.className}`} onClick={button.onClick}>
                        {button.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Calculator;
