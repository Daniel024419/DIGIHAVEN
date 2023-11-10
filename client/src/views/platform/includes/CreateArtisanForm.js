import React, { useState } from 'react'
import "../../../css/createArtisans.css";
import { useFormik } from 'formik';
import UploadNewArtisanController from '../../../controllers/UploadNewArtisanController';

const CreateArtisanForm = () => {
    const [isLoading, setIsLoading] = useState(false);
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
        expertise: "",
        work_days_from: "",
        occupation: '',
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


        let error;
        if (event.target.name === 'username' && event.target.value.length < 3) {
            error = 'Username must be at least 3 characters long';
        } else if (event.target.name === 'usermail' && !/\S+@\S+\.\S+/.test(event.target.value)) {
            error = 'Email must be in a valid format';
        } else if (event.target.name === 'tel' && event.target.value.length < 10) {

            error = 'Mobile number must be at least 10 characters long';
        }
        else if (event.target.name === 'location' && event.target.value.length < 3) {
            error = 'Location must be at least 3 characters long';
        } else if (event.target.name === 'password' && event.target.value.length < 8) {
            error = 'Password must be at least 8 characters long';
        }
        else if (event.target.name === 'expertise' && event.target.value.length < 3) {
            error = 'Occupation must be at least 3 characters long';
        }
        else if (event.target.name === 'work_days_from' && event.target.value.length < 3) {
            error = 'Working days must be at least 3 characters long';
        }
        else if (event.target.name === "file" && event.target.value.length < 3) {
            error = 'Profile picture must be uploaded';
        }

        setErrors({ ...errors, [event.target.name]: error });

        setformData({ ...formData, [event.target.name]: event.target.value });
    };



    const handleSubmit = (event) => {
        event.preventDefault();

        // Check for errors
        //   if (Object.values(errors).some(error => error !== undefined)) {
        //     alert('Please correct the errors before submitting');
        //     return;
        //   }


        //check for empty input
        //   if (
        //     formData.username === "" ||
        //     formData.password === "" ||
        //     formData.usermail === "" ||
        //     formData.tel === "" ||
        //     formData.other_tel === "" ||
        //     formData.location === "" ||
        //     file === ""
        //   ) {
        //     alert("all input are required..");
        //   } else {

        // Check for errors
        if (Object.values(errors).some((error) => error !== undefined)) {
            alert('Please correct the errors before submitting');
            return;
        }
        setIsLoading(true);


        UploadNewArtisanController(formData, serverFile);

        console.log(formData)

        setTimeout(() => {
            setIsLoading(false);
        }, 9000);
        //   }


    };


    return (
        <div className="create-artisan-container">
            <div className="container">
                <h1>Artisan Registration</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form first">
                        <div className='profile-icon'>
                            <div className="profile-icon-upload">
                                {file &&
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
                                        <div className="input-field-error">
                                            {errors.file && <p>{errors.file}</p>}
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="details personal">
                            <span className="title">Personal Details</span>

                            <div className="fields">
                                <div className="input-field">
                                    <label htmlFor='username'>Username</label>
                                    <input type="text" id="username" name="username" onChange={handleChange} value={formData.username} placeholder="Enter username" required />
                                    <div className="input-field-error">
                                        {errors.username && <p>{errors.username}</p>}
                                    </div>
                                </div>

                                <div className="input-field">
                                    <label htmlFor='password'>Password</label>
                                    <input type="text" id="password" name="password" onChange={handleChange} value={formData.password} placeholder="Enter password" required />
                                    <div className="input-field-error">
                                        {errors.password && <p>{errors.password}</p>}
                                    </div>
                                </div>

                                <div className="input-field">
                                    <label htmlFor='usermail'>Email</label>
                                    <input type="email" id="usermail" name="usermail" onChange={handleChange} value={formData.usermail} placeholder="Enter email" required />

                                    <div className="input-field-error">
                                        {errors.usermail && <p>{errors.usermail}</p>}
                                    </div>
                                </div>

                                <div className="input-field">
                                    <label htmlFor='tel'>Mobile Number</label>
                                    <input type="text" id="tel" name="tel" onChange={handleChange} value={formData.tel} placeholder="Enter mobile number" required />
                                    <div className="input-field-error">
                                        {errors.tel && <p>{errors.tel}</p>}
                                    </div>
                                </div>
                                <div className="input-field">
                                    <label htmlFor='other_tel'>Other Mobile Number (Optional)</label>
                                    <input type="text" id='other_tel' name='other_tel' onChange={handleChange} value={formData.other_tel} placeholder="Enter other number" />

                                </div>
                                <div className="input-field">
                                    <label htmlFor='expertise'>Occupation</label>


                                    <select name='occupation' required>
                                        <option onChange={handleChange} value={formData.expertise} disabled selected>Select Occupation</option>
                                        <option value="Cleaning">Cleaning</option>
                                        <option value="Washing">Washing</option>
                                        <option value="Washing">Reading</option>
                                        <option value="Plumber">Plumber</option>
                                        <option value="Carpenter">Carpenter</option>
                                        <option value="Reading">Reading</option>
                                        <option value="Welder">Welder</option>
                                        <option value="Shoe-maker">Shoe-maker</option>
                                        <option value="Tailor">Tailor</option>
                                        <option value="Tv Repairer">Tv Repairer</option>
                                        <option value="Electrician">Electrician</option>
                                    </select>
                                    <div className="input-field-error">
                                        {errors.expertise && <p>{errors.expertise}</p>}
                                    </div>
                                </div>

                                <div className="input-field">
                                    <label>Working Days</label>
                                    <div className='input-field-select-container'>
                                        <select name='work_days_from' required>
                                            <option disabled selected>Start From</option>
                                            <option value="monday">Monday</option>
                                            <option value="tuesday">Tuesday</option>
                                            <option value="wednesday">Wednesday</option>
                                            <option value="thursday">Thursday</option>
                                            <option value="friday">Friday</option>
                                            <option value="saturday">Saturday</option>
                                            <option value="sunday">Sunday</option>
                                        </select>
                                        <select name='work_days_end' required>
                                            <option disabled selected>To</option>
                                            <option value="monday">Monday</option>
                                            <option value="tuesday">Tuesday</option>
                                            <option value="wednesday">Wednesday</option>
                                            <option value="thursday">Thursday</option>
                                            <option value="friday">Friday</option>
                                            <option value="saturday">Saturday</option>
                                            <option value="sunday">Sunday</option>
                                        </select>
                                    </div>
                                    <div className="input-field-error">
                                        {errors.work_days_from && <p>{errors.work_days_from}</p>}  {errors.work_days_end && <p>{errors.work_days_end}</p>}
                                    </div>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="location">Location</label>
                                    <input list="locations" name="location" id="location" onChange={handleChange} value={formData.location} placeholder='Enter Location' required />

                                    <datalist id="locations">
                                        <option value="Edge" />
                                        <option value="Firefox" />
                                        <option value="Chrome" />
                                        <option value="Opera" />
                                        <option value="Safari" />
                                    </datalist>
                                    <div className="input-field-error">
                                        {errors.location && <p>{errors.location}</p>}
                                    </div>
                                </div>
                                <button type="submit">
                                    <span class="btnText">Register as Artisan</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>


        </div>

    )

}

export default CreateArtisanForm