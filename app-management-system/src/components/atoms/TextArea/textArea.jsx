import React from 'react';
import styled from 'styled-components';

function TextArea(props) {
  const { id, name, value, onChange, placeholder } = props;

  return (
    <StyledTextArea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default TextArea;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;
