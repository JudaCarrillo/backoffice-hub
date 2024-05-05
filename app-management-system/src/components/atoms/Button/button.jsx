import styled from "styled-components";
import React from "react";
export function Button({
  type,
  children,
  onClick,
  addStyle = true,
  className = null,
}) {
  let buttonClass = addStyle ? "button-name" : "";
  buttonClass += ` ${className}`;

  return (
    <Container>
      <button type={type} onClick={onClick} className={buttonClass}>
        {children}
      </button>
    </Container>
  );
}

const Container = styled.div`
  .button-name {
    align-items: center;
    appearance: none;
    background-color: ${(props) => props.theme.reverse};
    border-radius: 4px;
    border-width: 0;
    box-shadow: rgba(45, 35, 66, 0.2) 0 2px 4px,
      rgba(45, 35, 66, 0.15) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
    box-sizing: border-box;
    color: ${(props) => props.theme.reverse2};
    cursor: pointer;
    display: inline-flex;
    font-family: "JetBrains Mono", monospace;
    height: 48px;
    justify-content: center;
    line-height: 1;
    list-style: none;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow 0.15s, transform 0.15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow, transform;
    font-size: 18px;
    &:focus {
      box-shadow: #d6d6e7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
        rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
    }
    &:hover {
      box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
        rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
      transform: translateY(-2px);
    }
    &:active {
      box-shadow: #d6d6e7 0 3px 7px inset;
      transform: translateY(2px);
    }
  }

  .action-button {
    width: 100px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border: none;
    border-radius: 2rem;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    svg {
      color: white;
      font-size: 19px;
    }
    &:hover {
      opacity: 0.7;
    }
  }

  .edit {
    background: ${(props) => props.theme.btnColor};
    color: ${(props) => props.theme.reverse};
    svg {
      color: ${(props) => props.theme.reverse};
    }
  }

  .delete {
    background-color: ${(props) => props.theme.btnColor2};
    color: ${(props) => props.theme.reverse2};
    svg {
      color: ${(props) => props.theme.reverse2};
    }
  }
`;
