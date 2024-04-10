import styled from "styled-components"
import { Cabecera } from "../components/cabecera";
import { ButtonHead } from "../components/button";

export function Proveedores() {
    return (
        <Container>
            <Cabecera title={'Proveedores'}>
                <ButtonHead name={'Nuevo Proveedor'}/>
            </Cabecera>
        </Container>
    );
}

const Container = styled.div`
height:100vh;

`;