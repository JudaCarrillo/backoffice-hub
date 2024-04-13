import { useEffect, useState } from "react";
import styled from "styled-components";
import { exportCategoriesToCsv } from "../api/categories";
import { getCategories } from "../api/usuarios";
import { ButtonHead } from "../components/button";
import { Cabecera } from "../components/cabecera";
import { Cuerpo } from "../components/cuerpo";
import Modal from "../components/modals/CrearModales/modalCategoria";
import { getCsv } from "../utils/logic";
import { Preloader } from "./preloader";

export function Categoria() {
  const [cat, setCat] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargartabla = async () => {
      try {
        const respuesta = await getCategories();
        const { success, data, message } = respuesta.data;
        if (success) {
          const userKeys = Object.keys(data[0]);
          const nuevasColumnas = userKeys.map((key) => ({
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
        console.error("Error al cargar la tabla:", error);
      }
    };

    cargartabla();
  }, []);

  return (
    <Container>
      <Cabecera title={"Categoria"}>
        <ButtonHead
          name={"Descargar"}
          onClick={() =>
            getCsv({ callback: exportCategoriesToCsv, name: "categories_data" })
          }
          buttonColor="#969593"
        />
        {/* Paso el onClick a ButtonHead y también capturo su ID */}

        <Modal modalName={"Nueva Categoria"} title={"Crear categoria"} />
      </Cabecera>
      {loading ? <Preloader /> : <Cuerpo columns={columns} data={cat} />}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;
