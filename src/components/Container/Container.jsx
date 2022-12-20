import React from "react";
import "./style.css";

const Container = ({children, width, height}) => {
    const style = {
        container: {
            width: width ? width : "700px",
            height: height ? height : "700px"
        }
    }
    return (
        <div className="container" style={style.container}>
            {children}
        </div>
    )
}

export default Container;