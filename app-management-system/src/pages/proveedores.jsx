import styled from "styled-components"
import { Cabecera } from "../components/cabecera";
import { ButtonHead } from "../components/button";
import { useEffect, useState } from "react";
import { Cuerpo } from "../components/cuerpo";

export function Proveedores() {
    const [prov, setProv] = useState ([])
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
                setProv(items);
            } catch (error) {
                console.error('Error al cargar la tabla:', error);
            }
        };

        cargartabla();
    }, []);
    return (
        <Container>
            <Cabecera title={'Proveedores'}>
                <ButtonHead name={'Nuevo Proveedor'}/>
            </Cabecera>
            <Cuerpo columns={columns} data={prov} />
        </Container>
    );
}

const Container = styled.div`
height:100vh;

`;