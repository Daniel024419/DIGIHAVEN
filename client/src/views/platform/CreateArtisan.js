import React,{useState,useEffect} from 'react'
import "../../css/createArtisans.css";
import PlatformFooter from "../platform/includes/platformFooter";
import TopNavBar from './includes/topNavBar';
import CreateArtisanForm from './includes/CreateArtisanForm';

const CreateArtisan = () => {
  
    
  return (
    <>
      <TopNavBar/>
       <CreateArtisanForm/>
    <PlatformFooter/>
    </>
    
  )
}

export default CreateArtisan