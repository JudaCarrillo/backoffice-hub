import React from 'react';
import Label from '../../atoms/Label/label'
import TextArea from '../../atoms/TextArea/textArea'


const TextAreaWithLabel = ({ id, name, value, onChange, placeholder, labelFor, labelText }) => {
    return (
        <div>
            <Label 
                htmlFor={labelFor} 
                text={labelText} 
            />
            <TextArea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default TextAreaWithLabel;

