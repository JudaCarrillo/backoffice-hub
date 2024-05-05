import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import Label from "../../atoms/Label/label";

export default function CheckBox({ name, htmlfor, labelText }) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="p-4 w-12 h-15">
      <Label htmlFor={htmlfor} text={labelText} />
      <Checkbox
        onChange={(e) => setChecked(e.checked)}
        checked={checked}
        name={name}
      ></Checkbox>
    </div>
  );
}
