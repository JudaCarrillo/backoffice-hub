import { FileUpload } from "primereact/fileupload";
import React, { useRef, useState } from "react";

const Img_input = ({ name, id, accept, onChange }) => {
const [totalSize, setTotalSize] = useState(0);

return (
    <div className="flex justify-center">
    <div className="bg-white border border-black rounded-lg shadow-md m-4 ">
    <FileUpload
    mode="basic"
    name={name}
    id={id}
    accept={accept}
    onSelect={onChange}
    onClear={() => setTotalSize(0)}
    className="p-1 m-3 w-10 rounded-lg"
/>
    </div>
    </div>
);
};

export default Img_input;
  