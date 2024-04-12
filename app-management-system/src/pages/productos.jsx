import styled from "styled-components";
import { Cabecera } from "../components/cabecera";
import { ButtonHead } from "../components/button";
import { Cuerpo } from "../components/cuerpo";
import { useEffect, useState } from "react";
import { getProducts } from "../api/usuarios";
import { Preloader } from "./preloader";

export function Productos() {
    const [pro, setPro] = useState ([])
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargartabla = async () => {
            try {
                const respuesta = await getProducts();
                const { success, data, message } = respuesta.data;
                if (success) {
                    const userKeys = Object.keys(data[0]);
                    const nuevasColumnas = userKeys.map(key => ({
                        title: key.charAt(0).toUpperCase() + key.slice(1),
                        data: key,
                        key: key,
                    }));
                    setColumns(nuevasColumnas);
                    setPro(data);
                    setLoading(false);
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
            <Cabecera title={'products'}>
                <ButtonHead name={'Descargar'}  buttonColor="#969593"/>
                <ButtonHead name={'Nuevo Product'} className={'NuevoProduc'}/>
            </Cabecera>
            {loading ? (
                <Preloader/> // Mostrar indicador de carga
            ) : (
                <Cuerpo columns={columns} data={pro} />
            )}
        </Container>
    );
}

const Container = styled.div`
height:100vh;
`;