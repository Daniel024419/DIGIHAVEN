import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx'; // Import all functions and objects from xlsx
import { Api_connect_server } from '../../../APIs/Api_connect_server';
import { useNavigate } from "react-router-dom";

function ArtisanDashboardTable(props) {
  const artisanId = localStorage.getItem('artisanId');
  const navigate = useNavigate();

  const handleNavigate=()=>{
  navigate("/auth/artisan/dashboard/home");

  } 

  //awsw11232
  const api_connect = Api_connect_server();

  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState({
    completed: [],
    pending: [],
    cancelled: [],
  });
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [totalComplete, settotalComplete] = useState(0);
  const [totalPending, settotalPending] = useState(0);
  const [totalCancelled, settotalCancelled] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const completedResponse = await api_connect.get('/auth/fetch-bookings-completed-artisan/'+artisanId);
        const pendingResponse = await api_connect.get('/auth/fetch-bookings-pending-artisan/'+artisanId);
        const cancelledResponse = await api_connect.get('/auth/fetch-bookings-cancelled-artisan/'+artisanId);
        
        settotalCancelled(cancelledResponse.data.length);
        settotalPending(pendingResponse.data.length);
        settotalComplete(completedResponse.data.length);

        setData({
          completed: completedResponse.data,
        });
      } catch (error) {
        //console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [api_connect]);

  const getCategoryData = (category) => {

    if (data && category && Array.isArray(data[category]) && data[category]) {
      return data[category].filter((item) =>
        item.type.toLowerCase().includes(searchText.toLowerCase()) &&
        (startDate === '' || item.created_at >= startDate) && // Filter by start date
        (endDate === '' || item.created_at <= endDate) // Filter by end date
      );
    } else {

      return null;
    }

  };

  //consert table to xlsx data
  const exportToExcel = () => {
    const tableid = document.getElementById('myTable');
    const ws = XLSX.utils.table_to_sheet(tableid);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'SERVICE TABLE.xlsx');
  };
  return (
    <div className='service-table'>
      <div className="tab-buttons">

        <div className='export-btn'>
          <button onClick={handleNavigate} className="link-export-data-artisan" >
          <span>Bookings</span>  <span className="total-tag">{totalCancelled + totalPending + totalCancelled}</span> 
          </button>

          <button onClick={exportToExcel} className="link-export-data-artisan" >
            <span>Export</span>   <i className="fa fa-download" title="export data"></i>
          </button>
        </div>
      </div>


      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className='platformTableSearch'
      />
       <div className="filter-container">
      <div className='date-filter'>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        /> 
      <i className="fas fa-refresh ref-button"
      title="Refresh Table" onClick={()=>{window.location.href=''}} > </i>
      </div>
     
      </div>

      <h2>
        {activeTab === 0
          ? 'Completed Services'
          : activeTab === 1
            ? 'Pending Services'
            : 'Cancelled Services'}
      </h2>
      <table className="data-table" id="myTable">
        <thead>
          <tr>
            <th>Type</th>
            <th>Charge</th>
            <th>Loc</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {getCategoryData(activeTab === 0 ? 'completed' : activeTab === 1 ? 'pending' : 'cancelled').map(
            (item, index) => (
              <tr key={index}>
                <td>{item.type}</td>
                <td>{item.charge}</td>
                <td>{item.location}</td>
                <td>{item.created_at}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ArtisanDashboardTable;
