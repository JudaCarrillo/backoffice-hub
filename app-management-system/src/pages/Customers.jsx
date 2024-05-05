import { useEffect, useState } from "react";
import { Cabecera } from "../components/cabecera";
import { getPrivileges } from "../utils/logic";
import { ModalCreateEmployees } from "../components/organisms/CreateModals/ModalCreateEmployees";
import { getCustomers } from "../services/Customers";
import { Preloader } from "./preloader";
import { Cuerpo } from "../components/cuerpo";
import { UpdateUserModal } from "../components/modals/updateModal/updateUser";

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
  const handleEdit = (id) => {
    setEditCustomerId(id); // Almacena el ID de la categoría a editar
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditCustomerId(null);
  }

  const handleDelete = async (id) => {
    try {
      const respuesta = await deleteCustomer(id);
      const {
        success,
        message
      } = respuesta.data;
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
        <ModalCreateEmployees
          modalName={"Nuevo Customer"}
          title={"Crear Nuevo Customer"}
          onReceiveRows={handleReceiveRows}
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
        <UpdateUserModal
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          userId={editCustomerId}
          onReceiveRows={handleReceiveRows}
          title={"Editar Customer"}
        />
        
        </>
      )}
    </div>
  );
}
