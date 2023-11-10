import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { deleteBuyerController } from "../../controllers/DeleteController";

const BuyersTable = (props) => {

    const getResponseMsg = localStorage.getItem('message');
    const reponse_message_code = localStorage.getItem('reponse_message_code');


    // handle delete , send id to controller
    const handleDelete = async (buyerId) => {
        //pass buyerId as param to controller
        await deleteBuyerController(buyerId);
        return;
    };

    //clear message after effect
    useEffect(() => {


        setTimeout(() => {
            localStorage.removeItem('message');
            localStorage.removeItem('reponse_message_code');


        }, 6000)


    }, [reponse_message_code]);


    useEffect(() => {

        //handle notifications
        function closeNotificationSuccess() {
            const notification = document.getElementById('notification-success');
            notification.style.display = 'none';
        }

        function closeNotificationError() {
            const notification = document.getElementById('notification-error');
            notification.style.display = 'none';
        }

        const sucess_close_btn = document.getElementById('sucess_close_btn');

        const error_close_btn = document.getElementById('error_close_btn');


        //add listeners sucess
        if (sucess_close_btn) {
            sucess_close_btn.addEventListener('click', closeNotificationSuccess);
        }


        if (error_close_btn) {
            error_close_btn.addEventListener('click', closeNotificationError);
        }


        ///remove listeners after 
        return (() => {

            if (sucess_close_btn) {
                sucess_close_btn.removeEventListener('click', closeNotificationSuccess);
            }


            if (error_close_btn) {
                error_close_btn.removeEventListener('click', closeNotificationError);
            }

        });

    }, [reponse_message_code])


    //delete modal
    const [buyerId, setbuyerId] = useState('');
    const tabledeleteUsersModal = document.getElementById("tabledeleteUsersModal");
    let usernamedelete = document.getElementById("username-delete");
    let temp_buyerId;

    function handlebuyerIdBtn(event) {
        tabledeleteUsersModal.style.display = "block";
        temp_buyerId = event.target.getAttribute("databuyerId");
        usernamedelete.textContent = event.target.getAttribute("datausername");
        setbuyerId(temp_buyerId);
        //alert(buyerId);
        //alert(usernamedelete);
    }

    function handleconfirmDelete(event) {

        tabledeleteUsersModal.style.display = "none";
        //alert('logged out');
        handleDelete(buyerId);
        //alert(buyerId);
    }

    function handlecancelDelete() {
        tabledeleteUsersModal.style.display = "none";
        //alert('cancelled');
    }

    //preview
    const handleuserpreviewBtn = async (event) => {


        let previewdatabuyerId = event.target.getAttribute("databuyerId");
        let previewbuyerusername = event.target.getAttribute("previewbuyerusername");
        let Previewuserusermail = event.target.getAttribute("Previewuserusermail");
        let previewuserprofile = event.target.getAttribute("previewuserprofile");
        let previewusertel = event.target.getAttribute("previewusertel");
        let previewusercreated_at = event.target.getAttribute("previewusercreated_at");
        let previewuserupdated_at = event.target.getAttribute("previewuserupdated_at");
        let previewverified = event.target.getAttribute("previewverified");
        let previewlocations = event.target.getAttribute("previewlocations");
        let previewlastVisit = event.target.getAttribute("previewlastVisit");

        localStorage.setItem('previewlastVisit', previewlastVisit);
        localStorage.setItem('previewlocations', previewlocations);
        localStorage.setItem('previewdatabuyerId', previewdatabuyerId);
        localStorage.setItem('previewbuyerusername', previewbuyerusername);
        localStorage.setItem('Previewuserusermail', Previewuserusermail);
        localStorage.setItem('previewuserprofile', previewuserprofile);
        localStorage.setItem('previewusertel', previewusertel);
        localStorage.setItem('previewusercreated_at', previewusercreated_at);
        localStorage.setItem('previewverified', previewverified);
        localStorage.setItem('previewuserupdated_at', previewuserupdated_at);
    }


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
    }, []);

    //consert table to xlsx data
    const exportToExcel = () => {
        const tableid = document.getElementById('myTable');
        const ws = XLSX.utils.table_to_sheet(tableid);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'BUYERS.xlsx');
    };

    return (
        <>
            <div className="title" id="top-button-table">
                <div className="tab-controll">
                    <i className="uil uil-user"></i>
                    <span className="text"> BUYERS ( {props.buyers.length})</span>
                </div>

                <div className="add-user">

                    <button onClick={exportToExcel} className="link-export-data" >
                        <i className="fa fa-download" title="export data"></i> <span></span>  </button>
                </div>
            </div>

            <input
                type="text"
                id="searchInput-table"
                className="searchInput-table"
                placeholder="Search for anything.."
                title="Type in anything..."
            />

            <div className="table-container">
                <table id="myTable">
                    <thead>
                        <tr className="header">
                            <th data-sort="id">ID</th>
                            <th data-sort="username">Name</th>
                            <th data-sort="verefied">Verified</th>
                            <th data-sort="location">location</th>
                            <th data-sort="updated_at">Updated_at</th>
                            <th data-sort="created_at">Created_at</th>

                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="no-results">
                            <td colSpan="3">No results found</td>
                        </tr>

                        {

                            props.buyers.length > 0 && props.buyers ? (
                                props.buyers.map((buyer, index) => (
                                    <tr key={buyer._id}>

                                        <td>{index}</td>
                                        <td>{buyer.username}</td>


                                        {
                                            buyer.verified === 0 &&

                                            <td style={{ color: 'yellow' }}> Pending </td>

                                        }

                                        {
                                            buyer.verified === 1 &&
                                            <td style={{ color: 'green' }}>Yes</td>

                                        }

                                        {
                                            buyer.verified === 2 &&
                                            <td style={{ color: 'red' }}>Rejected</td>
                                        }


                                        <td>{buyer.location}</td>
                                        <td>{buyer.updated_at}</td>
                                        <td>{buyer.created_at}</td>
                                        <td className="menu-icon">
                                            <span className="menu-icon-content">&#8942;</span>
                                            <div className="table-dropdown dropdown-1">
                                                <Link to="/auth/dashboard/preview-buyer">
                                                    <i className="fas fa-eye" title="preview"
                                                        databuyerId={buyer.buyerId}
                                                        previewbuyerusername={buyer.username}
                                                        onClick={handleuserpreviewBtn}
                                                        Previewuserusermail={buyer.usermail}
                                                        previewuserprofile={buyer.profile}
                                                        previewusertel={buyer.tel}
                                                        previewusercreated_at={buyer.created_at}
                                                        previewuserupdated_at={buyer.updated_at}
                                                        previewverified={buyer.verified}
                                                        previewlocations={buyer.location}
                                                        previewlastVisit={buyer.last_visit}

                                                    ></i>
                                                </Link>
                                                <Link to="#">
                                                    <i
                                                        className="fas fa-trash delete-icon"
                                                        title="Delete"
                                                        id="buyerIdBtn"
                                                        databuyerId={buyer.buyerId}
                                                        datausername={buyer.username}
                                                        onClick={handlebuyerIdBtn}
                                                    ></i>
                                                </Link>
                                            </div>
                                        </td>
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

            <div className="action-modal" id="tabledeleteUsersModal">
                <div className="action-modal-content">
                    <h2>Delete User</h2>
                    <p>Are you sure you want to delete this buyer ? </p>
                    <p className="username" id="username-delete"></p>

                    <div className="action-buttons">
                        <button id="confirmDelete" onClick={handleconfirmDelete} >Yes</button>
                        <button id="cancelDelete" onClick={handlecancelDelete} >Cancel</button>
                    </div>
                </div>
            </div>

            {!getResponseMsg === "" && reponse_message_code === 200 && (

                <div class="notification-success" id="notification-success">
                    <span class="inner-notifications" >
                        <div> {getResponseMsg}</div>
                        <div class="close-button" id="sucess_close_btn" title="Close" >x</div>
                    </span>
                </div>
            )

            }


            {!getResponseMsg === "" && reponse_message_code === 501 && (
                <div class="notification-error" id="notification-error">
                    <span class="inner-notifications" >
                        <div> {getResponseMsg}</div>
                        <div class="close-button" id="error_close_btn" title="Close" >x</div>
                    </span>
                </div>
            )}
        </>
    );
};

export default BuyersTable