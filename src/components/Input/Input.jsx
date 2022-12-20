import React from "react";
import "./style.css";

const Input = ({value, placeholder, type, onChange}) => {
    return (
        <div className="ui input input-width">
            <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}

export default Input;