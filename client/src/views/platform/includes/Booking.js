import React from 'react'
import TopNavBar from '../includes/topNavBar'
import BookingForm from '../includes/BookingForm';
import PlatformFooter from '../includes/platformFooter';

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