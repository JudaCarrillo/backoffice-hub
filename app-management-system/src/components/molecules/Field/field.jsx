import React from "react";
import Label from "../../atoms/Label/label";
import Input from "../../atoms/Input/input";

const Field = ({ id, name, type, value, onChange, labelFor, labelText }) => {
  return (
    <div>
      <Label htmlFor={labelFor} text={labelText} />
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        accept="image/*"
      />
    </div>
  );
};

export default Field;
