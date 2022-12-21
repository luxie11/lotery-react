import React from "react";
import "./style.css";

const Button = ({
        color, 
        onClick, 
        title, 
        left, 
        right, 
        basic, 
        style,
        className,
        disabled,
    }) => {
    return (
        <button 
            className={`ui 
                ${color ? color : ""} 
                button 
                ${left ? "left" : ""} 
                ${right ? "right" : ""}
                ${basic ? "basic" : ""}
                ${className ? className : ""}
            `}
            disabled={disabled}
            style={style}
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default Button;