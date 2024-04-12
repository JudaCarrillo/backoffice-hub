import styled from "styled-components";
import { Cabecera } from "../components/cabecera";
import { ButtonHead } from "../components/button";
import { Cuerpo } from "../components/cuerpo";
import { useEffect, useState } from "react";

export function Productos() {
    const [pro, setPro] = useState ([])
    const [columns, setColumns] = useState([]); 

    useEffect(() => {
        const cargartabla = async () => {
            try {
                const baseurl = 'http://localhost:8000/doc/';
                const api = 'api/';
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