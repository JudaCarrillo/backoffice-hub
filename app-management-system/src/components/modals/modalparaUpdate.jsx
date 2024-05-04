import { useEffect, useState } from "react";
import styled from "styled-components";
import { ButtonModal } from "./buttonmodal";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/lara-light-cyan/theme.css";


export function ModalParaUpdate({
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
      <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} />
      <Dialog header={title} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
        <div className="p-6">
          {showModalContent(handleCloseModal)}
        </div>
        <div className="flex justify-end p-6">
          <Button label="Cerrar" className="p-button-text mr-4" onClick={handleCloseModal} />
          <Button label="Actualizar" onClick={handleUpdate} />
        </div>
      </Dialog>
    </>
  );
}

