import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ComboBox = () => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8200/v1/category/1')
        .then(response => {
            const data = response.data; 
            setOptions(data); 
        })
        .catch(error => {
            console.error('Error al obtener las opciones:', error);
        });
    }, []);

    return (
        <Container>
            <div>
                <Select>
                    {options.map(option => (
                        <option key={option.id} value={option.id}>
                        {option.name} {/* Supongamos que cada opción tiene un campo "name" */}
                        </option>
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