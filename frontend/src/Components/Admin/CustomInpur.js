import React from 'react'

function CustomInput(props) {
    const {type, label, i_id, i_class, name, value, onChange, onBur} = props;
    return (
        <div className="form-floating mb-3">
            <input
                type={type}
                className={`${i_class} form-control`}  
                id={i_id} 
                name={name}
                value={value}
                placeholder={label} 
                onChange={onChange}
                onBlur={onBur}
                required={true}
                />
            <label htmlFor={i_id}>{label}</label>
        </div>
    )
}

export default CustomInput