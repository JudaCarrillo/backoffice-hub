import React from 'react';
import styled from 'styled-components';

const Title = ({ as, text }) => {
    const Element = as || 'h1'; // Por defecto si no exite definición
    return (
        <StyledTitle as={Element}>{text}</StyledTitle>
    );
};

const StyledTitle = styled.div`
    ${({ as }) => `
        text-transform: uppercase;
        margin: 10px 0;
        font-weight: 200;

        ${as === 'h3' && `
            font-size: 1em;
        `}
    `}
`;
export default Title;
