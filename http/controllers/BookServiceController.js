const { connectToDB, closeDB } = require('../../config/mongodbconfig');
const logger = require('../../logger');
let db;
const axios = require('axios');

//node mailer
const mailHelper = require('../controllers/MailController');
var transporter = mailHelper.transporter;

var EMAIL_USERNAME = process.env.EMAIL_USERNAME;
var MNOTIFY_API_KEY = process.env.MNOTIFY_API_KEY;
var SENDER_ID = process.env.SENDER_ID;
var SERVER_NAME = process.env.SERVER_NAME;

// Create a new Date object
var currentDate = new Date();

// Get the day, month, and year
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();

// Create a formatted string
var formattedDate = day + '/' + month + '/' + year;
const randomString = Math.random().toString(36).substr(2, 50);

const BookedServices = async (req, res, next) => {
  try {
    db = await connectToDB();
    const collection = db.collection('bookings');
    //fetching user password,empty
    const bookings = await collection.find().toArray();
    res.json(bookings);

    if (bookings.length < 0) {

      res.status(200).json({ statusCode: 404 });

    }


  }

  catch (error) {
    if (error) {
      logger.log('error', "can not fetch bookings.. /  internal error", error);
      res.status(501).json({ message: "Internal error... " });
    }
  }


}

const AddbookServices = async (req, res, next) => {
  //bookings

  try {
    db = await connectToDB();
    const bookingCollection = db.collection('bookings');
    const artisaCollection = db.collection('artisans');
    const buyerCollection = db.collection('buyers');
    const servicesCollection = db.collection('services');


    const {
      buyerId,
      bookingId,
      artisanId,
      serviceId,
      location,
      schedule_time,
      tel,
      schedule_date,
      created_by,
    } = req.body.formData;

    // console.log(req.body.formData)
    //fetch artisans
    //fetch artisans
    const artisanData = await artisaCollection.find({ artisanId: artisanId }).toArray();
    //fetch buyers
    const buyerData = await buyerCollection.find({ buyerId: buyerId }).toArray();
    //fetch service
    const serviceData = await servicesCollection.find({ serviceId: serviceId }).toArray();




    const newBookingService = {

      bookingId: bookingId,
      buyerId: buyerId,
      artisanId: artisanId,
      serviceId: serviceId,
      type: serviceData.type,


      //buyer
      username: buyerData.username || 'USER',
      usermail: buyerData.usermail || 'user@gmail.com',

      //artisan
      artisanUsermail: artisanData.usermail,
      artisanTel: artisanData.tel,
      artisanUsername: artisanData.username,

      //buyer location , tel choosen
      location: location,
      tel: tel,
      schedule_time: schedule_time,
      schedule_date: schedule_date,

      charge: serviceData.charge,
      created_at: formattedDate,
      created_by: created_by,
      status: 0,
      action: 1,
      completed: 3,


    };



    //results
    const results = await bookingCollection.insertOne(newBookingService);
    if (results) {


      //send sms
      const message = 'Hello ' + created_by + ', Your home services booking was success. Details Schedule Time : ' + schedule_time + ' Schedule_date : ' + schedule_date + ' location :' + 'Location' + SERVER_NAME;
      // Construct the API URL
      const apiUrl = `https://apps.mnotify.net/smsapi?key=${MNOTIFY_API_KEY}
&to=${tel}&msg=${message}&sender_id=${SENDER_ID}`;
      // Send the SMS
      axios.get(apiUrl).then(response => {
        console.log('SMS sent successfully' + tel);
        console.log(response.data); // Optional: Log the API response
      }).catch(error => {
        logger.log('error', '[' + Date() + 'Failed to send unique code SMS:', error);
        console.log(error)
      });

      //mail
      async function sendEmailWithRefreshedToken() {
        try {
          //send token after verifying password
          const mailConfigurations = {
            // It should be a string of sender/server email
            from: EMAIL_USERNAME,
            //multiple mail
            to: "danielpmensah926@gmail.com",

            // Subject of Email
            subject: 'Booking Schedule',
            // This would be the text of email body
            //  + user +
            html: `<h1>Hi</h1><p>,${buyerData.username},And ${artisanData.username}</p> 
                      
                      <br>
                      <h1>Job schedule</h1>
                      <p>has been booked between the above persons</p>

                      <h1><b>Booking Information</b></h1>
                      <p><b>Schedule Time</b> : ${schedule_time}</p>
                      <p><b>Schedule Date</b> : ${schedule_date}</p>
                      <p><b>Service Location</b> : ${location}</p>
                      <p><b>Created_By</b> : ${created_by}</p>
                      <h1><b>Confirmation / Disclaimer</b></h1>
                      <p>Call this references from the artisans </p>
                      <p><b>Ref 1</b> : 0546000222 </p>
                      <p><b>Ref 2</b> : 0249000033 </p>
                      <p><b>Ref 3</b> : 0549001222 </p>


                       <br><br> <h1>${SERVER_NAME} CHEERS </h1>`,
            attachments: [

              {
                //filename and content type is derived from path
                path: `./assets/files/logo.png`
              }

            ]
          };
          transporter.sendMail(mailConfigurations, function (error, info) {

            if (error) {
              logger.log('error', '[' + Date() + 'no internet to send mail');
            }
            console.log('Email Sent Successfully');
          });
        } catch (error) {


          logger.log('error', '[' + Date() + 'An error occurred when sending mail:', error);
        }
      }
      // Initialize by sending an email
      sendEmailWithRefreshedToken();


      //send both SMS and Email
      res.status(200).json({ message: "Booking created successfully.. ", statusCode: 200 });



    } else {
      res.status(200).json({ message: "Booking not created successfully.. ", statusCode: 200 });
    }

  }

  catch (error) {
    if (error) {
      logger.log('error', "can not create booking.. /  internal error", error);
      res.status(501).json({ message: "Internal error... " });
      console.log(error);
    }
  }


}



