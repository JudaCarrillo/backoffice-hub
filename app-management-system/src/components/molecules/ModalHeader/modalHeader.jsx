import React from 'react';
import styled from 'styled-components';
import Label from '../../atoms/Label/label';

const ModalHeader = ({ title, mostrarHeader, cambiarEstado }) => {
  return (
      <>
          {mostrarHeader && (
              <HeaderModal>
                  <Label text={title}/>
                  <ButtonClose onClick={() => cambiarEstado(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                  </ButtonClose>
              </HeaderModal>
          )}
      </>
  );
};


const HeaderModal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #E8E8E8;

    h3 {
        font-weight: 500;
        font-size: 16px;
        color: #1766DC;
    }
`;

const ButtonClose = styled.button`
    width: 30px;
    height: 30px;
    border: none;
    background: none;
    cursor: pointer;
    transition: .3s ease all;
    border-radius: 5px;
    color: #1766DC;

    &:hover {
        background: #f2f2f2;
    }

    svg {
        width: 100%;
        height: 100%;
    }
`;

export default ModalHeader;
