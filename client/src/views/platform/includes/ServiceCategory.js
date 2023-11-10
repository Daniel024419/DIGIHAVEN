import React, {useEffect, useState} from 'react'
import "../../../css/serviceCategory.css";
import Categories from './Categories';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { cartCategories, categoryData } from './utils';
import FilterCategory from './FilterCategory';
import myImage from "../../../uploads/bg.jpeg"
import {Link } from 'react-router-dom'; 
import { Api_connect_server } from '../../../APIs/Api_connect_server';
import spin from "../../../uploads/spin.gif"

const api_connect = Api_connect_server();

const ServiceCategory = () => {


const [filteredCards, setFilteredCards] = useState([]);
const [filter, setFilter] = useState('');
const [artisans, setArtisans] = useState([]);

useEffect(() => {
  try {
    api_connect.get("/auth/fetch-services-platform-all")
    .then((response) => {
      if (response.status === 200) {
        setArtisans(response.data);
        setFilteredCards(response.data);
        // console.log(response.data);
      } else if (response.data.statusCode === 501) {
        setFilteredCards([]);
      }
    }).catch((error) => {
      // console.log(error);
    })
  } catch (error) {
    //console.log(error);
  }
}, [api_connect]);

const filterCards = (buttonValue) => {
  const filtered = artisans.filter((card) => card.type === buttonValue);
  setFilteredCards(filtered);
};

const handleFilterChange = (e) => {
  const buttonValue = e.target.value;
  filterCards(buttonValue);
};

const handleShowAll = () => {
  setFilter('');
  setFilteredCards(artisans);
};








  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
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
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
  };



   
  return (
    <div className='service-container'>
    
        <h2 className='service-title'>
                service category
        </h2>
  
        <div className='card'>
            <Slider {...settings}>
                {cartCategories.map((cat,index) => {
                  // console.log(cat.type);
                  return <Categories key={index}  icon={cat.icon} title={cat.title} type={cat.type} handleFilterChange={handleFilterChange} bgColor={cat.bgColor} />
                })
              }
            </Slider>
            </div>
        {/* </div> */}

     <div>
     <div className='featured-category'>
        <div className='featured-category-title'>featured category</div>
        <Link to={"#"} style={{textDecoration:"none"}} className='featured-category-see-all' onClick={handleShowAll}>See All <i className="fas fa-refresh ref-button" title="Refresh Table"></i></Link>
     </div>

     {filteredCards.length === 0 ? 
            <div className="spin"><img src={spin} alt="spin" /></div>
             :
             <Link to={"#"}  className='category-filter' style={{textDecoration:"none"}}>
             {
             
                 filteredCards.map((cat)=>{
                   return <FilterCategory key={cat.type} type={cat.type} img={cat.profile} artisanId={cat.artisanId}  serviceId={cat.serviceId} />
                 })
               }
            </Link>
        }

  
       
 
     </div>
    </div>
  )
}

export default ServiceCategory


