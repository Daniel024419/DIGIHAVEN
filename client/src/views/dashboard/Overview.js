
import { Api_connect_server } from "../../APIs/Api_connect_server";
import { useEffect, useState } from 'react'

const Overview = () => {


  const api_connect = Api_connect_server();
  const [users, setUsers] = useState(0);
  const [artisans, setArtisans] = useState(0);
  const [buyers, setBuyers] = useState(0);
  const [services, setServices] = useState(0);
  const [feedbacks, setFeedbacks] = useState(0);
  const [supports, setSetSupport] = useState(0);


  useEffect(() => {
    api_connect.get('/auth/fetch-users')
      .then((response) => {
        const statusCode = response.data.statusCode;

        if (response.status === 200) {
          setUsers(response.data.length);
        } else if (statusCode === 404) {
          setUsers(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });

    api_connect.get('/auth/fetch-artisans')
      .then((response) => {
        const statusCode = response.data.statusCode;

        if (response.status === 200) {
          setArtisans(response.data.length);
        } else if (statusCode === 404) {
          setArtisans(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching artisans:', error);
      });

    //setServices
    api_connect.get('/auth/fetch-artisans')
      .then((response) => {
        const statusCode = response.data.statusCode;

        if (response.status === 200) {
          setServices(response.data.length);
        } else if (statusCode === 404) {
          setServices(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching artisans:', error);
      });

    //setBuyers
    api_connect.get('/auth/fetch-buyers')
      .then((response) => {
        const statusCode = response.data.statusCode;

        if (response.status === 200) {
          setBuyers(response.data.length);
        } else if (statusCode === 404) {
          setBuyers(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching artisans:', error);
      });


    api_connect.get('/auth/fetch-feebacks')
      .then((response) => {
        const statusCode = response.data.statusCode;

        if (response.status === 200) {
          setFeedbacks(response.data.length);
        } else if (statusCode === 404) {
          setFeedbacks(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching artisans:', error);
      });


    api_connect.get('/auth/fetch-supports')
      .then((response) => {
        const statusCode = response.data.statusCode;

        if (response.status === 200) {
          setSetSupport(response.data.length);
        } else if (statusCode === 404) {
          statusCode(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching artisans:', error);
      });

  }, [api_connect])


  return (
    <>
      <span className="title-top"><i className="fas fa-tachometer"></i> Dashbaord {'>'} <i className="fas fa-home"></i>  Home</span>
      <div className="boxes">
        <div className="box box1">
          <i className="uil fas fa-users"></i>
          <span className="text">Users</span>
          <span className="number">{users}</span>
        </div>

        <div className="box box1">
          <i className="uil fas fa-user-tie"></i>
          <span className="text">Artisans</span>
          <span className="number">{artisans}</span>
        </div>
        <div className="box box2">
          <i className="uil fas fa-building"></i>
          <span className="text">Services</span>
          <span className="number">{services}</span>
        </div>
        <div className="box box3">
          <i className="uil fas fa-users"></i>
          <span className="text">Buyers</span>
          <span className="number">{buyers}</span>
        </div>
        <div className="box box3">
          <i class="fas fa-people-carry" aria-hidden="true"></i>
          <span className="text">Supports</span>
          <span className="number">{supports}</span>
        </div>
        <div className="box box3">
          <i className="uil fas fa-comment"></i>
          <span className="text">Feebacks</span>
          <span className="number">{feedbacks}</span>
        </div>

      </div>


    </>
  )
}



export default Overview