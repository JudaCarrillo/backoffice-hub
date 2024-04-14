import React from 'react';
import styled from "styled-components";

export const InputComponent = ({ name, type, onChange, label , value }) => {
    return (
    <Container>
        <div className="wave-group">
            <input
                required
                type={type}
                className="input"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            />
            <span className="bar"></span>
            <label className="label">
                {label && label.split('').map((char, index) => (
                    <span key={index} className="label-char" style={{ '--index': index }}>
                        {char}
                    </span>
                ))}
            </label>
        </div>
    </Container>
    );
};

// #endregion Styled Components

    const Container = styled.div`
        .wave-group {
            position: relative;
        }
        
        .wave-group .input {
            font-size: 16px;
            padding: 10px 10px 10px 5px;
            display: block;
            width: 230px;
            border: none;
            border-bottom: 1px solid #515151;
            background: transparent;
            color: ${({ theme }) => theme.reverse};
        }
        
        .wave-group .input:focus {
            outline: none;
        }
        
        .wave-group .label {
            color: #999;
            font-size: 18px;
            font-weight: normal;
            position: absolute;
            pointer-events: none;
            left: 5px;
            top: 10px;
            display: flex;
        }
        
        .wave-group .label-char {
            transition: 0.2s ease all;
            transition-delay: calc(var(--index) * .05s);
        }
        
        .wave-group .input:focus ~ label .label-char,
        .wave-group .input:valid ~ label .label-char {
            transform: translateY(-20px);
            font-size: 14px;
            color: ${({ theme }) => theme.gray300};
        }
        
        .wave-group .bar {
            position: relative;
            display: block;
            width: 100%;
        }
        
        .wave-group .bar:before,.wave-group .bar:after {
            content: '';
            height: 2px;
            width: 0;
            bottom: 1px;
            position: absolute;
            background: #5264AE;
            transition: 0.2s ease all;
            -moz-transition: 0.2s ease all;
            -webkit-transition: 0.2s ease all;
        }
        
        .wave-group .bar:before {
            left: 50%;
        }
        
        .wave-group .bar:after {
            right: 50%;
        }
        
        .wave-group .input:focus ~ .bar:before,
        .wave-group .input:focus ~ .bar:after {
            width: 50%;
        }
    `
// #endregion

