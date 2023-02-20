import React from "react";

const Input = (props) => {
    return (
        <input
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
        >
{props.children}
        </input>
    )
}
export default Input;