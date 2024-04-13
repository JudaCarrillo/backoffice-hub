import styled from 'styled-components';
import React, { useState } from 'react';
import { InputComponent } from '../input';
import { ModalCompleto } from '../modalCompleto';
import { createVendors} from '../../../api/proveedor';
export function ModalProveedor({modalName, title}) {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal(!showModal);
    
    const handleCreateVendor = async () => {
        try {
            // Lógica para crear un proveedor utilizando la función createVendors
            await createVendors(); // Puedes pasar los datos del proveedor como argumento si es necesario
        } catch (error) {
            console.error('Error al crear el proveedor:', error);
        }
    };
    return (
        /* Reutilizar todo para los demas modales y cambiar los nombres */
        <Container>
            <button className="button_head" onClick={toggleModal}>{modalName}</button>
            {showModal && (
                <ModalCompleto
                    title={title}
                    showModalContent={(handleCloseModal) => (
                        <>
                            <InputComponent name={"name"} label={"Nombre"} type={"text"} id={"nombre"} />
                            <InputComponent name={"email"} label={"E-mail"} type={"email"} id={"email"} />
                            <InputComponent name={"address"} label={"Dirección"} type={"text"} id={"direccion"} />
                            <InputComponent name={"phone"} label={"Teléfono"} type={"number"} id={"telefono"} />
                        </>
                    )}
                    onClose={toggleModal}
                />
            )}
        </Container>
    );
}

export default ModalProveedor


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
