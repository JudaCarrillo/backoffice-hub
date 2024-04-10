import React from 'react';
import styled from "styled-components";
import { TableComponent } from './table';


export function Cuerpo ({columns,data}) {
    return(
        <Container>
            <article className="table_body">
                <TableComponent columns={columns} data={data} />
            </article>
        </Container>
    );
}

const Container = styled.div`
position: relative;
top: 90px;
width: 90%;
height: 550px;
left: 80px;
margin: -10px;
border-radius: 2rem; 
box-shadow: .3rem .5rem .4rem #00000040;
    .table_body{
        width: 100%;
        border-radius: 2rem;
        height: 100%;
        padding: 20px; 
        background-color: ${(props)=>props.theme.bg};
        scrollbar-width: none;
        overflow:auto;
    }
`;