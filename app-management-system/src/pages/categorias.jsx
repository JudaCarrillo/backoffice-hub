import styled from "styled-components"
import { Cabecera } from "../components/cabecera";
import { Cuerpo } from "../components/cuerpo";
import { useEffect, useState } from "react";
import { getCategories } from "../api/usuarios";
import { Preloader } from "./preloader";
import Modal from "../components/modals/CrearModales/modalCategoria";

export function Categoria() {

    const [cat, setCat] = useState ([])
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargartabla = async () => {
            try {
                const respuesta = await getCategories();
                const { success, data, message } = respuesta.data;
                if (success) {
                    const userKeys = Object.keys(data[0]);
                    const nuevasColumnas = userKeys.map(key => ({
                        title: key.charAt(0).toUpperCase() + key.slice(1),
                        data: key,
                        key: key,
                    }));
                    setColumns(nuevasColumnas);
                    setCat(data);
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
             <Cabecera title={'Categoria'}>
                {/* Paso el onClick a ButtonHead y también capturo su ID */}
            
                <Modal modalName={'Nueva Categoria'} title={'Crear categoria'}/>
            </Cabecera>
            {loading ? (
                <Preloader />
            ) : (
                <Cuerpo columns={columns} data={cat} />
            )}
        </Container>
    );
}


const Container = styled.div`
    height:100vh;
`;