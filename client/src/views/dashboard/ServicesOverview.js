import { Api_connect_server } from "../../APIs/Api_connect_server";
import { useEffect, useState } from 'react'
const ServicesOverview = () => {

  const api_connect = Api_connect_server();
  const [rejectedServices, setrejectedServices] = useState(0);
  const [PendingServices, setPendingServices] = useState(0);
  const [CompletedServices, setCompletedServices] = useState(0);

  useEffect(() => {

    api_connect.get('/auth/fetch-services-completed')
      .then((response) => {
        const statusCode = response.data.statusCode;

        if (response.status === 200) {
          setrejectedServices(response.data.length);
        } else if (statusCode === 404) {
          setrejectedServices(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
      });

    api_connect.get('/auth/fetch-services-pending')
      .then((response) => {
        const statusCode = response.data.statusCode;

        if (response.status === 200) {
          setPendingServices(response.data.length);
        } else if (statusCode === 404) {
          setPendingServices(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching Services:', error);
      });


    api_connect.get('/auth/fetch-services-completed')
      .then((response) => {
        const statusCode = response.data.statusCode;

        if (response.status === 200) {
          setCompletedServices(response.data.length);
        } else if (statusCode === 404) {
          setCompletedServices(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching Services:', error);
      });


  }, [api_connect])
  return (
    <>
      <span className="title-top"><i className="fas fa-tachometer">
      </i> Dashbaord <span> {'>'} </span><i className="fas fa-users"></i>  Services</span>
      <div className="boxes">
        <div className="box box1">
          <i class="fa fa-ban" aria-hidden="true"></i>
          <span className="text">Rejected</span>
          <span className="number">{rejectedServices}</span>
        </div>
        <div className="box box2">
          <i class="fa fa-clock-o" aria-hidden="true"></i>
          <span className="text">Pending</span>
          <span className="number">{PendingServices}</span>
        </div>
        <div className="box box3">
          <i className="uil fas fa-check"></i>
          <span className="text">Completed</span>
          <span className="number">{CompletedServices}</span>
        </div>

      </div>


    </>
  )
}

export default ServicesOverview