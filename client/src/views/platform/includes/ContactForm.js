 import myImage from "../../../uploads/bg.jpeg"
import "../../../css/contactForm.css"
import { useState} from 'react'
import UploadNewContactController from '../../../controllers/UploadNewContactController'

import swal from 'sweetalert';
const ContactForm = () => {

 const [formData, setformData] = useState({
    usermail: '',
    fname: '',
    lname: '',
    message: '',
    phone: '',
  });


  const handleChange = async (event) => {
    // Update the state when user types in the input fields
    setformData({
      ...formData,
      [event.target.name]: event.target.value
    });

  }


  const handleSubmit = async (event) => {

    event.preventDefault();
    // Call the userAuthController and pass the user input
    if (formData.usermail === '' || formData.lname === ''
        || formData.fname === '' || formData.phone === ''
        || formData.message === '') {

    swal({
    title: "Form Data",
    text: "All input are required",
    icon: "warning",
    buttons: true,
    dangerMode: true,
    });
      //alert('all input are required ');
      return;
    }

    else {
      //send data to controller
      UploadNewContactController(formData);

    }

  }


  return (
    <div className='contact-form-container'>
        <div className='contact-form-left'>
      
            <img src={myImage}/>
            <div className='contact-form-social-icons'>
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-twitter"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-linkedin-in"></i>
            </div>
        </div>
        <div className='contact-form-right'>
            <h2 className='contact-form-title'>
                Get in touch
            </h2>

            <form className='contact-form' action="" onSubmit={handleSubmit}>
                <div className='contact-form-double-field'>
                    <input type='text' placeholder='First Name'
                    id="fname"
                    name="fname"
                     onChange={handleChange} className='contact-form-input'/>
                    <input type='text' placeholder='Last Name'
                    name="lname" id="lname" 
                    value={formData.lname}
                    onChange={handleChange} className='contact-form-input'/>
                </div>
                <div className='contact-form-single-field'>
                    <input type='text' placeholder='Email' 
                    id="usermail"
                    name="usermail"
                    value={formData.usermail}
                    onChange={handleChange} className='contact-form-input'/>
                </div>
                <div className='contact-form-single-field'>

                    <input type='text' placeholder='Phone'
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange} className='contact-form-input'/>
                </div>
                <div className='contact-form-single-field-full'>
                    <textarea placeholder='Message' 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange} className='contact-form-input contact-form-textarea'></textarea>
                </div>
                <div className='contact-form-single-field-button'>
                    <button className='contact-form-button'
                    type="submit" onClick={handleSubmit}>
                    Send Message

                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ContactForm