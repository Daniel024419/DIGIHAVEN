//file system
const fs = require("fs");
const { connectToDB, closeDB } = require('../../config/mongodbconfig');
//path
const path = require("path");
let db;
const bcrypt = require('bcrypt');

const logger = require('../../logger');
//node mailer
const mailHelper = require('../controllers/MailController');
var transporter = mailHelper.transporter;
var SERVER_NAME = process.env.SERVER_NAME;
var EMAIL_USERNAME = process.env.EMAIL_USERNAME;

const artisans = async (req, res, next) => {

  try {


    //query
    db = await connectToDB();

    const collection = db.collection('artisans');

    const artisans = await collection.find({}).toArray();
    

    if (artisans.length === 0) {

      res.status(200).json({ statusCode: 404 });

    }

    return res.json(artisans);


  }
  catch (error) {
    logger.log('error', '[' + Date() + '] can not fetch artisans.. / internal eror', error);
  }


}


const deleteArtisan = async (req, res, next) => {

  const artisanId = req.params.artisanId;

  try {
    //query
    db = await connectToDB();


    const collection = db.collection('artisans');

    const artisan_del = await collection.deleteOne({ artisanId: artisanId });

    if (artisan_del.deletedCount === 1) {

      res.status(200).json({ message: "Artisan deleted successfully..", statusCode: 200 });


    } else {

      res.status(200).json({ message: "Failed deleting artisan..", statusCode: 501 });

    }

  }
  catch (error) {
    logger.log('error', '[' + Date() + '] can not delete artisan.. / internal eror', error);
  }
}





const VerifyArtisans = async (req, res, next) => {
  // Create a new Date object
  var currentDate = new Date();

  // Get the day, month, and year
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();

  // Create a formatted string
  var formattedDate = day + '/' + month + '/' + year;
  try {


    const artisanId = req.params.artisanId;
    const action = req.params.action;
    let HtmlMsg = ``;
    //query
    db = await connectToDB();


    const collection = db.collection('artisans');

    const userUpdateResult = await collection.updateOne(
      //find user with id
      { artisanId: artisanId },
      {
        $set: {

          verified: action,
          updated_at: formattedDate,

        }
      }
    );


    if (userUpdateResult.modifiedCount === 1) {

      const userData = await collection.find({ artisanId: artisanId }).toArray();


      if (action == 1) {

        res.status(200).json({ message: "Artisan verified successfully", statusCode: 200 });



        HtmlMsg = `<h1>Hi</h1><p>,${userData.usermail},</p> 
                      Support Message : Your artisan account verified successfully  <br>
                      <p> Cheers</p>
                       <br> <h1>${SERVER_NAME} <h1>`
      } else {

        res.status(200).json({ message: "Artisan rejected successfully", statusCode: 200 });
        HtmlMsg = `<h1>Hi</h1><p>,${userData.usermail},</p> 
                      Support Message : Your artisan account was rejected  <br>
                      <p> Hmmm..</p>
                       <br> <h1>${SERVER_NAME} <h1>`
      }

      // Function to send an email
      async function sendEmailWithRefreshedToken() {
        try {
          //send token after verifying password
          const mailConfigurations = {
            // It should be a string of sender/server email
            from: EMAIL_USERNAME,
            to: userData.usermail,
            // Subject of Email
            subject: 'Account Notifcation',

            html: HtmlMsg
          };
          transporter.sendMail(mailConfigurations, function (error, info) {

            if (error) {
              logger.log('error', '[' + Date() + 'no internet to send mail');
            }
          });
        } catch (error) {
          logger.log('error', '[' + Date() + 'An error occurred when sending mail:', error);
        }
      }
      // Initialize by sending an email
      sendEmailWithRefreshedToken();



    } else {

      res.status(200).json({ message: "Verification failed , Please try again ", statusCode: 501 });
      logger.log('error', '[' + Date() + '] artisan Verification update failed..');

    }


  }


  catch (error) {
    res.status(501).json({ message: "Verification failed , Please try again ", statusCode: 501 });
    logger.log('error', '[' + Date() + '] can not delete artisan.. / internal eror', error);

  }

}


const CreateArtisan = async (req, res, next) => {
  // Create a new Date object
  var currentDate = new Date();

  // Get the day, month, and year
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();

  // Create a formatted string
  var formattedDate = day + '/' + month + '/' + year;

  try {

    db = await connectToDB();
    const collection = db.collection('artisans');

    const {
      username,
      password,
      role,
      created_at,
      usermail,
      created_by,
      work_days_from,
      work__days_end,
      other_tel,
      tel,occupation,
    } = req.body.formData;
 //Get the uploaded file name
 const fileName = req.file.originalname;

    // Function to hash the password
    const hashPassword = async (password) => {
      const saltRounds = 10; // The number of salt rounds
      return bcrypt.hash(password, saltRounds);
    }
    const hashedPassword = await hashPassword(password);

    const newUser = {
      artisanId: Math.random().toString(36).substr(2, 50),
      username: username,
      password: hashedPassword,
      profile: fileName,
      usermail: usermail,
      role: role,
      tel: tel,
      created_at: created_at,
      created_by: created_by,
      last_visit: formattedDate,
      updated_at: formattedDate,
      work_days_from:work_days_from,
      work__days_end:work__days_end,
      other_tel:other_tel,
      occupation:occupation,
      status: 0,

    };


    //results
    const results = await collection.insertOne(newUser);
    if (results) {
      res.status(200).json({ message: "Account created successfully.. ", statusCode: 200 });
    } else {
      res.status(200).json({ message: "Account not created successfully.. ", statusCode: 200 });
    }

  }

  catch (error) {
    if (error) {
      logger.log('error', "can not create artisan account /  internal error", error);
      res.status(501).json({ message: "internal error... " + error, statusCode: 501 });
     console.log(error)
    }
  }


}



const fetchArtisansId = async (req, res, next) => {


    const artisanId = req.params.artisanId;
  try {


    //query
    db = await connectToDB();

    const collection = db.collection('artisans');

    const artisans = await collection.find({artisanId:artisanId}).toArray();
    

    if (artisans.length === 0) {

      res.status(200).json({ statusCode: 404 });

    }

    return res.json(artisans);


  }
  catch (error) {
    logger.log('error', '[' + Date() + '] can not fetch artisans.. / internal eror', error);
  }


}


module.exports = {

  artisans: artisans,
  VerifyArtisans: VerifyArtisans,
  deleteArtisan: deleteArtisan,
  CreateArtisan: CreateArtisan,
  fetchArtisansId:fetchArtisansId
 
};