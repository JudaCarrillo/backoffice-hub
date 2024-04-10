import styled from "styled-components"
import { Cabecera } from "../components/cabecera";
import { ButtonHead } from "../components/button";
import { Cuerpo } from "../components/cuerpo";
import { useEffect, useState } from "react";



export function Categoria() {
    const [cat, setCat] = useState ([])

    const cargartabla = async () => {
        const baseurl = 'http://localhost:8000/api/'
        const api = 'user'
        const respuesta = await fetch('http://localhost:8000/')
        const data =  await respuesta.json()
        setCat(data)
    }
    useEffect(() => {
        cargartabla()

    },[])
    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name' },
        { field: 'age', headerName: 'Age' },
    ];
    
    const data = cat ? [{ id: cat.id, name: cat.nombre, age: cat.años }] : []; // Manejar cat vacío

    return (
        <Container>
            <Cabecera title={'Categoria'}>
                <ButtonHead name={'Nueva categoria'}/>
            </Cabecera>
            <Cuerpo columns={columns} data={data}/>
        </Container>
    );
}

const Container = styled.div`
height:100vh;
`;

