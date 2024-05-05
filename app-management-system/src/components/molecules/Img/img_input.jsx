import { FileUpload } from "primereact/fileupload";
import React, { useRef, useState } from "react";

const Img_input = ({ name, id, accept, onChange }) => {
const [totalSize, setTotalSize] = useState(0);

return (
    <div className="flex justify-center">
    <div className="rounded-lg  m-4 ">
    <FileUpload
    chooseOptions={{ label: "Seleccionar"
    , icon: "pi pi-fw pi-file h-12 -mr-4 justify-center w-4 flex items-center"
    , className: "w-full h-12 p-2 bg-white text-black shadow-md rounded-lg"
     }}
    mode="basic"
    name={name}
    id={id}
    accept={accept}
    onSelect={onChange}
    onClear={() => setTotalSize(0)}
    className=" m-2 w-44 h-12 "
/>
    </div>
    </div>
);
};

export default Img_input;
  