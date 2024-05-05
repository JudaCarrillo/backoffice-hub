import React from "react";
import styled from "styled-components";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";

export function ButtonsTable({ onEdit, onDelete }) {
  return (
    <>
      <Container>
        <ul key="buttons" className="container-wrapper">
          <li key="edit">
            <button type="submit" className="editar-button" onClick={onEdit}>
              <MdEditSquare />
              Editar
            </button>
          </li>
          <li key="delete">
            <button
              type="submit"
              className="eliminar-button"
              onClick={onDelete}
            >
              <MdDeleteForever />
              Eliminar
            </button>
          </li>
        </ul>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 250px;
  .container-wrapper {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  li {
    list-style: none;
    width: 100px;
    height: 40px;
  }

  button {
    width: 100%;
    height: 100%;
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

  .editar-button {
    background: ${(props) => props.theme.btnColor};
    color: ${(props) => props.theme.reverse};
    svg {
      color: ${(props) => props.theme.reverse};
    }
  }

  .eliminar-button {
    background-color: ${(props) => props.theme.btnColor2};
    color: ${(props) => props.theme.reverse2};
    svg {
      color: ${(props) => props.theme.reverse2};
    }
  }
`;
