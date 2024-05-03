import React from 'react';
import styled from 'styled-components';


const Input = ({ id, name, type, value, onChange, checked}) => {
  return (
    <StyledInput
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      accept="image/jpeg, image/jpg, image/png"
      checked={type === "checkbox" ? checked : undefined}
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
    border-color: #1766DC;
    box-shadow: 0 0 0 3px rgba(23, 102, 220, 0.2);
  }
`;

