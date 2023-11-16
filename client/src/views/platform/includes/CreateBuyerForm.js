import React, { useState } from "react";
import "../../../css/createArtisans.css";
import UploadNewBuyerController from "../../../controllers/UploadNewBuyerController";


const CreateBuyerFor = () => {
  const [file, setFileBlog] = useState(null);
  const [serverFile, setserverFile] = useState(null);
  const [errors, setErrors] = useState({});
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
      setserverFile(file);
      const imageURL = URL.createObjectURL(file);

      setFileBlog(imageURL);
    }

    let error;
    if (event.target.name === "username" && event.target.value.length < 3) {
      error = "Username must be at least 3 characters long";
    } else if (
      event.target.name === "usermail" &&
      !/\S+@\S+\.\S+/.test(event.target.value)
    ) {
      error = "Email must be in a valid format";
    } else if (event.target.name === "tel" && event.target.value.length < 10) {
      error = "Mobile number must be at least 10 characters long";
    } else if (
      event.target.name === "location" &&
      event.target.value.length < 3
    ) {
      error = "Location must be at least 3 characters long";
    } else if (
      event.target.name === "password" &&
      event.target.value.length < 8
    ) {
      error = "Password must be at least 8 characters long";
    } else if (event.target.name === "file" && event.target.value.length < 3) {
      error = "Profile picture must be uploaded";
    }

    setErrors({ ...errors, [event.target.name]: error });

    setformData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // check if there are any errors in the form data.
    if (Object.values(errors).some((error) => error !== undefined)) {
      alert("Please correct the errors before submitting");
      return;
    }

    UploadNewBuyerController(formData, serverFile);

    //simulate the loader to hide
    setTimeout(() => {
    }, 9000);
    // }

    //end if
  };

  return (
    <div className="create-artisan-container">
      <div className="container">
        <h1>Buyer Registration</h1>

        <form onSubmit={handleSubmit}>
          <div className="form first">
            <div className="profile-icon">
              <div className="profile-icon-upload">
                {file && <img src={file} alt="Profile icon" />}
                {!file && (
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

                    <div className="input-field-error">
                      {errors.file && <p>{errors.file}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="details personal">
              <span className="title">Personal Details</span>

              <div className="fields">
                <div className="input-field">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                    placeholder="Enter username"
                  />
                  {/* <div className='input-field-error'>
                              {errors.username ? <div>{errors.username}</div> : null}
                              </div> */}

                  <div className="input-field-error">
                    {errors.username && <p>{errors.username}</p>}
                  </div>
                </div>

                <div className="input-field">
                  <label htmlFor="password">Password</label>
                  <input
                    type="text"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    placeholder="Enter password"
                  />
                  {/* <div className='input-field-error'>
                              {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                              </div> */}

                  <div className="input-field-error">
                    {errors.password && <p>{errors.password}</p>}
                  </div>
                </div>

                <div className="input-field">
                  <label htmlFor="usermail">Email</label>
                  <input
                    type="email"
                    id="usermail"
                    name="usermail"
                    onChange={handleChange}
                    value={formData.usermail}
                    placeholder="Enter email"
                  />

                  {/* <div className='input-field-error'>
                              {errors.usermail ? <div>{errors.usermail}</div> : null}
                      </div> */}

                  <div className="input-field-error">
                    {errors.usermail && <p>{errors.usermail}</p>}
                  </div>
                </div>

                <div className="input-field">
                  <label htmlFor="tel">Mobile Number</label>
                  <input
                    type="text"
                    id="tel"
                    name="tel"
                    onChange={handleChange}
                    value={formData.tel}
                    placeholder="Enter mobile number"
                  />
                  {/* <div className='input-field-error'>
                              {errors.tel ? <div>{errors.tel}</div> : null}
                              </div> */}
                  <div className="input-field-error">
                    {errors.tel && <p>{errors.tel}</p>}
                  </div>
                </div>
                <div className="input-field">
                  <label htmlFor="other_tel">
                    Other Mobile Number (Optional)
                  </label>
                  <input
                    type="text"
                    id="other_tel"
                    name="other_tel"
                    onChange={handleChange}
                    value={formData.other_tel}
                    placeholder="Enter other number"
                  />
                  {/* <div className='input-field-error'>
                              {errors.other_tel ? <div>{errors.other_tel}</div> : null}
                              </div> */}
                  <div className="input-field-error">
                    {errors.other_tel && <p>{errors.other_tel}</p>}
                  </div>
                </div>
                <div className="input-field">
                  <label htmlFor="location">Location</label>
                  <input
                    list="locations"
                    name="location"
                    id="location"
                    onChange={handleChange}
                    value={formData.location}
                    placeholder="Enter Location"
                  />

                  <datalist id="locations">
                    <option value="Edge" />
                    <option value="Firefox" />
                    <option value="Chrome" />
                    <option value="Opera" />
                    <option value="Safari" />
                  </datalist>
                  {/* <div className='input-field-error'>
                              {formik.errors.location ? <div>{formik.errors.location}</div> : null}
                      </div> */}
                  <div className="input-field-error">
                    {errors.location && <p>{errors.location}</p>}
                  </div>
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
  );
};

export default CreateBuyerFor;
