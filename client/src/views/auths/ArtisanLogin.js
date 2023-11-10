import { authArtisanController } from '../../controllers/authUserController';

import '../../css/login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';


const ArtisanLogin = () => {


  // Function to clear the notification
  // Regular expression for email validation
  const [isLoading, setIsLoading] = useState(false);

  // Use useEffect to clear the message in localStorage on component load
  useEffect(() => {
    localStorage.removeItem('message');
  }, []);


  //manage user data state 
  const [formData, setformData] = useState({
    userName: '',
    password: '',
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
    if (formData.userName === '' || formData.password === '') {
      alert('all input are required ');
      return;
    }

    else {
      //set loading
      setIsLoading(true);

      // Simulate an API request 
      setTimeout(() => {
        setIsLoading(false);
      }, 7000);

      //send data to controller
      authArtisanController(formData);

    }

  }

  //redirect google login
  const handleLoginWithGoogle = () => {

    //dev
    //window.location.href = process.env.REACT_APP_API_URL_DEV + '/google/auth';

    //pro
    window.location.href = process.env.REACT_APP_API_URL_PRO + '/google/auth';

  };

  return (
    <div className="login-view">

      <div className="container-login">
        <div className="left">
          <img src="../../uploads/bg224.jpeg" alt="" />
        </div>
        <div className="right">
          <div className="login-form">
            <h2 className="login-title" >Artisans Login</h2>
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

              <div className="login-options" >

               {/* <button type="button" title="login" className="login-options-submit-btn button-60" onClick={handleLoginWithGoogle}>
                  <img src="../../uploads/search.png" className="login-google" alt="" />  Login with Google
                </button>*/}



              </div>

              <div className="createAc-container" >

                <Link to="/create-artisan"> Create account here</Link>

              </div>
               <div >
              <Link to="/forgot-password-artisan" > Forgot Password ? </Link> Or
              <Link to="/" > Go Home? </Link>
                 </div>

            </form>

           

          </div>
        </div>
      </div>


    </div>
  )
}

export default ArtisanLogin