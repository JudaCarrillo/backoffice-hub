import React from 'react';
import styled from 'styled-components';

export const ComboBox = ({ name, label, options, value, onChange }) => {
    return (
        <Container>
            <div>
                <label htmlFor={name}>{label}</label>
                <Select name={name} id={name} value={value} onChange={onChange}>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </Select>
            </div>
        </Container>
    );
};

export default ComboBox;

const Container = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    
`;

const Select = styled.select`
    display: flex;
    width: 230px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s;
    
    &:hover,
    &:focus {
        border-color: #007bff;
    }
    
`;