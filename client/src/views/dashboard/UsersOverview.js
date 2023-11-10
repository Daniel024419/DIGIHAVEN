import { Api_connect_server } from "../../APIs/Api_connect_server";
import { useEffect, useState } from 'react'


const UsersOverview = () => {
  const api_connect = Api_connect_server();
  const [activeUsers, setActiveUsers] = useState(0);
  const [inActiveUsers, setinActiveUsers] = useState(0);

  useEffect(() => {
    api_connect.get('/auth/fetch-users/active')
      .then((response) => {
        const statusCode = response.data.statusCode;

        if (response.status === 200) {
          setActiveUsers(response.data.total);
        } else if (statusCode === 404) {
          setActiveUsers(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });

    // Fetch the image from the server
    api_connect.get('/auth/fetch-users/inactive')
      .then((response) => {
        const statusCode = response.data.statusCode;

        if (response.status === 200) {
          setinActiveUsers(response.data.total);
        } else if (statusCode === 404) {
          setinActiveUsers(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });

  }, [api_connect])
  return (
    <>
      <span className="title-top"><i className="fas fa-tachometer">
      </i> Dashbaord <span> {'>'} </span><i className="fas fa-users"></i>  Users</span>
      <div className="boxes">
        <div className="box box1">
          <i className="uil fas fa-user-check"></i>
          <span className="text">Active Users</span>
          <span className="number">{activeUsers}</span>
        </div>
        <div className="box box2">
          <i className="uil  fas fa-user-clock"></i>
          <span className="text">Inactive Users</span>
          <span className="number">{inActiveUsers}</span>
        </div>
        <div className="box box3">
          <i className="uil fas fa-users"></i>
          <span className="text">Last Visits</span>
          <span className="number">3</span>
        </div>

      </div>


    </>
  )
}



export default UsersOverview