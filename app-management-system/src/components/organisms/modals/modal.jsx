import styled from "styled-components";
import { Button } from "../../atoms/Button/button";

export function Modal({ title, showModalContent, onClose, onAction, label }) {
  const handleCloseModal = () => {
    onClose();
  };

  const handleAction = async (e) => {
    e.preventDefault();
    await onAction();
    onClose();
  };

  return (
    <Container >
      <div className="modal-overlay">
        <form onSubmit={handleAction}>
          <div className="modal bg-neutral-100">
            <div className="cabeza">
              <h2>{title}</h2>
            </div>
            {showModalContent(handleCloseModal)}
            <div className="separacion">
              <ul>
                <li>
                  <Button type="button" onClick={handleCloseModal}>
                    Cerrar
                  </Button>
                </li>
                <li>
                  <Button type="submit" name={label}>
                    {label}
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;

    .modal {
      
      padding: 9px;
      border-radius: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 100%; /* Ajustar el ancho máximo al 100% del viewport */
      overflow-y: auto; /* Agregar desplazamiento vertical si el contenido excede el tamaño del modal */

      .cabeza {
        width: 100%;
        display: flex;
        justify-content: center;
        position: relative;
        align-items: center;
        top: 20px;
        margin-bottom: 20px; /* Agregar espacio inferior */

        h2 {
          color: ${({ theme }) => theme.text};
          font-size: 1.8rem;
          font-weight: 500;
        }
      }
    }

    .separacion {
      display: flex;
      flex-direction: column; /* Cambiar a una disposición vertical */
      align-items: center; /* Centrar los elementos horizontalmente */
      gap: 20px;
      width: 100%;

      ul {
        display: flex;
        flex-wrap: wrap; /* Permitir que los elementos se envuelvan en varias líneas */
        justify-content: center;
        gap: 20px;

        li {
          list-style: none;
        }
      }
    }

    .modal-close-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 20px;
      padding: 5px;
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
`;
