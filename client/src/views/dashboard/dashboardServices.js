//includes
import Topnav from '../dashboard/includes/TopNav'
import Footer from '../dashboard/includes/Footer'
// importing components
import { useState } from 'react'

import SideBar from '../dashboard/includes/SideBar'
import ServicesOverview from '../dashboard/ServicesOverview'

import ServicesTable from '../dashboard/ServicesTable'
import Usersession from '../dashboard/session/Usersession'
import { Api_connect_server } from "../../APIs/Api_connect_server";
const DashboardServices = () => {

  const api_connect = Api_connect_server();
  const [services, setservices] = useState([]);

  //initiate  to check user session
  Usersession();


  // Fetch the image from the server
  api_connect.get('/auth/fetch-services-dashboard')
    .then((response) => {

      if (response.status === 200) {
        // Check the status code for success (200 OK)
        setservices(response.data);




      } else {
        setservices([]);
      }
    })
    .catch((error) => {
      console.error('Error fetching services:', error);
    });


  return (
    <div className="dashboard-body">

      <SideBar />

      <section className="dashboard">

        <Topnav />

        <div className="dash-content">

          {   /*over view*/}
          <div className="servicesOverview">
            <ServicesOverview />
          </div>

          <div className="activity">
            <ServicesTable services={services} />
          </div>

        </div>


      </section>

      < Footer />
    </div>


  )
}

export default DashboardServices