import React from 'react';
import { InputText } from "primereact/inputtext";

const Input = ({ required, id, name, type, value, onChange }) => {
  return (
    <InputText 
      id={id} 
      name={name} 
      type={type}
      style={{
        width: '100%',
        backgroundColor: 'white',
        paddingLeft: '10px',
        color: 'black',
        fontSize: '16px',
        border: '1px solid black'
      }}
      
      value={value} 
      onChange={onChange} 
      className="w-15 h-10" // Esto aplica un ancho completo y una altura de 12 unidades
      required={required}
    />
  );
};



export default Input;
