// import styled from "styled-components";
import { getPrivileges } from "../services/privileges";
import { ButtonsTable } from "./buttons_action/buttons";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export function Cuerpo({ columns, data, handleEdit, handleDelete }) {
  const privilegesWrite = getPrivileges("Write");
  return (
    <div className={`relative bg-white top-36 w-11/12 p-4 h-550 left-24 -m-10 rounded-2xl overflow-hidden shadow-md transition-max-w duration-500 ease-in-out lg:max-w-full md:max-w-[80vw] sm:max-w-[70vw] xs:max-w-[60vw] 2xs:max-w-[55vw]`}>
    <div className="min-w-[600px] w-full p-4">
      <DataTable
        value={data}
        tableStyle={{
          minWidth: "50rem",
        }}
        
      >
         {columns.map((column) => (
          <Column
            className="p-3 h-20 text-left"
            style={{ minWidth: "25%" }}
            key={column.data}
            field={column.data}
            header={column.title}
            headerClassName="text-left w-40"
            sortable
            body={(rowData) => {
              if (column.title === "Photo") {
                return (
                  <img
                    className="w-12 h-12 rounded-3xl"
                    src={rowData[column.data]}
                    alt="User Photo"
                  />
                );
              } else {
                return renderCell(column, rowData);
              }
            }}
          />
        ))}
        {privilegesWrite.length > 0 && (
          <Column
            key="actions"
            header="Acciones"
            body={(rowData) => (
              <ButtonsTable
                onEdit={() => handleEdit(rowData.id)}
                onDelete={() => handleDelete(rowData.id)}
              />
            )}
          />
        )}
      </DataTable>
    </div>
    </div>
  );
}
function renderCell(column, user) {
  if (column.data === "is_active") {
    return user[column.data] ? "✔" : "X";
  } else if (column.data === "created_at" || column.data === "updated_at") {
    const date = new Date(user[column.data]);
    return date.toLocaleDateString();
  } else {
    return user[column.data];
  }
}

// const Table = styled.table`
//   min-width: 600px;
//   color: ${(props) => props.theme.text};
//   width: 100%;
//   height: auto;
//   border-collapse: collapse;
//   .tr_table {
//     border-bottom: solid 1px ${(props) => props.theme.gray700};
//     height: 60px;
//   }
//   .table_bd {
//     max-height: 300px;
//     .td_table {
//       padding: 0px 10px 0px 10px;
//       height: 50px;
//       text-align: center;
//     }
//   }
// `;

// const Container = styled.div`
//   position: relative;
//   top: 90px;
//   width: 90%;
//   height: 550px;
//   left: 80px;
//   margin: -10px;
//   border-radius: 2rem;
//   overflow: hidden;
//   box-shadow: 0.3rem 0.5rem 0.4rem #00000040;

//   @media screen and (max-width: 1200px) {
//     max-width: 100%;
//     transition: max-width 0.5s ease;
//   }

//   @media screen and (max-width: 1000px) {
//     max-width: 80vw;
//     transition: max-width 0.5s ease;
//   }

//   @media screen and (max-width: 900px) {
//     max-width: 70vw;
//     transition: max-width 0.5s ease;
//   }

//   @media screen and (max-width: 800px) {
//     max-width: 60vw;
//     transition: max-width 0.5s ease;
//   }

//   @media screen and (max-width: 700px) {
//     max-width: 55vw;
//     transition: max-width 0.5s ease;
//   }

// `;