const UpdateBookedServices = async (req, res, next) => {
  try {

    db = await connectToDB();
    const collection = db.collection('bookings');
    const {
      bookingId,
      location,
      schedule_time,
      tel,
      schedule_date: schedule_date,
    } = req.body.formData;



    const bookUpdateResult = await collection.updateOne(
      { bookingId: bookingId },
      {
        $set: {
          location: location,
          schedule_time: schedule_time,
          schedule_date: schedule_date,
          tel: tel,
          updated_at: formattedDate

        }
      }
    );

    if (bookUpdateResult.modifiedCount === 1) {


      const userData = await collection.findOne({ bookingId: bookingId });

      res.status(200).json({ message: "Booking updated successfully", userData, statusCode: 200 });

    } else {

      res.status(200).json({ message: "Update failed , Please try again ", statusCode: 501 });

    }

  }

  catch (error) {
    if (error) {
      logger.log('error', "can not update bookings.. /  internal error", error);
      res.status(501).json({ message: "Internal error... " });
    }
  }


}


const CancelBookedServices = async (req, res, next) => {

  const bookingId = req.params.bookingId;
  try {
    db = await connectToDB();
    const collection = db.collection('bookings');
    const bookUpdateResult = await collection.updateOne(
      { bookingId: bookingId },
      {
        $set: {

          action: 2,
          updated_at: formattedDate

        }
      }
    );

    if (bookUpdateResult.modifiedCount === 1) {


      const userData = await collection.findOne({ bookingId: bookingId });

      res.status(200).json({ message: "Booking updated successfully", userData, statusCode: 200 });

    } else {

      res.status(200).json({ message: "Update failed , Please try again ", statusCode: 501 });

    }


  }

  catch (error) {
    if (error) {
      logger.log('error', "can not update bookings.. /  internal error", error);
      res.status(501).json({ message: "Internal error... " });
    }
  }



}



const DeleteBookedServices = async (req, res, next) => {

  const bookingId = req.params.bookingId;
  try {
    db = await connectToDB();
    const collection = db.collection('bookings');

    const bookings = await collection.deleteOne({ bookingId: bookingId });

    if (bookings.deletedCount === 1) {

      res.status(200).json({ message: "Booking deleted successfully..", statusCode: 200 });


    } else {

      res.status(200).json({ message: "Failed deleting bookings..", statusCode: 501 });

    }

  }

  catch (error) {
    if (error) {
      logger.log('error', "can not delete bookings.. /  internal error", error);
      res.status(501).json({ message: "Internal error... " });
    }
  }



}





module.exports = {

  BookedServices: BookedServices,
  AddbookServices: AddbookServices,
  UpdateBookedServices: UpdateBookedServices,
  CancelBookedServices: CancelBookedServices,
  DeleteBookedServices: DeleteBookedServices,

};