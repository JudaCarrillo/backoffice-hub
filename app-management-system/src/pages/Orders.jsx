import { useEffect, useState } from "react";
import styled from "styled-components";
import { Cabecera } from "../components/organisms/headers/cabecera";
import { Cuerpo } from "../components/organisms/body/cuerpo";
import { UpdateProductModal } from "../components/templates/updateModals/updateProducts";
import { ModalCreateProducts } from "../components/templates/createModals/ModalCreateProducts";

import { getCsv, getPrivileges, hasPrivileges } from "../utils/logic";
import { Preloader } from "./preloader";
import { deleteOrder, getOrders, exportOrdersToCsv } from "../services/orders";

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editOrdersId, setEditOrdersId] = useState(null);

  const privilegesReport = getPrivileges("Report");
  const privilegesWrite = getPrivileges("Write");

  useEffect(() => {
    const cargartabla = async () => {
      try {
        const respuesta = await getOrders();
        const { success, data, message } = respuesta.data;
        if (success) {
          data.sort((a, b) => a.id - b.id);
          const userKeys = Object.keys(data[0]);
          const nuevasColumnas = userKeys.map((key) => ({
            title: key.charAt(0).toUpperCase() + key.slice(1),
            data: key,
            key,
          }));
          setColumns(nuevasColumnas);
          setOrders(data);
          setLoading(false);
        } else {
          throw new Error(message);
        }
      } catch (error) {
        console.error("Error al cargar la tabla:", error);
      }
    };

    cargartabla();
  }, []);

  const handleEdit = (id) => {
    setEditOrdersId(id);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditOrdersId(null);
  };
  // Función de eliminación
  const handleDelete = async (id) => {
    try {
      const respuesta = await deleteOrder(id);
      const { success, message } = respuesta.data;
      if (success) {
        setOrders(orders.filter((Orders) => Orders.id !== id));
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };
  const handleReceiveRows = async (data) => {
    data.sort((a, b) => a.id - b.id);
    setOrders(data);
  };

  return (
    <Container>
      <Cabecera title="Orders">
        {privilegesWrite.length > 0 && (
          <ModalCreateProducts
            modalName={"New Order"}
            title={"Create Order"}
            onReceiveRows={handleReceiveRows}
            label={"Create"}
          />
        )}
      </Cabecera>

      {loading ? (
        <Preloader />
      ) : (
        <>
          <Cuerpo
            columns={columns}
            data={orders}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            showActions={hasPrivileges(privilegesWrite)}
            showActionForDownload={hasPrivileges(privilegesReport)}
            handleDownload={() =>
              getCsv({
                callback: exportOrdersToCsv,
                name: "Orders_data",
              })
            }
          />
          <UpdateProductModal
            title="Edit Order"
            productId={editOrdersId}
            onReceiveRows={handleReceiveRows}
            onClose={handleCloseEditModal}
            open={isEditModalOpen}
            label={"Actulizar"}
          />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;
