//includes
import Topnav from "../dashboard/includes/TopNav";
import Footer from "../dashboard/includes/Footer";
// importing components

import SideBar from "../dashboard/includes/SideBar";

import AddNewUserPageFormPartial from "../dashboard/AddNewUserPageFormPartial";
import "../../css/profile.css";
import { useState } from "react";
//importing session
import Usersession from "../dashboard/session/Usersession";

//home function
const AddNewUserPage = () => {
  //initiate  to check user session
  Usersession();

  //
  const username_new_user = localStorage.getItem("username_new_user");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (file) => {
    // const file = e.target.files[0];
    // const file_name = e.target.files[0].name;
    if (file !== null) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);

      // If you want to upload the image to the server, call handleUpload
      //UploadUserProfileController(file);
    }
  };



  return (
    <div className="dashboard-body">
      <SideBar />

      <section className="dashboard">
        <Topnav />

        <div className="dash-content">
          <div className="profile-container">
            <span className="title-top">
              <i className="fas fa-tachometer"></i> Dashbaord {'>'}
              <i className="fas fa-user-plus"></i> Add New User
            </span>

            <div className="container-left">
              <h1 style={{ textTransform: "upperCase" }}>
                {username_new_user}
              </h1>

              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="userprofil-edit"
                />
              ) : (
                <img
                  src={"../../uploads/user.png"}

                  alt="default gif"
                  className="userprofil-edit"
                />
              )}

            </div>

            <div className="container-right">
              <AddNewUserPageFormPartial onFileChange={handleFileChange} />
            </div>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
};

export default AddNewUserPage;
