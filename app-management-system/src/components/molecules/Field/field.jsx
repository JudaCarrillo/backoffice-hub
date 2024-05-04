import React from "react";
import Label from "../../atoms/Label/label";
import Input from "../../atoms/Input/input";
import { InputText } from "primereact/inputtext";

const Field = ({ id, name, type, value, onChange, labelFor, labelText }) => {
  return (
    <div>
      <Input 
      id={id} 
      name={name} 
      type={type} 
      value={value} 
      onChange={onChange} />
    </div>
  );
};

export default Field;
