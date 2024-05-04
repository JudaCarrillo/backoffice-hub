import React from 'react';
import styled from 'styled-components';

const Button = ({ type, onClick, children, variant }) => {
  return (
    <StyledButton type={type} onClick={onClick} variant={variant}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.variant === 'cancel' ? '#e74c3c' : '#3498db'};
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.variant === 'cancel' ? '#c0392b' : '#2980b9'};
  }

  &:focus {
    outline: none;
  }
`;

export default Button;
