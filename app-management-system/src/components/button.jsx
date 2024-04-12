import styled from "styled-components";
import CrearProducto from "./crear";
import { useState } from "react";

export function ButtonHead({ name, buttonColor }) {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen)
  
  return (
    <Container buttonColor={buttonColor}>
      <div className="button_head" onClick={toggleModal}>
        {name}
      </div>
      { modalOpen  &&
        <CrearProducto isOpen={modalOpen} />
      }

    </Container>
  );
}


ButtonHead.defaultProps = {
  buttonColor: null,
};

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
    }
    :hover {
        background: ${(props) => props.theme.gray700};
        color: ${(props) => props.theme.body};
    }
`;