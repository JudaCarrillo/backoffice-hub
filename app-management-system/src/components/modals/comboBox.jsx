import styled from "styled-components";
import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";
import Label from "../atoms/Label/label";

const ComboBox = ({ options, label, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelectChange = (e) => {
    const value = e.value;
    const selectedOption = options.find((option) => option.name === value.name);
    setSelectedValue(selectedOption);
    onChange(value.id);
  };

  return (
    <div className="card flex justify-content-center w-64">
      <Dropdown
        value={selectedValue}
        onChange={handleSelectChange}
        options={options}
        optionLabel="name"
        placeholder={label}
        className="h-10 w-10 "
      />
    </div>
  );
};

export default ComboBox;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Select = styled.select`
  display: flex;
  width: 230px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;

  &:hover,
  &:focus {
    border-color: #007bff;
  }
`;
