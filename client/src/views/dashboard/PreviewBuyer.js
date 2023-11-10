//includes
import Topnav from '../dashboard/includes/TopNav'
import Footer from '../dashboard/includes/Footer'

import SideBar from '../dashboard/includes/SideBar'
import { useEffect, useState } from 'react'

import { Api_connect_server } from '../../APIs/Api_connect_server'
//importing session
import Usersession from '../dashboard/session/Usersession'
import PreviewBuyerForm from './PreviewBuyerForm';

const PreviewBuyer = () => {

    const api_connect = Api_connect_server();
    //initiate  to check user session
    Usersession();
  
    const username = localStorage.getItem('previewbuyerusername');
    const profile = localStorage.getItem('previewuserprofile');
    const verified = localStorage.getItem('previewverified');
  
  
    //fetch user profile
    const [imageSrc, setImageSrc] = useState('');
  
    useEffect(() => {
      // Fetch the image from the server
      api_connect.get('/auth/fetch-user-profile/' + profile, { responseType: "blob" })
        .then((response) => {
          if (response.status === 200) { // Check the status code for success (200 OK)
            return response.data;
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .then((imageData) => {
          const src = URL.createObjectURL(new Blob([imageData]));
          setImageSrc(src);
        })
        .catch((error) => {
          console.error('Error fetching image:', error);
        });
  
  
    }, [imageSrc, profile, api_connect]);
  
  
  
  
    return (
  
      <div className="dashboard-body">
  
        <SideBar />
  
        <section className="dashboard">
  
          <Topnav />
  
  
          <div className="dash-content">
  
  
  
            {   /*over view*/}
  
  
            <div className="profile-container">
              <span className="title-top">
                <i className="fas fa-tachometer"></i> Dashbaord {'>'}
                 <i className="fas fa-user"></i>  Preview Buyer ( {username} )</span>
  
              <div className="container-left">
  
                <h1 style={{ textTransform: 'upperCase' }}   >
                  {
                    verified === 1 &&
                    <span className="artisan-tag" >
                      {'Verified'} <i className="uil fas fa-check"></i>
                    </span>
  
                  }
  
  
                  {
                    verified === 0 &&
                    <span className="artisan-tag-error" >
                      {'Not Verified'} <i className="uil fas fa-error"></i>
                    </span>
  
                  }
  
                  {
                    verified === 2 &&
                    <span className="artisan-tag-error" >
                      {'Rejected'} <i className="uil fas fa-error"></i>
                    </span>
  
                  }
  
                </h1>
  
                {
                  imageSrc ? (
                    <img src={imageSrc} alt="fetched" className="userprofil-edit" />
  
                  ) : (
                    <img src={"../../uploads/Iphone-spinner-2.gif"} style={{ width: '100px', height: '100px' }} alt="default gif" className="userprofil-edit" />
  
  
                  )
                }
  
  
  
              </div>
  
              <div className="container-right">
                <PreviewBuyerForm />
              </div>
  
            </div>
  
  
          </div>
  
  
  
        </section>
  
  
        < Footer />
      </div>
  
  
    );
  }
  

export default PreviewBuyer