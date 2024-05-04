import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';

const ImgInput = ({ name, type, id, url, accept, maxFileSize, onUpload, chooseLabel }) => {
    const toast = useRef(null);

    const handleUpload = () => {
        if (onUpload) {
            toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
            onUpload();
        }
    };

    const handleFileSelect = (event) => {
        const file = event.files[0];
        // Aquí puedes manejar la lógica relacionada con el archivo cargado
        console.log("Archivo cargado:", file);
    };

    return (
        <div className="flex justify-center p-4"> {/* Añadimos un relleno de 4 unidades en todos los lados */}
            <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
                <Toast ref={toast}></Toast>
                <FileUpload 
                    mode="basic" 
                    type={type}
                    name={name}
                    id={id} 
                    url={url} 
                    accept={accept} 
                    maxFileSize={maxFileSize} 
                    onUpload={handleUpload} 
                    auto 
                    chooseLabel={chooseLabel} 
                    onSelect={handleFileSelect} 
                />
            </div>
        </div>  
    );
};

export default ImgInput;
