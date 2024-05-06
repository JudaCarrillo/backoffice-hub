import React from 'react'
import Label from '../../atoms/Label/label'
import LongTextArea from '../../atoms/LongTextArea/longTextArea'

const LongText = ({ id, name, type, value, onChange, placeholder, labelFor, labelText }) => {
  return (
    <div>
      <Label 
        htmlFor={labelFor} 
        text={labelText} 
      />
      <LongTextArea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    </div>
  )
}

export default LongText