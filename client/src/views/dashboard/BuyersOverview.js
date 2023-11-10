import { Api_connect_server } from "../../APIs/Api_connect_server";
import { useEffect, useState } from 'react'


const BuyersOverview = () => {
  const api_connect = Api_connect_server();
  const [activeBuyers, setActiveBuyers] = useState(0);
  const [inActiveBuyers, setinActiveBuyers] = useState(0);
  const [VerifiedBuyers, setVerifiedBuyers] = useState(0);

  useEffect(() => {
    api_connect.get('/auth/fetch-buyers/active')
      .then((response) => {
        const statusCode = response.data.statusCode;

        if (response.status === 200) {
          setActiveBuyers(response.data.total);
        } else if (statusCode === 404) {
          setActiveBuyers(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching buyers:', error);
      });

    // Fetch the image from the server
    api_connect.get('/auth/fetch-buyers/inactive')
      .then((response) => {
        const statusCode = response.data.statusCode;

        if (response.status === 200) {
          setinActiveBuyers(response.data.total);
        } else if (statusCode === 404) {
          setinActiveBuyers(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching buyers:', error);
      });

      // Fetch the image from the server
    api_connect.get('/auth/fetch-buyers/verified')
    .then((response) => {
      const statusCode = response.data.statusCode;

      if (response.status === 200) {
        setVerifiedBuyers(response.data.total);
      } else if (statusCode === 404) {
        setVerifiedBuyers(0);
      }
    })
    .catch((error) => {
      console.error('Error fetching buyers:', error);
    });



  }, [api_connect])
  return (
    <>
      <span className="title-top"><i className="fas fa-tachometer">
      </i> Dashbaord <span> {'>'} </span><i className="fas fa-Buyers"></i>  Buyers</span>
      <div className="boxes">
        <div className="box box1">
          <i className="uil fas fa-user-check"></i>
          <span className="text">Active</span>
          <span className="number">{activeBuyers}</span>
        </div>
        <div className="box box2">
          <i className="uil  fas fa-user-clock"></i>
          <span className="text">Inactive</span>
          <span className="number">{inActiveBuyers}</span>
        </div>
        <div className="box box3">
          <i className="uil fas fa-check"></i>
          <span className="text">Verified</span>
          <span className="number">{VerifiedBuyers}</span>
        </div>

      </div>


    </>
  )
}



export default BuyersOverview