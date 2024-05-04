import { useEffect, useState } from "react";
import styled from "styled-components";
import { ButtonModal } from "./buttonmodal";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export function ModalParaUpdate({
  open,
  title,
  showModalContent,
  onClose,
  onUpdate,
  textButton,
}) {
  const [visible, setVisible] = useState(true);

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
      <Dialog
        header={title}
        visible={open}
        style={{ width: "50vw" }}
        closeOnEscape
        onClick={handleCloseModal}
      >
        <div className="p-6 bg-zinc-900">
          {showModalContent(handleUpdate)}
        </div>
        <div className="flex justify-end p-6 bg-zinc-900">
          <Button className="text-white" onClick={handleUpdate}>
            {textButton}
          </Button>
        </div>
      </Dialog>
    </>
  );
}
