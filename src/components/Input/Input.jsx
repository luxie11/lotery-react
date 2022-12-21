import React from "react";
import "./style.css";

const Input = ({value, placeholder, type, onChange, disabled}) => {
    return (
        <div className="ui input input-width">
            <input type={type} placeholder={placeholder} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}

export default Input;