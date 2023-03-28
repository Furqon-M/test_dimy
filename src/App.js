import React, { useState } from 'react';

function App() {
  const [rows, setRows] = useState([{ productName: "", productPrice: 0, quantity: 1, total: 0 }]);
  const [grandTotal, setGrandTotal] = useState(0);

  const handleProductNameChange = (index, value) => {
    const newRows = [...rows];
    newRows[index].productName = value;
    setRows(newRows);
  };
  
  const handleAddRow = () => {
    setRows([...rows, { productName: '', productPrice: 0, quantity: 1, total: 0 }]);
  };

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };
  
  const calculateGrandTotal = (newRows) => {
    const grandTotal = newRows.reduce((acc, cur) => acc + cur.total, 0);
    setGrandTotal(grandTotal);
  };

  const handleProductPriceChange = (index, value) => {
    const newRows = [...rows];
    const row = newRows[index];
    row.productPrice = value;
    row.total = row.productPrice * row.quantity;
    setRows(newRows);
    setGrandTotal(newRows.reduce((total, row) => total + row.total, 0));
  };

  const handleQuantityChange = (index, value) => {
    const newRows = [...rows];
    const row = newRows[index];
    row.quantity = value;
    row.total = row.productPrice * row.quantity;
    setRows(newRows);
    setGrandTotal(newRows.reduce((total, row) => total + row.total, 0));
  };

  const handleAlert = () => {
    alert('Quantity must be at least 1');
  };

  const renderRow = (row, index) => (
    <tr key={index}>
      <td>
        <input type="text" value={row.productName} onChange={(e) => handleProductNameChange(index, e.target.value)} />
      </td>
      <td>
        <input type="number" min="0" value={row.productPrice} onChange={(e) => handleProductPriceChange(index, e.target.value)} />
      </td>
      <td>
        <input type="number" min="1" value={row.quantity} onChange={(e) => handleQuantityChange(index, e.target.value)} onBlur={(e) => e.target.value < 1 && handleAlert()} />
      </td>
      <td>{row.total}</td>
      <td>
        {rows.length > 1 && (
          <button onClick={() => handleDeleteRow(index)}>Delete</button>
        )}
      </td>
    </tr>
  );
  

  return (
    <div>
      <button onClick={handleAddRow}>New</button>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(renderRow)}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Grand Total</td>
            <td>{grandTotal}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
