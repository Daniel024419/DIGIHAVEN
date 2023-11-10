import { Api_connect_server } from "../../APIs/Api_connect_server";
import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'; // Import all functions and objects from xlsx

const HomeTable = () => {
  let api_connect = Api_connect_server();
  const [activities, setActivities] = useState([]);

  useEffect(() => {

    function SearchTable() {

      var input, filter, table, tr, td, i, j, txtValue, noResultsRow;
      input = document.getElementById("searchInput-table");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");
      noResultsRow = table.querySelector(".no-results"); // Get the "No results found" row

      // Initially hide the "No results found" row
      if (noResultsRow) {
        noResultsRow.style.display = "none";
      }

      var noResultsFound = true; // Assume no results found

      for (i = 0; i < tr.length; i++) {
        var displayRow = false; // Assume row should be hidden

        // Check if the current row is the header row
        if (tr[i].classList.contains("header")) {
          tr[i].style.display = "";
          continue; // Skip further processing for the header row
        }

        // Loop through all <td> elements in the current row
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
          txtValue = td[j].textContent || td[j].innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            displayRow = true; // If a match is found, show the row
            noResultsFound = false; // Match found, so set to false
            break; // No need to check the remaining <td> elements
          }
        }

        if (displayRow) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }

      // Display "No results found" if no matching rows are found
      if (noResultsFound && noResultsRow) {
        noResultsRow.style.display = "block"; // Show the "No results found" row
      }
    }


    const searchInputtable = document.getElementById("searchInput-table");

    searchInputtable.addEventListener("keyup", SearchTable);


    //remove effect
    return () => {
      searchInputtable.removeEventListener("keyup", SearchTable);

    };
  }, [])


  useEffect(() => {
    api_connect.get('/auth/fetch-services-dashboard')
      .then((response) => {
        if (response.status == 200) {
          setActivities(response.data);
        } else {
          setActivities([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
      });

  }, [api_connect])



  //consert table to xlsx data
  const exportToExcel = () => {
    const tableid = document.getElementById('myTable');
    const ws = XLSX.utils.table_to_sheet(tableid);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Recent-Activities.xlsx');
  };


  return (


    <>




      <div className="title" id="top-button-table">
        <div className="tab-controll">
          <i className="uil uil-clock-three"></i>
          <span className="text"> Recent Activity ( {activities.length})</span>
        </div>

        <div className="add-user">
          <button onClick={exportToExcel} className="link-export-data" >
            <i className="fa fa-download" title="export data"></i> <span></span>  </button>
        </div>
      </div>





      <input type="text" id="searchInput-table" className="searchInput-table" placeholder="Search for anything.." title="Type in anything..." />

      <div className="table-container">
        <table id="myTable">

          <thead>
            <tr className="header">
              <th data-sort="id">ID</th>
              <th data-sort="type">Type</th>

              <th data-sort="location">Location</th>
              <th data-sort="location">Charge</th>



            </tr>
          </thead>


          <tbody >
            <tr className="no-results">
              <td colSpan="3">No results found</td>
            </tr>


            {

              activities.length > 0 && activities ? (
                activities.map((activity, index) => (
                  <tr key={activity._id}>
                    <td>{index}</td>
                    <td>{activity.type}</td>
                    <td>{activity.location}</td>
                    <td>GHS {activity.charge}</td>

                  </tr>))

              ) : (

                <tr className="">
                  <td colSpan="3">Loading data...</td>
                </tr>

              )
            }
          </tbody>

        </table>
      </div>



    </>
  )
}



export default HomeTable