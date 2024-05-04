import styled from 'styled-components'
import { getPrivileges } from '../services/privileges'
import { ButtonsTable } from './buttons_action/buttons'
import { DataTable } from 'primereact/datatable' 
import { Column } from 'primereact/column'

export function Cuerpo({ columns, data, handleEdit, handleDelete }) {
  const privilegesWrite = getPrivileges('Write')
  return (
    <Container className='b'>
      <DataTable
        
        value={data}
        tableStyle={{ minWidth: '50rem' }}
      >
        {columns.map((column) => (
          <Column
            key={column.data}
            field={column.data}
            header={column.title}
          />
        ))}
        {privilegesWrite.length > 0 && <Column header='Acciones' body={ButtonsTable} />}
      </DataTable>
      {/* <div className='table_body'>
        <Table>
          <thead className='table_head'>
            <tr key='head' className='tr_table'>
              {columns.map((column) => (
                <th key={column.data}>{column.title}</th>
              ))}
              {privilegesWrite.length > 0 && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody className='table_bd'>
            {data.map((user) => (
              <tr key={user.id} className='tr_table'>
                {columns.map((column) =>
                  column.title === 'Photo'
                    ? (
                      <td key={column.data} className='td_table'>
                        <img
                          src={user[column.data]}
                          alt='User Photo'
                          width='100px'
                          height='60px'
                        />
                      </td>
                      )
                    : (
                      <td key={column.data} className='td_table'>
                        {renderCell(column, user)}
                      </td>
                      )
                )}
                {privilegesWrite.length > 0 && <td className='td_table'><ButtonsTable onEdit={() => handleEdit(user.id)} onDelete={() => handleDelete(user.id)} /></td>}
              </tr>
            ))}
          </tbody>
        </Table>
      </div> */}
    </Container>
  )
}
function renderCell(column, user) {
  if (column.data === 'is_active') {
    return user[column.data] ? '✔' : 'X';
  } else if (column.data === 'created_at' || column.data === 'updated_at') {
    const date = new Date(user[column.data])
    return date.toLocaleDateString()
  } else {
    return user[column.data]
  }
}

const Table = styled.table`
  min-width: 600px;
  color: ${(props) => props.theme.text};
  width: 100%;
  height: auto;
  border-collapse: collapse;
  .tr_table {
    border-bottom: solid 1px ${(props) => props.theme.gray700};
    height: 60px;
  }
  .table_bd {
    max-height: 300px;
    .td_table {
      padding: 0px 10px 0px 10px;
      height: 50px;
      text-align: center;
    }
  }
`;

const Container = styled.div`
  position: relative;
  top: 90px;
  width: 90%;
  height: 550px;
  left: 80px;
  margin: -10px;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0.3rem 0.5rem 0.4rem #00000040;

  @media screen and (max-width: 1200px) {
    max-width: 100%;
    transition: max-width 0.5s ease;
  }

  @media screen and (max-width: 1000px) {
    max-width: 80vw;
    transition: max-width 0.5s ease;
  }

  @media screen and (max-width: 900px) {
    max-width: 70vw;
    transition: max-width 0.5s ease;
  }

  @media screen and (max-width: 800px) {
    max-width: 60vw;
    transition: max-width 0.5s ease;
  }

  @media screen and (max-width: 700px) {
    max-width: 55vw;
    transition: max-width 0.5s ease;
  }
  .table_body {
    width: 100%;
    border-radius: 2rem;
    height: 99%;
    padding: 20px;
    background-color: ${(props) => props.theme.bg};
    overflow-x: auto;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 10px;
      height: 0.5rem;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 0.5rem;
      visibility: hidden;
    }

    &:hover::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.reverse};
      visibility: visible;
    }
  }
`;
