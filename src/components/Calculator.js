import React, { useState } from "react";
import { evaluate } from 'mathjs';

const Calculator = () => {
    const [expression, setExpression] = useState("");
    const [result, setResult] = useState("");

    const formSubmitHandler = (e) => {
        e.preventDefault();
    };

    const updateExpression = (value) => {
        setExpression((prev) => prev + value);
    };

    const clearHandler = () => {
        setExpression("");
        setResult("");
    };

    const operatorHandler = (operator) => {
        if (expression !== "" && result === "") {
            const lastChar = expression.slice(-1);
            setExpression((prev) =>
                ["+", "-", "*", "/"].includes(lastChar)
                    ? prev.slice(0, -1) + operator
                    : prev + operator
            );
        } else if (result !== "") {
            setExpression(result + operator);
            setResult("");
        }
    };

    const equalHandler = () => {
        try {
            if (expression !== "") {
                setResult(evaluate(expression).toFixed(2));
            }
        } catch (error) {
            setResult("Invalid action");
        }
    };

    const buttons = [
        { label: "C", className: "clear", onClick: clearHandler },
        { label: "/", className: "", onClick: () => operatorHandler("/") },
        { label: "*", className: "", onClick: () => operatorHandler("*") },
        { label: "7", className: "", onClick: () => updateExpression("7") },
        { label: "8", className: "", onClick: () => updateExpression("8") },
        { label: "9", className: "", onClick: () => updateExpression("9") },
        { label: "-", className: "", onClick: () => operatorHandler("-") },
        { label: "4", className: "", onClick: () => updateExpression("4") },
        { label: "5", className: "", onClick: () => updateExpression("5") },
        { label: "6", className: "", onClick: () => updateExpression("6") },
        { label: "+", className: "plus", onClick: () => operatorHandler("+") },
        { label: "1", className: "", onClick: () => updateExpression("1") },
        { label: "2", className: "", onClick: () => updateExpression("2") },
        { label: "3", className: "", onClick: () => updateExpression("3") },
        { label: "0", className: "", onClick: () => updateExpression("0") },
        { label: "00", className: "", onClick: () => updateExpression("00") },
        { label: ".", className: "", onClick: () => updateExpression(".") },
        { label: "=", className: "equal", onClick: equalHandler },
    ];

    return (
        <>
            <div className="container">
                <form onSubmit={formSubmitHandler} name="calc" className="calculator">
                    <input
                        type="text"
                        className="value"
                        readOnly
                        name="txt"
                        value={result !== "" ? result : expression}
                    />

                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            className={`num ${button.className}`}
                            onClick={button.onClick}
                        >
                            <i>{button.label}</i>
                        </button>
                    ))}
                </form>
            </div>
        </>
    );
};

export default Calculator;
