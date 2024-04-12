import React from 'react';
import { CSVLink } from 'react-csv';

const descargar = ({ data }) => {
  const headers = Object.keys(data[0]); //Debo colocar los encabezados de la columnas

  return (
    <CSVLink data={data} headers={headers} filename={'data.csv'}>
      Descargar CSV
    </CSVLink>
  );
};

export default descargar;
