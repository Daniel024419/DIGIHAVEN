//includes
import Topnav from '../dashboard/includes/TopNav'
import Footer from '../dashboard/includes/Footer'
// importing components
import { useState } from 'react'

import SideBar from '../dashboard/includes/SideBar'
import BuyersOverview from '../dashboard/BuyersOverview'

import BuyersTable from '../dashboard/BuyersTable'
import Usersession from '../dashboard/session/Usersession'
import { Api_connect_server } from "../../APIs/Api_connect_server";

const Buyers = () => {


	const api_connect = Api_connect_server();
	const [buyers, setbuyers] = useState([]);
	//initiate  to check user session
	Usersession();
  
  
	// Fetch the image from the server
	api_connect.get('/auth/fetch-buyers')
	  .then((response) => {
  
		if (response.status === 200) {
		  // Check the status code for success (200 OK)
		  setbuyers(response.data);

		} else {
		  setbuyers([]);
		}
	  })
	  .catch((error) => {
		console.error('Error fetching buyers:', error);
	  });

	 return (
    <div className="dashboard-body">

      <SideBar />

      <section className="dashboard">

        <Topnav />

        <div className="dash-content">

          {   /*over view*/}
          <div className="buyersOverview">
            <BuyersOverview />
          </div>

          <div className="activity">
            <BuyersTable buyers={buyers} />
          </div>

        </div>


      </section>

      < Footer />
    </div>


  )
}

export default Buyers