import React from 'react'
import "../../../css/banner.css";

const Banner = () => {
  return (
    <div className='banner-container'>
        <div className='banner-text'>
            <p>
                The search for the perfect service provider is over.
            </p>
        </div>
        <div className='banner-logo'>
            <div className='banner-logo-icon'>DH</div>
            <div className='banner-logo-text'>DigiHaven</div>
        </div>
    </div>
  )
}

export default Banner