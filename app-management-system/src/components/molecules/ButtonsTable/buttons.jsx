import React from "react";
import styled from "styled-components";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import { Button } from "../../atoms/Button/button";

export function ButtonsTable({ onEdit, onDelete }) {
  return (
    <>
      <Container>
        <ul key="buttons" className="container-wrapper">
          <li key="edit">
            <Button
              type="submit"
              onClick={onEdit}
              addStyle={false}
              className="action-button edit"
            >
              <MdEditSquare />
              Editar
            </Button>
          </li>
          <li key="delete">
            <Button
              type="submit"
              className="action-button delete"
              onClick={onDelete}
              addStyle={false}
            >
              <MdDeleteForever />
              Eliminar
            </Button>
          </li>
        </ul>
      </Container>
    </>
  );
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
  }
`;
