import React from 'react';
import styled from 'styled-components';



function LongTextArea({ id, name, value, onChange, placeholder }) {
  return (
    <StyledLongTextArea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default LongTextArea;
const StyledLongTextArea = styled.textarea`
  width: 100%;
  min-height: 150px; /* Ajusta la altura según tus preferencias */
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;
