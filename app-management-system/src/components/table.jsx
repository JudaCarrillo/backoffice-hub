import React from 'react';
import styled from "styled-components"

export function TableComponent({ columns, data }) {
    return (
        <Table>
            <thead className='table_head'>
                <tr className='tr_table'>
                    {columns.map(column => (
                        <th key={column.field}>{column.headerName}</th>
                    ))}
                </tr>
            </thead>
            <tbody className='table_bd'>
                {data.map(row => (
                    <tr key={row.id} className='tr_table'>
                        {columns.map(column => (
                            <td className='td_table' key={`${row.id}-${column.field}`}>
                                {row[column.field]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
const Table = styled.table`
    
    min-width: 600px;
    color: ${(props)=>props.theme.text};;
    width: 100%;
    height: auto;
    border-collapse: collapse;
    .tr_table{
        
        border-bottom: solid 1px ${(props)=>props.theme.gray700};
        height: 60px;
    }
    .table_bd{
        max-height: 300px; 
        .td_table{
            padding: 0px 10px 0px 10px;
            height: 50px;
            text-align: center;
        }
    }
    
`;