import styled from "styled-components"
import { Cabecera } from "../components/cabecera";
import { ButtonHead } from "../components/button";
import { useEffect, useState } from "react";
import { Cuerpo } from "../components/cuerpo";
import { getVendors } from "../api/usuarios";
import { Preloader } from "./preloader";

export function Proveedores() {
    const [prov, setProv] = useState ([])
    const [columns, setColumns] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargartabla = async () => {
            try {
                const respuesta = await getVendors();
                const { success, data, message } = respuesta.data;
                if (success) {
                    const userKeys = Object.keys(data[0]);
                    const nuevasColumnas = userKeys.map(key => ({
                        title: key.charAt(0).toUpperCase() + key.slice(1),
                        data: key,
                        key: key,
                    }));
                    setColumns(nuevasColumnas);
                    setProv(data);
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
            <Cabecera title={'Vendors'}>
                <ButtonHead name={'Nuevo Vendor'}/>
            </Cabecera>
            {loading ? (
                <Preloader/> // Mostrar indicador de carga
            ) : (
                <Cuerpo columns={columns} data={prov} />
            )}
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
`;