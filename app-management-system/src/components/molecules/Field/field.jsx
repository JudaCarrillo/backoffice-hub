import React from "react";
import Label from "../../atoms/Label/label";
import Input from "../../atoms/Input/input";
const Field = ({
  id,
  name,
  type,
  value,
  onChange,
  isRequired,
  labelFor,
  labelText,
}) => {
  return (
    <div className="p-4">
      <Label htmlFor={labelFor} text={labelText} className="text-xl" />
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={isRequired}
        accept="image/*"
      />
    </div>
  );
};
export default Field;
