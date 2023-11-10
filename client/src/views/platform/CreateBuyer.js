import React from 'react'
import "../../css/createArtisans.css";
import PlatformFooter from "../platform/includes/platformFooter";
import TopNavBar from './includes/topNavBar';
import CreateBuyerFor from './includes/CreateBuyerForm';

const CreateBuyer = () => {
    return (
      <>
            <TopNavBar/>
                <CreateBuyerFor/>
            <PlatformFooter/>
      </>
        
      )
}

export default CreateBuyer