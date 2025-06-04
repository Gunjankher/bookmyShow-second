import React from 'react'

function Button({
    children,
    type = "button",
    bgcolor = 'blue',
    textColor = 'white',
    className = "",
    ...props

}) {
    return (
        <button
            className={`${className}, ${type}, ${bgcolor}, ${textColor} hover:scale-110 duration-100 ease-in`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button