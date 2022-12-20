import React from "react";

const Result = ({link, actionName, resultText}) => (
    <div className="wrapper flex center">
        <div className="text-center">
            <div className="result">
                {resultText}
            </div>
            <div className="result-action">
                <a href={link}>{actionName}</a>
            </div>
        </div>
    </div>
);

export default Result;