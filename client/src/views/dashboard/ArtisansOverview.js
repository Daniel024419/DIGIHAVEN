import { Api_connect_server } from "../../APIs/Api_connect_server";
import { useEffect, useState } from 'react'

const ArtisansOverview = () => {

  const api_connect = Api_connect_server();
  const [activeArtisans, setActiveArtisans] = useState(0);
  const [inActiveArtisans, setinActiveArtisans] = useState(0);
  const [VerfiedArtisans, setVerifiedArtisans] = useState(0);

  useEffect(() => {

    api_connect.get('/auth/fetch-artisans/active')
      .then((response) => {
        const statusCode = response.data.statusCode;

        if (response.status === 200) {
          setActiveArtisans(response.data.total);
        } else if (statusCode === 404) {
          setActiveArtisans(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });

    api_connect.get('/auth/fetch-artisans/inactive')
      .then((response) => {
        const statusCode = response.data.statusCode;

        if (response.status === 200) {
          setinActiveArtisans(response.data.total);
        } else if (statusCode === 404) {
          setinActiveArtisans(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching artisans:', error);
      });


    api_connect.get('/auth/fetch-artisans/verified')
      .then((response) => {
        const statusCode = response.data.statusCode;

        if (response.status === 200) {
          setVerifiedArtisans(response.data.total);
        } else if (statusCode === 404) {
          setVerifiedArtisans(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching artisans:', error);
      });


  }, [api_connect])
  return (
    <>
      <span className="title-top"><i className="fas fa-tachometer">
      </i> Dashbaord <span> {'>'} </span><i className="fas fa-users"></i>  Artisans</span>
      <div className="boxes">
        <div className="box box1">
          <i className="uil fas fa-users"></i>
          <span className="text">Active</span>
          <span className="number">{activeArtisans}</span>
        </div>
        <div className="box box2">
          <i className="uil fas fa-exclamation-circle"></i>
          <span className="text">Inactive</span>
          <span className="number">{inActiveArtisans}</span>
        </div>
        <div className="box box3">
          <i className="uil fas fa-check"></i>
          <span className="text">Verified</span>
          <span className="number">{VerfiedArtisans}</span>
        </div>

      </div>


    </>
  )
}



export default ArtisansOverview