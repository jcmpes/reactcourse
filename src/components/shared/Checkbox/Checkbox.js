import React from 'react';

function Checkbox({ className, text, ...props }) {

    return (
        <label 
            className={className}
            
        >
            <input 
                {...props}
            />
            {text}
        </label>
    );
}

export default Checkbox;