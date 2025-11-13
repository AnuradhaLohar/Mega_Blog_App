import React from 'react'

function Button({ 
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props 
}) {
    return (
        <button className={`active:scale-[0.98] px-4 py-2 rounded-lg w-full cursor-pointer ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button