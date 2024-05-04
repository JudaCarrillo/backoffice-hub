import { useEffect, useState } from "react";
import styled from "styled-components";
import { ButtonModal } from "./buttonmodal";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';


export function ModalParaUpdate({
  open,
  title,
  showModalContent,
  onClose,
  onUpdate,
}) {
  const [visible, setVisible] = useState(false);

  const handleCloseModal = () => {
    onClose();
    setVisible(false);
  };

  const handleUpdate = async () => {
    await onUpdate();
    setVisible(false);
  };

  return (
    <>
      <Dialog header={title} visible={open} style={{ width: '50vw' }} onHide={() => setVisible(true)}>
        <div className="p-6 bg-zinc-900">
          {showModalContent(handleCloseModal)}
        </div>
        <div className="flex justify-end p-6 bg-zinc-900">
        <Button label="Cerrar" className="p-button-text mr-4 text-white" onClick={handleCloseModal} /> {/* Establece el color del texto como blanco */}
        <Button label="Actualizar" className="text-white" onClick={handleUpdate} /> {/* Establece el color del texto como blanco */}
      </div>
      </Dialog>
    </>
  );
}
