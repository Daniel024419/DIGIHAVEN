import React from 'react'
import TopNavBar from './includes/topNavBar'
import PlatformFooter from "../platform/includes/platformFooter";
import BookingForm from './includes/BookingForm';

const Booking = () => {
  return (
    <div>
        <TopNavBar/>
            <BookingForm/>
        <PlatformFooter/>
    </div>
  )
}

export default Booking