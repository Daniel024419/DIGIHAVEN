 import { Link} from 'react-router-dom';
 import { useEffect ,useState} from 'react'
import SupportController from "../../../controllers/SupportController";

const Footer = () => {

  useEffect(() => {
    const supportLink = document.getElementById("supportLink");
    const supportModal = document.getElementById("supportModal");
    const closeModal = document.getElementById("closeModal");

    function showSupportModal() {
      supportModal.style.display = "block";
     }

    function closeSupportModal() {
      supportModal.style.display = "none";
     }

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        closeSupportModal();
      }
    }

    supportLink.addEventListener("click", showSupportModal);
    closeModal.addEventListener("click", closeSupportModal);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      supportLink.removeEventListener("click", showSupportModal);
      closeModal.removeEventListener("click", closeSupportModal);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);


  const created_by = localStorage.getItem("username");

  const [formData, setformData] = useState({
    supportID:Math.random().toString(36).substr(2 ,50),
    message: "",
    usermail: "",
    created_by: created_by,
    created_at: Date(),

  });
  //handles

  const handleChange = (event) => {
    setformData({ ...formData, [event.target.name]: event.target.value });
  };
 //handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
      SupportController(formData);
     
  };


	return (
		<>
			
	<div className="supportModal" onSubmit={handleSubmit} id="supportModal">
    <div className="modal-content">
      <span className="close" id="closeModal" title="Close modal" >&times;</span>
      <h2>Support Form</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="usermail" value={formData.usermail} onChange={handleChange} name="usermail" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" value={formData.messages} name="message" onChange={handleChange} rows="5" required></textarea>
        </div>
        <div className="form-group">
          <button type="submit"  onClick={handleSubmit} >Submit</button>
        </div>
      </form>
    </div>
  </div>

  
 <div className="settings-icon">


    <i className="uil uil-cog" id="settingsIcon"></i>

    <div className="action-menu" id="actionMenu">
      <ul>
        {/*<li><Link href="#">Settings</Link></li>
        <li><Link href="#">Profile</Link></li>
        <li><Link href="#">Logout</Link></li>*/}
        <li><Link href="#" id="supportLink" >Support</Link></li>
      </ul>
    </div>
  </div>
		</>
	)
}


export default Footer