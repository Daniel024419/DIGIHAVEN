import React from 'react'
import { Link } from 'react-router-dom'
import  "../../../css/artisanCard.css";
import ArtisanProfile from '../servicesProviders'
import LazyLoad from "react-lazy-load"
import swal from 'sweetalert';
import { Api_connect_server } from '../../../APIs/Api_connect_server'



const ArtisanCard = ({username,location,artisanId,img}) => {
  let api_connect = Api_connect_server();
  let message;
  const handleFeedback =()=>{
    //handle userfeedback
    swal("Write something here:", {
      content: "input",
    })
    .then((			message,
      ) => {
        swal("Good job!", "Your feedabck is received", "success");
     
      api_connect.post('/auth/add-platform-feedback',
      { 			message,
      }, { headers: { 'Content-Type': 'multipart/form-data' }, })
      .then((response) => {

          if (response) {
              if (response.data.statusCode === 200) {
                  message = response.data.message;
                  swal({
                    title: "Good job!",
                    text: message,
                    icon: "success",
                    button: "Aww yiss!",
                  });
                  //window.location.reload();

              } else if (response.data.statusCode === 501) {
                  message = response.data.message;
                 
                  swal({
                    title: "Hmmm..!",
                    text: message,
                    icon: "warning",
                    dangerMode: true,
                    button: "Aww yiss!",
                  });

              }
          }


      })
      .catch((error) => {
          if (error) {
              message = error.data.message;
              swal({
                title: "Hmmm..!",
                text: message,
                icon: "warning",
                dangerMode: true,
                button: "Aww yiss!",
              });
          }
      })

    });
  }
  
  return (
    <div className='artisan-card' >
        <div className='artisan-card-upper'>
          <LazyLoad className='artisan-card-upper'>

              <img src={img} alt='artisan' className='artisan-img'/>
          </LazyLoad>
        </div>
        <div className='artisan-card-middle'>
           <h3>{username}</h3>
           <p>{location}</p>
        </div>
        <div className='artisan-card-bottom'>
           <Link to={`/service-provider/${artisanId}`} style={{textDecoration:"none"}}>
                <button className='artisan-card-btn'>More</button>
           </Link>

                <button className='artisan-card-btn' onClick={handleFeedback}>Feedback</button>
        </div>
    </div>
  )
}

export default ArtisanCard