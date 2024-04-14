import { useEffect, useState } from "react";
import styled from "styled-components";

const ComboBox = ({ callback, label, onChange }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await callback();
        setOptions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <Container>
      <div>
        <Select onChange={handleSelectChange}>
          <option value="">{label}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}{" "}
            </option>
          ))}
        </Select>
      </div>
    </Container>
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
