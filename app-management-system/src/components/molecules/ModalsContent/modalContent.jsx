import React from 'react';
import styled from 'styled-components';

const ModalContent = ({ children, mostrarOverlay, posicionModal, padding }) => {
  return (
      <Overlay mostrarOverlay={mostrarOverlay} posicionModal={posicionModal}>
          <ContainerModal padding={padding}>
              {children}
              <Field labelFor="nombre" labelText="Nombre:" inputId="nombreInput" placeholder="Ingrese su nombre"/>
          </ContainerModal>
      </Overlay>
  );
};

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: ${props => props.mostrarOverlay ? 'rgba(0,0,0,.5)' : 'rgba(0,0,0,0)'};
    padding: 40px;
    display: flex;
    align-items: ${props => props.posicionModal ? props.posicionModal : 'center'};
    justify-content: center;
`;

const ContainerModal = styled.div`
    width: 500px;
    min-height: 100px;
    background: #fff;
    position: relative;
    border-radius: 5px;
    box-shadow: rgba(100,100,111, 0.2) 0px 7px 29px 0px;
    padding: ${props => props.padding ? props.padding : '20px'};
`;

export default ModalContent;
