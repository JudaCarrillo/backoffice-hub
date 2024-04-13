import styled from "styled-components";

export function ButtonHead({ name, buttonColor, className, id, onClick }) {
  return (
    <Container>
      <button
        className={`button_head ${className}`}
        buttonColor={buttonColor}
        onClick={onClick}
        id={id}
      >
        {name}
      </button>
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
