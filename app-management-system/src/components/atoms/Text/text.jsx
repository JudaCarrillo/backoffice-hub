import React from 'react';
import styled from 'styled-components';

const Text = ({ text }) => <StyledText>{text}</StyledText>;

const StyledText = styled.p`
  font-size: 16px;
  color: #333;
  font-family: Arial, sans-serif;
  line-height: 1.5;
`;

export default Text;
