import { useEffect, useState } from "react";
import { Cabecera } from "../components/organisms/headers/cabecera";
import { Cuerpo } from "../components/organisms/body/cuerpo";
import { UpdateCustomerModal } from "../components/templates/updateModals/updateCustomers";
import { ModalCreateCustomers } from "../components/templates/createModals/ModalCreateCustomers";
import { deleteCustomer, getCustomers } from "../services/customers";
import { Preloader } from "./preloader";
import { exportCategoriesToCsv } from "../services/categories";
import { getCsv, getPrivileges, hasPrivileges } from "../utils/logic";


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
        setCustomers(Customers.filter((customer) => customer.id !== id));
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
          modalName={"New Customer"}
          title={"Create Customer"}
          onReceiveRows={handleReceiveRows}
          label={"Create"}
        />
      </Cabecera>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Cuerpo
            columns={columns}
            data={Customers}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            showActions={hasPrivileges(privilegesWrite)}
            showActionForDownload={hasPrivileges(privilegesReport)}
            handleDownload={() =>
              getCsv({
                callback: exportCategoriesToCsv,
                name: "Customers_data",
              })
            }
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
