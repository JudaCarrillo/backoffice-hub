import { useEffect, useState } from "react";
import styled from "styled-components";
import { Cuerpo } from "../components/organisms/body/cuerpo";
import { Cabecera } from "../components/organisms/headers/cabecera";
import { ModalCreateOrderDetails } from "../components/templates/createModals/ModalCreateOrderDetails";
import { UpdateOrderDetailtModal } from "../components/templates/updateModals/updateOrderDetails";
import {
  deleteOrderDetail,
  exportOrderDetailToCsv,
  getOrderDetails,
} from "../services/order-detail";
import { getCsv, getPrivileges, hasPrivileges } from "../utils/logic";
import { Preloader } from "./preloader";

export function OrderDetail() {
  const [ordersDetail, setOrdersDetail] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editOrdersDetailId, setEditOrdersDetailId] = useState(null);

  const privilegesReport = getPrivileges("Report");
  const privilegesWrite = getPrivileges("Write");

  useEffect(() => {
    const cargartabla = async () => {
      try {
        const respuesta = await getOrderDetails();
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
          console.log(data);
          setOrdersDetail(data);
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
    setEditOrdersDetailId(id);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditOrdersDetailId(null);
  };
  // Función de eliminación
  const handleDelete = async (id) => {
    try {
      const respuesta = await deleteOrderDetail(id);
      const { success, message } = respuesta.data;
      if (success) {
        setOrdersDetail(
          ordersDetail.filter((ordersDetail) => ordersDetail.id !== id)
        );
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };
  const handleReceiveRows = async (data) => {
    data.sort((a, b) => a.id - b.id);
    setOrdersDetail(data);
  };

  return (
    <Container>
      <Cabecera title="Orders Detail">
        {privilegesWrite.length > 0 && (
          <ModalCreateOrderDetails
            modalName={"New Order Detail"}
            title={"Create Order Detail"}
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
            data={ordersDetail}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            showActions={hasPrivileges(privilegesWrite)}
            showActionForDownload={hasPrivileges(privilegesReport)}
            handleDownload={() =>
              getCsv({
                callback: exportOrderDetailToCsv,
                name: "Orders_Detail_data",
              })
            }
          />
          <UpdateOrderDetailtModal
            title="Edit Order Detail"
            orderdetailId={editOrdersDetailId}
            onReceiveRows={handleReceiveRows}
            onClose={handleCloseEditModal}
            open={isEditModalOpen}
            label={"Save"}
          />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;
