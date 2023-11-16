import { useState } from "react";
import "../../../css/booking.css";
import BuyerBookingController from "../../../controllers/BuyerBookingController";

import Usersession from "../../dashboard/session/Usersession";
import { buyer } from "../../dashboard/session/userType";

import myImage from "../../../uploads/booking.jpg";

const BookingForm = () => {
  //checkuser type
  //   buyer();

  //initiate  to check user session
  Usersession();

  let serviceId = localStorage.getItem("serviceId-book");
  let artisanId = localStorage.getItem("artisanId-book");

  let buyerId = localStorage.getItem("buyerId");
  let usermail = localStorage.getItem("usermail");

  const [formData, setformData] = useState({
    bookingId: Math.random().toString(36).substr(2, 50),
    artisanId: artisanId,
    serviceId: serviceId,
    buyerId: buyerId,
    location: "",
    schedule_time: "",
    tel: "",
    schedule_date: "",
    created_by: usermail,
  });

  //handle form data
  const handleChange = (event) => {
    setformData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    BuyerBookingController(formData);
  };
  return (
    <div className="booking-form-container">
      <h2 className="booking-form-heading">Booking Form</h2>
      <div className="booking-form">
        <div className="booking-form-image">
          <img src={myImage} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="booking-form-fields">
            <div class="input-field">
              <label>Date</label>
              <input
                type="date"
                id="date"
                name="schedule_date"
                placeholder="Select Date"
                onChange={handleChange}
              />
              <div className="input-field-error"></div>
            </div>
            <div class="input-field">
              <label>Time</label>
              <input
                type="time"
                id="time"
                name="schedule_time"
                placeholder="Select time"
                onChange={handleChange}
              />
              <div className="input-field-error"></div>
            </div>
            <div class="input-field">
              <label>Location</label>
              <input
                type="text"
                placeholder="location"
                name="location"
                id="charge"
                onChange={handleChange}
              />
              <div className="input-field-error"></div>
            </div>

            <div class="input-field">
              <label>Telephone</label>
              <input
                type="tel"
                placeholder="Telephone"
                name="tel"
                id="tel"
                onChange={handleChange}
              />
              <div className="input-field-error"></div>
            </div>

            <button type="submit" onClick={handleSubmit}>
              <span class="btnText">Book</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
