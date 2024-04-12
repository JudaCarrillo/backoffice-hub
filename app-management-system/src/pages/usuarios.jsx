import styled from "styled-components"
import { Cabecera } from "../components/cabecera";
import { ButtonHead } from "../components/button";
import { useEffect, useState } from "react";
import { Cuerpo } from "../components/cuerpo";
import { getUsuarios } from "../api/usuarios";
import { Preloader } from "./preloader";

export function Usuarios() {
    const [user, setUser] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargartabla = async () => {
            try {
                const respuesta = await getUsuarios();
                const { success, data: { items }, message } = respuesta.data;
                if (success) {
                    const userKeys = Object.keys(items[0]).filter(key => key !== 'password');
                    const nuevasColumnas = userKeys.map(key => ({
                        title: key.charAt(0).toUpperCase() + key.slice(1),
                        data: key,
                        key: key,
                    }));
                    setColumns(nuevasColumnas);
                    setUser(items);
                    setLoading(false); // Indicar que los datos se han cargado
                } else {
                    throw new Error(message);
                }
            } catch (error) {
                console.error('Error al cargar la tabla:', error);
            }
        };

        cargartabla();
    }, []);

    return (
        <Container>
            <Cabecera title={'Usuarios'}>
                <ButtonHead name={'Nuevo Usuarios'}/>
            </Cabecera>
            {loading ? (
                <Preloader/> // Mostrar indicador de carga
            ) : (
                <Cuerpo columns={columns} data={user} />
            )}
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
`;