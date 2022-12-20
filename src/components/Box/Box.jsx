import React from "react";
import "./style.css"

const Box = ({id, isOpen, image, width, height }) => {
    const style = {
        box: {
            width: width ? width : "100px",
            height: height ? height : "100px"
        }
    }
    return (
        <div 
            className={`box ${isOpen ? "test" : ""}`} 
            id={`box-${id}`}
            data-box={id}
            style={style.box}
        >
            {
                image && isOpen ? (
                    <img src={require(`../../assets/images/${image}`)?.default} alt="box"/>
                ) : null
            }
        </div>
    )
}

export default Box;