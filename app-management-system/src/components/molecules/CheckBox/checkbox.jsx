import React, { useState } from "react";
import { TriStateCheckbox } from "primereact/tristatecheckbox";

export default function ChkBox({ name, type }) {
  const [value, setValue] = useState(null);

  return (
    <div className="p-4 w-12 h-15">
      {" "}
      {/* Aumentamos el ancho y la altura del contenedor */}
      <TriStateCheckbox variant="filled" onChange={(e) => setValue(e.value)} />
    </div>
  );
}
