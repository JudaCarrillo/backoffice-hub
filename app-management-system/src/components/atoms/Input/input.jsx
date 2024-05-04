import React from 'react';
import styled from 'styled-components';
import { InputText } from "primereact/inputtext";

const Input = ({ id, name, type, value, onChange }) => {
  return (
    <InputText 
      id={id} 
      name={name} 
      type={type} 
      value={value} 
      onChange={onChange} 
      className="w-15 h-10 p-2" // Esto aplica un ancho completo y una altura de 12 unidades
    />
  );
};



export default Input;
const StyledInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 10px;
  margin-bottom: 10px;
  width: 400px;

  &:focus {
    outline: none;
    border-color: #01050c;;
  }
`;
