import { useEffect, useState } from "react";
import { Cabecera } from "../components/organisms/headers/cabecera";
import { Cuerpo } from "../components/organisms/body/cuerpo";
import { UpdateCustomerModal } from "../components/templates/updateModals/updateCustomers";
import { ModalCreateCustomers } from "../components/templates/createModals/ModalCreateCustomers";
import { getCustomers } from "../services/customers";
import { getPrivileges } from "../utils/logic";
import { Preloader } from "./preloader";

export function Customers() {
  const [Customers, setCustomers] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCustomerId, setEditCustomerId] = useState(null);

  const privilegesReport = getPrivileges("Report");
  const privilegesWrite = getPrivileges("Write");

  useEffect(() => {
    const cargartabla = async () => {
      try {
        const respuesta = await getCustomers();
        const { success, data, message } = respuesta.data;
        if (success) {
          data.sort((a, b) => a.id - b.id);
          const userKeys = Object.keys(data[0]);
          const nuevasColumnas = userKeys.map((key) => ({
            title: key.charAt(0).toUpperCase() + key.slice(1),
            data: key,
            key: key,
          }));

          const columns = nuevasColumnas.map((column) => {
            return {
              ...column,
              title: column.title.replace(/_/g, " "),
            };
          });

          setColumns(columns);
          setCustomers(data);
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
    setEditCustomerId(id);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditCustomerId(null);
  };

  const handleDelete = async (id) => {
    try {
      const respuesta = await deleteCustomer(id);
      const { success, message } = respuesta.data;
      if (success) {
        alert(message);
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error al cargar la tabla:", error);
    }
  };

  const handleReceiveRows = (rows) => {
    setCustomers(rows);
  };
  return (
    <div className="w-full h-[100vh]">
      <Cabecera title="Customers">
        <ModalCreateCustomers
          modalName={"Nuevo Customer"}
          title={"Crear Nuevo Customer"}
          onReceiveRows={handleReceiveRows}
          label={"Crear"}
        />
      </Cabecera>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Cuerpo
            columns={columns}
            data={Customers}
            showActions={true}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            privilegesReport={privilegesReport}
            privilegesWrite={privilegesWrite}
          />
          <UpdateCustomerModal
            open={isEditModalOpen}
            onClose={handleCloseEditModal}
            customerId={editCustomerId}
            onReceiveRows={handleReceiveRows}
            title={"Editar Customer"}
            label={"Actualizar"}
          />
        </>
      )}
    </div>
  );
}