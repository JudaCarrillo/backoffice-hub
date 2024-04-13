import React, { useState } from 'react';
import {CrearProducto} from './components/crear';

const Editar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <button onClick={false}>Abrir Modal</button>
      <CrearProducto isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
};

export default Editar;
