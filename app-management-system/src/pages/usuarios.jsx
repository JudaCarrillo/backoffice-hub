import styled from "styled-components"
import { Cabecera } from "../components/cabecera";
import { ButtonHead } from "../components/button";
import { useEffect, useState } from "react";
import { Cuerpo } from "../components/cuerpo";
import { getUsuarios } from "../api/usuarios";

export function Usuarios() {
    const [user, setUser] = useState ([])
    const [columns, setColumns] = useState([]); 

    useEffect(() => {
        const cargarTabla = async () => {
            try {
                const respuesta = await getUsuarios();
                
                const { success, data: { items }, message } = respuesta;
                if (!success) {
                    throw new Error(message);
                } else {
                    setUser(items);
                }
        } catch (error) {
            console.error('Error al cargar la tabla:', error);
            // Podrías mostrar un mensaje de error al usuario aquí
        }
    };

        cargarTabla();
    }, []);

    useEffect(() => {
        // Extraer las columnas una vez cuando se monta el componente
        const allKeys = user.reduce((keys, item) => {
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
    }, [user]);

    return (
        <Container>
            <Cabecera title={'Usuarios'}>
                <ButtonHead name={'Nuevo Usuarios'}/>
            </Cabecera>
            <Cuerpo columns={columns} data={user} />
        </Container>
    );
}

const Container = styled.div`
height:100vh;
`;