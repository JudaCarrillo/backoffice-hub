import styled from "styled-components";

export function Cabecera({ title, children }) {
  return (
    <Container>
      <div className="Headboard">
        <h1 className="Headboard-title">{title}</h1>
        <div className="button_lado">{children}</div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 98%;
  height: 160px;
  top: 20px;
  padding: 10px 40px 10px 40px;
  margin: 10px;
  transition: width 0.5s ease;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }

  @media screen and (max-width: 1000px) {
    width: 85vw;
  }

  @media screen and (max-width: 900px) {
    width: 80vw;
  }

  @media screen and (max-width: 800px) {
    width: 73vw;
    .Headboard {
      display: flex;
      justify-content: flex-start;
      position: relative;
      gap: 5%; /* Cambia el valor de gap según lo necesites */
    }
  }

  .Headboard {
    border-radius: 1rem;
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.bg};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 30px 0px 70px;
    box-shadow: 0.3rem 0.5rem 0.4rem #00000040;

    .Headboard-title {
      color: ${(props) => props.theme.text};
      font-size: 2rem;
      font-weight: bold;
      letter-spacing: 1px;
    }
  }

  .button_lado {
    display: flex;
    gap: 20px;
  }
`;
