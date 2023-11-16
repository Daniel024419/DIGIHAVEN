import React, { useEffect, useState } from "react";
import "../../css/serviceProviders.css";
import profilePicture from "../../uploads/bg.jpeg";
import TopNavBar from "./includes/topNavBar";
import PlatformFooter from "./includes/platformFooter";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { Api_connect_server } from "../../APIs/Api_connect_server";

const api_connect = Api_connect_server();

const ArtisanProfile = (props) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const {
    name = "John Doe",
    email = "johndoe123@example.com",
    services,
  } = props;
  const [artisans, setArtisans] = useState([]);

  const placeholderServiceImages = Array(4).fill(profilePicture);

  useEffect(() => {
    try {
      api_connect
        .get(`/auth/fetch-artisans/${id}`)
        .then((response) => {
          if (response.status === 200) {
            setArtisans(response.data);
          } else if (response.data.statusCode === 501) {
            setArtisans([]);
          }
        })
        .catch((error) => {
          // console.log(error);
        });
    } catch (error) {
      //console.log(error);
    }
  }, []);

  // console.log(artisans[0].username);

  return (
    <div>
      <TopNavBar />
      <div className="artisan-profile animated-fade-in">
        {artisans.map((artisan, index) => (
          <div key={index} className="profile-header animated-bounce">
            <img
              src={profilePicture}
              alt={`${artisan.username}'s Profile`}
              className="profile-picture"
            />
            <h2>{artisan.username}</h2>
            <p>{artisan.usermail}</p>
          </div>
        ))}

        <div className="buttons animated-fade-in">
          <FontAwesomeIcon icon={faPhone} className="book-button" />
          <FontAwesomeIcon icon={faBook} className="call-button" />
        </div>
        <div className="services animated-slide-in">
          <h3>Services</h3>
          <div className="service-grid">
            {services && services.length > 0
              ? services.map((service, index) => (
                  <img
                    key={index}
                    src={
                      process.env.REACT_APP_API_URL_PRO +
                      "/auth/fetch-user-profile/" +
                      service.profile
                    }
                    alt={service.name}
                    className="service-image"
                  />
                ))
              : placeholderServiceImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Service ${index + 1}`}
                    className="service-image"
                  />
                ))}
          </div>
        </div>
      </div>
      <PlatformFooter />
    </div>
  );
};

export default ArtisanProfile;
