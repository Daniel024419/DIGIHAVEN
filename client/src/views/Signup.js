import {  Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import  UploadNewUserController   from '../controllers/UploadNewUserController';

import { useEffect, useState} from 'react'


const Signup = () => {


  let message = localStorage.getItem('message');
  let isAuthenticated =localStorage.getItem('isAuthenticated');

  // Function to clear the notification
  // Regular expression for email validation
  const [isLoading, setIsLoading] = useState(false);

// Use useEffect to clear the message in localStorage on component load
  useEffect(() => {
    localStorage.removeItem('message');
  }, []);

//manage user data state 
	const [formData, setformData] = useState({
		userName : '',
		password : '',
	 });


const handleChange = async ( event )=>{
     // Update the state when user types in the input fields
     setformData({...formData ,
      [event.target.name] : event.target.value
     });
   
	}

const handleSubmit = async ( event )=>{

	event.preventDefault();
        // Call the userAuthController and pass the user input
    if (formData.userName === '' || formData.password === '') {
      alert('all input are required ');
      return;
    }

    else{
    //set loading
    setIsLoading(true);

    // Simulate an API request (replace this with your actual login logic)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    UploadNewUserController(formData);

    }

	}
 

	return (
		<div className="login-view">

		<div className="container">
        <div className="left"></div>
        <div className="right">
            <div className="login-form">
                <h2 className="login-title" >Sign Up</h2>
                <form id="login-form" action="" onSubmit={handleSubmit}  >
                    <div className="form-group">
                        <label for="email"  >Username</label>
                        <input type="text" id="email" 
                         name="userName" 
                         onChange={handleChange}
                         placeholder="Enter username or mail" 
                         className="userName" />
                    </div>
                    <div className="form-group">
                        <label for="email"  >Username</label>
                        <input type="text" id="email" 
                         name="userName" 
                         onChange={handleChange}
                         placeholder="Enter username or mail" 
                         className="userName" />
                    </div>
                    <div className="form-group">
                        <label for="email"  >Username</label>
                        <input type="text" id="email" 
                         name="userName" 
                         onChange={handleChange}
                         placeholder="Enter username or mail" 
                         className="userName" />
                    </div>
                    <div className="form-group">
                        <label for="email"  >Username</label>
                        <input type="text" id="email" 
                         name="userName" 
                         onChange={handleChange}
                         placeholder="Enter username or mail" 
                         className="userName" />
                    </div>

                    <div className="form-group">
                        <label for="password">Password:</label>


                        <div className="show-password">
                            <input type="password" 
                            id="password"
                             name="password" 
                             onChange={handleChange}
                             className="password"
                             placeholder="*****************"
                             /> 
                        </div>
                    </div>

<button type="submit" title="login" className="submit-btn" onClick={handleSubmit}>
       {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Login'}
 </button>


 <div  className="createAc-container" >

<Link to="/login"> Login here</Link>

 </div>

        </form>

      {!message == "" && (
        <div className="login-alert">
          {message}   
        </div>
      )}
        </div>
        </div>
    </div>


		</div>



	)
}

export default Signup