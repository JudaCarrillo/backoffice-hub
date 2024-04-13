import styled from 'styled-components';
import React, { useState } from 'react';

import { ModalCompleto } from '../modalCompleto';
function categoryModalDelete({modalName, title}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <Container>
        <button className="button_head" onClick={toggleModal}>{modalName}</button>
        {showModal && (
            <ModalCompleto
                title={title}
                showModalContent={(handleCloseModal) => (
                    <>
                        
                    </>
                )}
                onClose={toggleModal}
                
            />
        )}
    </Container>
  );
}

export default categoryModalDelete;

const Container = styled.div`
height: 45px;
width: 170px;
    .button_head {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${(props) => props.buttonColor || props.theme.bgbtton};
        cursor: pointer;
        border: none;
        border-radius: 1rem;
        font-size: 17px;
        font-weight: 800;
        color: ${(props) => props.theme.text};
        box-shadow: 0.1rem 0.3rem #00000040;
        &:hover {
            background: ${(props) => props.theme.gray700};
            color: ${(props) => props.theme.body};
        }
    }
 
`;
