import styled from "styled-components";
import { ButtonModal } from "./buttonmodal";

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
    <Container>
      <div className="modal-overlay">
        <form onSubmit={handleAction}>
          <div className="modal">
            <div className="cabeza">
              <h2>{title}</h2>
            </div>
            {showModalContent(handleCloseModal)}
            <div className="separacion">
              <ul>
                <li>
                  <ButtonModal
                    type="button"
                    onClick={handleCloseModal}
                    name="cerrar"
                  />
                </li>
                <li>
                  <ButtonModal type="submit" name={label} />
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
      background-color: ${(props) => props.theme.body};
      padding: 20px;
      border-radius: 2rem;
      display: flex;
      gap: 30px;
      flex-direction: column;
      align-items: center;
      width: 350px;
      height: 560px;
      position: relative;
      justify-content: center;
      .cabeza {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        top: 20px;
        gap: 20px;

        h2 {
          color: white;
          font-size: 2rem;
          font-weight: 800;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
      }
    }

    .separacion {
      display: flex;
      gap: 20px;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      position: relative;
      justify-content: center;
      ul {
        display: flex;
        gap: 20px;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        position: relative;
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
    }
  }
`;
