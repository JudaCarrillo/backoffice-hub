import styled from "styled-components";
import { Cabecera } from "../components/cabecera";
import { ButtonHead } from "../components/button";
import { Cuerpo } from "../components/cuerpo";
const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'age', headerName: 'Age' },

];

const data = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Doe', age: 30 },
    { id: 3, name: 'Alice', age: 20 },

];


export function Productos() {
    return (
        <Container>
            <Cabecera title={'Productos'}>
                <ButtonHead name={'Descargar'}/>
                <ButtonHead name={'Nuevo Producto'}/>
            </Cabecera>
            <Cuerpo columns={columns} data={data}/>
        </Container>
    );
}

const Container = styled.div`
height:100vh;`;