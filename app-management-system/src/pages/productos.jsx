import styled from "styled-components";
import { Cabecera } from "../components/cabecera";
import { ButtonHead } from "../components/button";
import { Cuerpo } from "../components/cuerpo";
import { useEffect, useState } from "react";
/* const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'age', headerName: 'Age' },

];

const data = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Doe', age: 30 },
    { id: 3, name: 'Alice', age: 20 },

];

 */
export function Productos() {
    const [pro, setPro] = useState ([])
    const [columns, setColumns] = useState([]); 

    useEffect(() => {
        const cargartabla = async () => {
            try {
                const baseurl = 'http://localhost:8000/api/';
                const api = 'user';
                const respuesta = await fetch(`${baseurl}${api}`);
                const { success, data: { items }, message } = await respuesta.json();
                if (!success) {
                    throw new Error(message);
                }
                const allKeys = items.reduce((keys, item) => {
                    Object.keys(item).forEach(key => {
                        if (!keys.includes(key)) {
                            keys.push(key);
                        }
                    });
                    return keys;
                }, []);

                const newColumns = allKeys.map(key => ({
                    title: key.charAt(0).toUpperCase() + key.slice(1),
                    dataIndex: key,
                    key: key,
                }));

                setColumns(newColumns);
                setPro(items);
            } catch (error) {
                console.error('Error al cargar la tabla:', error);
            }
        };

        cargartabla();
    }, []);
    return (
        <Container>
            <Cabecera title={'Productos'}>
                <ButtonHead name={'Descargar'} buttonColor="#969593"/>
                <ButtonHead name={'Nuevo Producto'}/>
            </Cabecera>
            <Cuerpo columns={columns} data={pro}/>
        </Container>
    );
}

const Container = styled.div`
height:100vh;
`;