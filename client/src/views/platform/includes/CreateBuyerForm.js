import React,{useState} from 'react'
import "../../../css/createArtisans.css";
import { useFormik } from 'formik';
import { buyerValidate } from './utils';
import axios from 'axios';
import { Api_connect_server } from '../../../APIs/Api_connect_server';
import UploadNewBuyerController from '../../../controllers/UploadNewBuyerController';

const api_connect = Api_connect_server();


const CreateBuyerFor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFileBlog] = useState(null);
  const [ serverFile , setserverFile]= useState(null);
  const [formData, setformData] = useState({
    // userID: Math.random().toString(36).substr(2, 50),
    username: "",
    password: "",
    usermail: "",
    tel: "",
    other_tel: "",
    location: "",
    work_days_from: "",
    work__days_end: "",
  });

  const handleChange = (event) => {
    //check input type
    if (event.target.type === "file") {
      
      const file = event.target.files[0];
      setserverFile(file)
      const imageURL = URL.createObjectURL(file);

      setFileBlog(imageURL);
    }

   

    setformData({ ...formData, [event.target.name]: event.target.value });
  };

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  //   setDragOver(true);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    //check for empty input
    if (
      formData.username === "" ||
      formData.password === "" ||
      formData.usermail === "" ||
      formData.tel === "" ||
      formData.other_tel === "" ||
      formData.location === "" ||
      // formData.work_days_from === "" ||
      // formData.work__days_end === "" ||
      file === ""
    ) {
      alert("all input are required..");
    } else {
      setIsLoading(true);
      //send data to controller when auth..
      //send drag file

      UploadNewBuyerController(formData, serverFile);


      //simulate the loader to hide
      setTimeout(() => {
        setIsLoading(false);
      }, 9000);
    }

    //end if
  };


return (
          <div className="create-artisan-container">
          <div className="container">
          <h1>Buyer Registration</h1>

          <form onSubmit={handleSubmit}>
              <div className="form first">
                  <div className='profile-icon'>
                      <div className="profile-icon-upload">
                          {  file && 
                              <img src={file} alt="Profile icon" />
                            }
                            {!file &&


                          
                              <div className="upload-button">
                              <label htmlFor="profileImageUpload">
                                  <i className="fas fa-upload"></i> Upload Profile Picture
                              </label>
                              <input
                                  type="file"
                                  id="profileImageUpload"
                                  name="file"
                                  value={serverFile}
                                  onChange={handleChange}
                                  required
                              />
                      </div>
                          }
                  </div>
              </div>
                  <div className="details personal">
                      <span className="title">Personal Details</span>

                      <div className="fields">
                          <div className="input-field">
                              <label htmlFor='username'>Username</label>
                              <input type="text" id="username" name="username" onChange={handleChange} value={formData.username} placeholder="Enter username" />
                              {/* <div className='input-field-error'>
                              {errors.username ? <div>{errors.username}</div> : null}
                              </div> */}
                          </div>

                          <div className="input-field">
                              <label htmlFor='password'>Password</label>
                              <input type="text" id="password" name="password" onChange={handleChange} value={formData.password} placeholder="Enter password" />
                              {/* <div className='input-field-error'>
                              {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                              </div> */}
                          </div>

                          <div className="input-field">
                              <label htmlFor='usermail'>Email</label>
                              <input type="email" id="usermail" name="usermail" onChange={handleChange} value={formData.usermail} placeholder="Enter email" />
                     
                              {/* <div className='input-field-error'>
                              {errors.usermail ? <div>{errors.usermail}</div> : null}
                              </div> */}
                          </div>

                          <div className="input-field">
                              <label htmlFor='tel'>Mobile Number</label>
                              <input type="text" id="tel" name="tel" onChange={handleChange} value={formData.tel} placeholder="Enter mobile number" />
                              {/* <div className='input-field-error'>
                              {errors.tel ? <div>{errors.tel}</div> : null}
                              </div> */}
                          </div>
                          <div className="input-field">
                              <label htmlFor='other_tel'>Other Mobile Number (Optional)</label>
                              <input type="text" id='other_tel' name='other_tel' onChange={handleChange} value={formData.other_tel} placeholder="Enter other number" />
                              {/* <div className='input-field-error'>
                              {errors.other_tel ? <div>{errors.other_tel}</div> : null}
                              </div> */}
                          </div>
                          <div className="input-field">
                                  <label htmlFor="location">Location</label>
                                  <input list="locations"  name="location" id="location" onChange={handleChange} value={formData.location}  placeholder='Enter Location'/>

                                  <datalist id="locations">
                                          <option value="Edge"/>
                                          <option value="Firefox"/>
                                          <option value="Chrome"/>
                                          <option value="Opera"/>
                                          <option value="Safari"/>
                                  </datalist>
                                  {/* <div className='input-field-error'>
                              {formik.errors.location ? <div>{formik.errors.location}</div> : null}
                              </div> */}
                          </div>
                          <button type="submit">
                                  <span class="btnText">Register as Buyer</span>
                          </button>
                      </div>
                  </div>
              </div>
          </form>
          </div>


          </div>

)
}

export default CreateBuyerFor