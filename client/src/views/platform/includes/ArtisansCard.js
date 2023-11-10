import React, { useEffect, useState } from 'react'
import ArtisanCard from './ArtisanCard'
import "../../../css/artisansCard.css";
import { artisanData } from './utils';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Api_connect_server } from '../../../APIs/Api_connect_server';
import { useAsyncError } from 'react-router-dom';


const api_connect = Api_connect_server();

const ArtisansCard = () => {

  const [artisans, setArtisans] = useState([])
  //fetch user profile
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    try {
      api_connect.get("/auth/fetch-artisans")
      .then((response) => {
        if (response.status === 200) {
          setArtisans(response.data)
     
        } else if (response.data.statusCode === 501) {
          setArtisans([])
        }
      }).catch((error) => {
        // alert("not connected to server")
        console.log(error) 
      })
    } catch (error) {
      // alert("not connected ")
      
    }


    // Fetch the image from the server
    api_connect.get('/auth/fetch-user-profile/' + artisans.profile, { responseType: "blob" })
  .then((response) => {
    if (response.status === 200) { // Check the status code for success (200 OK)
      return response.data; // Use response.data for Axios, not response.blob()
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

  },[imageSrc ,api_connect ]);



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };

  return (
    <>
      <h2 className='artisans-card-header'>
            Artisans
      </h2>
    <div className='artisans-card-container'>
 
        <div className='artisans-card-bottom'>

       <div className='artisans-card-list'>
                        {
                                artisans.map((artisan) =>
                                        <ArtisanCard
                                            key={artisan.artisanId}
                                            username={artisan.username}
                                            location={artisan.description}
                                            artisanId={artisan.artisanId}
                                            img={process.env.REACT_APP_API_URL_PRO + "/auth/fetch-user-profile/" + artisan.profile}
                                        />
                                    )
                                
                            }
       </div>
        </div>

    </div>
    </>
  )
}

export default ArtisansCard