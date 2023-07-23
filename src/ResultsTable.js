import React from 'react';
import './styles.css';

const getImageUrl = (partNumber, imageURL) => {
  if (imageURL) {
    return imageURL;
  } else {
    const defaultImageUrl = `/images/default.jpg`; // replace with the path to your default image
    const img = new Image();
    img.src = defaultImageUrl;
    if (img.naturalWidth === 0) {
      // the default image file does not exist, return null to not display the image
      return null;
    } else {
      // the default image file exists, return the URL
      return defaultImageUrl;
    }
  }
};


const ResultsTable = ({ selectedResult }) => {
  if (!selectedResult) {
    return <div>No results found.</div>;
  }

  return (
    <div className="info-container">
      <div className="info-box">
        <p>GERENTE DE CUENTA</p>
        <p>JAVIER GUAJARDO</p>
        <p>CONTACTO/WHATSAPP<br />+1 956 766 9358 OFICINA<br />+1 956 522 2708 MOBIL USA<br />899 245 3629 MEXICO DIRECTO</p>
      </div>

      {selectedResult.imageURL && (
        <img
          className="part-image"
          src={getImageUrl(selectedResult.PartNumber, selectedResult.imageURL)}
          alt={selectedResult.LongDescription}
        />
      )}

      <table className="results-table">
        <thead>
          <tr>
            <th>Costo</th>
            <th>SKU</th>
            <th>Descripcion</th>
            <th>Total en bodega</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{selectedResult.Cost}</td>
            <td>{selectedResult.PartNumber}</td>
            <td>{selectedResult.LongDescription}</td>
            <td>{selectedResult.TotalQty}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
