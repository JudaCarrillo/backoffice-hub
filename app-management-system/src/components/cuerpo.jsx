// import styled from "styled-components";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import { Button } from "primereact/button";

import { ButtonsTable } from "./buttons_action/buttons";

export function Cuerpo({
  columns,
  data,
  handleEdit,
  handleDelete,
  handleDownload = undefined,
  showActions,
  showActionForDownload,
}) {
  const paginatorRight = handleDownload && showActionForDownload && (
    <Button type="button" icon="pi pi-download" text onClick={handleDownload} />
  );

  return (
    <div
      className={`relative bg-white top-[130px] w-11/12 p-4 h-550 left-24 -m-10 rounded-2xl overflow-hidden shadow-md transition-max-w duration-500 ease-in-out lg:max-w-full md:max-w-[80vw] sm:max-w-[70vw] xs:max-w-[60vw] 2xs:max-w-[55vw]`}
    >
      <div className="min-w-[600px] w-full p-2">
        <DataTable
          value={data}
          paginator
          rows={5}
          paginatorRight={paginatorRight}
          tableStyle={{
            minWidth: "50rem",
            overflow: "auto",
          }}
          className="w-full table-auto"
        >
          {columns.map((column) => (
            <Column
              className="p-2 text-left h-[70px]"
              style={{ 
                minWidth: "25%",
                overflow: "visible",
                
               }}
              key={column.data}
              field={column.data}
              header={column.title}
              headerClassName="text-left w-96 bg-white border-none px-2"
              sortable
              body={(rowData) => {
                if (column.title === "Photo" || column.title === "Picture") {
                  return (
                    <img
                      className="relative -left-3 w-9 h-10 max-w-10 max-h-10 rounded-full"
                      src={rowData[column.data]}
                      alt="user"
                    />
                  );
                } else {
                  return renderCell(column, rowData);
                }
              }}
            />
          ))}
          {showActions > 0 && (
            <Column
              key="actions"
              header="Acciones"
              headerClassName="flex justify-center relative bg-white"
              bodyClassName="text-center"
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
