import React from 'react';
import styled from 'styled-components';

const Label = ({ htmlFor, text }) => {
    return (
    <StyledLabel htmlFor={htmlFor} className="text-custom">{text}</StyledLabel>
    );
};


const StyledLabel = styled.label`
    display: block;
    font-size: 20px;
    color: #000000;
    margin-bottom: 5px;
`;

export default Label;
