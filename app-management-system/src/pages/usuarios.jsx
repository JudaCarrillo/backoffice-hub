import styled from "styled-components"
import { Cabecera } from "../components/cabecera";
import { ButtonHead } from "../components/button";

export function Usuarios() {
    return (
        <Container>
            <Cabecera title={'Usuarios'}>
                <ButtonHead name={'Nuevo Usuarios'}/>
            </Cabecera>
        </Container>
    );
}

const Container = styled.div`
height:100vh;
`;