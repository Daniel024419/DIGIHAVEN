import React, { useEffect, useState } from 'react';
import { Link  } from 'react-router-dom'; 

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([
    // Sample transaction data (you can replace this with your actual data)
    { id: 1, date: '2023-10-01', description: 'Transaction 1', amount: 100 },
    { id: 2, date: '2023-10-02', description: 'Transaction 2', amount: 150 },
    { id: 3, date: '2023-10-03', description: 'Transaction 3', amount: 75 },
    // Add more transactions here
  ]);

  const [searchInput, setSearchInput] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [sortColumn, setSortColumn] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleFiltering = () => {
    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const matchSearch =
        transaction.description.toLowerCase().includes(searchInput.toLowerCase()) ||
        transaction.id.toString().includes(searchInput.toLowerCase());

      const matchDateRange =
        (!startDate || transactionDate >= new Date(startDate)) &&
        (!endDate || transactionDate <= new Date(endDate));

      return matchSearch && matchDateRange;
    });

    setFilteredTransactions(filtered);
  };


const handlePrint = () => {
  // Get the table element to print
  const tableToPrint = document.querySelector('.transaction-table');

  // Create a new window for printing
  const newWindow = window.open('', '_blank');
  newWindow.document.open();

  // Add a title to the new window
  newWindow.document.write('<html><head><title>Print Table</title></head><body>');

  // Define inline styles for the table
  const tableStyles = `
    <style>
 transaction-table {
  width: 100%;
  border-collapse: collapse;
}

transaction-table th,
transaction-table td {
  padding: 10px;
  text-align: left;
  font-size: 17px;
}

transaction-table th {
  background-color: #333;
  color: #fff;
  cursor: pointer;
}

transaction-table th:hover {
  background-color: #555;
}

transaction-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}    </style>
  `;

  // Append the table styles to the new window's head
  newWindow.document.write(tableStyles);

  // Append the table content to the new window
  newWindow.document.write('<h1>Transaction Table</h1>');
  newWindow.document.write(tableToPrint.outerHTML);

  // Close the new window and trigger printing
  newWindow.document.write('</body></html>');
  newWindow.document.close();
  newWindow.print();
  newWindow.close();
};



  const handleSorting = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }

    const sorted = [...filteredTransactions].sort((a, b) => {
      if (column === 'id' || column === 'amount') {
        const orderFactor = sortOrder === 'asc' ? 1 : -1;
        return orderFactor * (a[column] - b[column]);
      } else {
        const orderFactor = sortOrder === 'asc' ? 1 : -1;
        return orderFactor * a[column].localeCompare(b[column]);
      }
    });

    setFilteredTransactions(sorted);
  };

  const handleRefresh = () => {
    setSearchInput('');
    setStartDate('');
    setEndDate('');
    setSortColumn('id');
    setSortOrder('asc');
    setFilteredTransactions(transactions);
  };

  useEffect(() => {
    handleFiltering();
  }, [searchInput, startDate, endDate, transactions]);

  return (
    <div className="transaction-table-container">
     

     <div className="title-top" >

      <h1 className="T-title" >Transaction Table </h1>  

      <button  className="trans-btn" ><Link to="#" onClick={handleRefresh} className="fas fa-refresh ref-button" title="Refresh Table"></Link></button>
</div>
    
      <div className="filters">
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          className="filter-input"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="input-end">

        <div className="action-btns" >
        <label>Start Date:</label>
        <button onClick={handlePrint} title="Print Report" > Print </button>

        </div>


        <input
          type="date"
          value={startDate}
           className="date-input"
          onChange={(e) => setStartDate(e.target.value)}
        />

         </div>

        <div className="input-end">
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
           className="date-input"
          onChange={(e) => setEndDate(e.target.value)}
        />

        </div>
       
      </div>
      <div className="table-container">
        <table className="transaction-table">
          <thead>
            <tr>
              <th onClick={() => handleSorting('id')}   title="Click to sort" >ID</th>
              <th onClick={() => handleSorting('date')} title="Click to sort">Date</th>
              <th onClick={() => handleSorting('description')} title="Click to sort">Description</th>
              <th onClick={() => handleSorting('amount')} title="Click to sort">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="4">No records found</td>
              </tr>
            ) : (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
