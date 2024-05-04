import { FileUpload } from "primereact/fileupload";
import React, { useRef, useState } from "react";

const Img_input = ({ name, id, accept, onChange }) => {
  const [totalSize, setTotalSize] = useState(0);

  return (
    <div className="flex justify-center p-4">
      <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
        <FileUpload
          mode="basic"
          name={name}
          id={id}
          accept={accept}
          onSelect={onChange}
          onClear={() => setTotalSize(0)}
        />
      </div>
    </div>
  );
};

export default Img_input;
