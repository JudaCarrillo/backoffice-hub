import React from 'react';
import styled from 'styled-components';

const Label = ({ htmlFor, text }) => {
    return (
        <StyledLabel htmlFor={htmlFor}>{text}</StyledLabel>
    );
};

const StyledLabel = styled.label`
    display: block;
    font-size: 10px;
    color: #333;
    margin-bottom: 5px;
`;

export default Label;
