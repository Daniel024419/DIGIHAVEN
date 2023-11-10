import React from "react";
import "../../../css/serviceForm.css";
import {UploadNewServiceArtisan} from "../../../controllers/ArtisanPlatformServiceController";
import { useState } from "react";
import swal from 'sweetalert';

const CreateServiceForm = () => {
  const [file, setFile] = useState(null);
 
 const username = localStorage.getItem('username');
 const artisanId = localStorage.getItem('artisanId');

  const [formData, setformData] = useState({
    serviceId: Math.random().toString(36).substr(2, 90),
    artisanId:artisanId,
    description:'',
    charge:'',
    type:'',
    location:'',
    created_by:username,
    tel:'',
    created_at:'',
  });

  const handleSubmit = (event) => {

    event.preventDefault();
    //check for empty input
    if (
      formData.description === "" ||
      formData.charge === "" ||
      formData.location === "" ||
      formData.type === "" 
    ) {
      swal({
        title: "Form Data",
        text: "All input are required",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        });
    } else {
      UploadNewServiceArtisan(formData , file);
    }

    return;
  };

  const handleChange = (event) => {
    //check input type
    if (event.target.type === "file") {
      setFile(event.target.files[0]);
    }
    setformData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="serviceFormContainer">
      <div className="formwrapper">
        
          <form   onSubmit={handleSubmit} >
            <div className="form-group">
              <label htmlFor="name">Charge:</label>
              <input
                type="text"
                id="Charge"
                name="charge"
                onChange={handleChange}  value={formData.charge}  placeholder="Charge"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Description:</label>
              <input
                type="text"
                as="textarea"
                id="Description"
                name="description"
                onChange={handleChange}  value={formData.description}  placeholder="Description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Phone:</label>
              <input type="text" id="tel" name="tel" onChange={handleChange}  value={formData.tel}  placeholder="Phone" />
            </div>
            <div className="form-group">
              <label htmlFor="name">Location:</label>
              <input
                type="text"
                id="Location"
                name="location"
                onChange={handleChange}  value={formData.location}  placeholder="Location"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Profile:</label>
              <input
                type="file"
                id="Profile"
                name="file"
                onChange={handleChange}  value={formData.file}  placeholder="Profile"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Email:</label>
              <input type="email" id="email" name="usermail" onChange={handleChange}  value={formData.usermail}  placeholder="Email" />
            </div>

            {/* ... other inputs */}

            <div className="form-group">
              <label htmlFor="name">Type:</label>
              <select
                
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="type"
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="cleaning">Cleaning</option>
                <option value="washing">Washing</option>
                <option value="singing">Singing</option>
                <option value="cooking">Cooking</option>
                <option value="reading">Reading</option>
                <option value="gardening">Gardening</option>
                <option value="coding">Coding</option>
                <option value="exercising">Exercising</option>
                <option value="painting">Painting</option>
                <option value="photography">Photography</option>
                <option value="meditating">Meditating</option>
                <option value="writing">Writing</option>
                <option value="home cleaning">Home Cleaning</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrician services">
                  Electrician Services
                </option>
                <option value="gardening services">Gardening Services</option>
                <option value="pest control">Pest Control</option>
                <option value="home renovation">Home Renovation</option>
                <option value="appliance repair">Appliance Repair</option>
                <option value="interior design">Interior Design</option>
                <option value="furniture assembly">Furniture Assembly</option>
                <option value="carpentry">Carpentry</option>
                <option value="roofing services">Roofing Services</option>
                <option value="building construction">
                  Building Construction
                </option>
                <option value="concrete work">Concrete Work</option>
                <option value="bricklaying">Bricklaying</option>
                <option value="plastering">Plastering</option>
                <option value="flooring installation">
                  Flooring Installation
                </option>
                <option value="structural engineering">
                  Structural Engineering
                </option>
                <option value="landscaping">Landscaping</option>
                <option value="window installation">Window Installation</option>
                <option value="siding installation">Siding Installation</option>
                <option value="insulation services">Insulation Services</option>
                <option value="yoga at home">Yoga at Home</option>
                <option value="bodyweight exercises">
                  Bodyweight Exercises
                </option>
                <option value="home spa day">Home Spa Day</option>
                <option value="pilates">Pilates</option>
                <option value="indoor cycling">Indoor Cycling</option>
                <option value="stretching">Stretching</option>
                <option value="meditation">Meditation</option>
                <option value="dance workout">Dance Workout</option>
                <option value="home gym workout">Home Gym Workout</option>
              </select>
            </div>

            <div>
              <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
          </form>
       
      </div>
    </div>
  );
};

export default CreateServiceForm;
