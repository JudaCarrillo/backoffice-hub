import React, { useState } from 'react';
import { ButtonHead } from "../components/button"

const guardarimagen = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };

  const handleUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);

      try {
        const response = await fetch('URL_DEL_ENDPOINT', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const responseData = await response.json();
          onImageUpload(responseData.imageUrl); 
        } else {
          console.error('Error al subir la imagen');
        }
      } catch (error) {
        console.error('Error al subir la imagen:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <ButtonHead onClick={handleUpload} name={'Guardar Imagen'} buttonColor="#969593"/>
    </div>
  );
};

export default guardarimagen;
