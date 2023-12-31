const fs = require("fs");
const { connectToDB, closeDB } = require('../../config/mongodbconfig');
//path
const path = require("path");
let db;
const logger = require('../../logger');

const Users = async (req, res, next) => {


  try {
    //query
    db = await connectToDB();

    const collection = db.collection('users');

    //fetching user password,empty
    const users = await collection.find().toArray();
    res.json(users);

    if (users.length < 0) {

      res.status(200).json({ statusCode: 404 });

    }



  }
  catch (error) {
    res.status(501).json({ statusCode: 501 });

    logger.log('error', '[' + Date() + ']can not fetch all Users...' + error);
  }




}

//end

const deleteUsers = async (req, res, next) => {


  const userID = req.params.userID;

  //console.log(userID);


  try {
    //query
    db = await connectToDB();


    const collection = db.collection('users');

    //fetching user password,empty
    const users_del = await collection.deleteOne({ userID: userID });

    if (users_del.deletedCount === 1) {

      ////console.log("user deleted..")
      //console.log(userID)
      res.status(200).json({ message: "User deleted successfully..", statusCode: 200 });


    } else {

      res.status(200).json({ message: "Failed deleting user....", statusCode: 501 });

    }

  }
  catch (error) {
    logger.log('error', '[' + Date() + ']can not delete  Users...' + error);
    res.status(501).json({ message: "Failed to delete user....", statusCode: 501 });

  }


}


const EditUsersDetails = async (req, res, next) => {

  //update user datails here

  try {

    const {
      userID,
      username,
      password,
      role,
      created_at,
      usermail,
      tel
    } = req.body.formData;

    // Create a new Date object
    var currentDate = new Date();

    // Get the day, month, and year
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    // Create a formatted string
    var formattedDate = day + '/' + month + '/' + year;

    //query
    db = await connectToDB();
    //conncet to table
    let Userdata;

    const collection = db.collection('users');
    let hashedPassword = '';


    //fetching user password,empty
    const userDataPassword = await collection.findOne({
      $or: [
        { username: username },
        { usermail: usermail },
      ],
    });


    if (password == '') {

      hashedPassword = userDataPassword.password;

    } else {
      // Function to hash the password
      const hashPassword = async (password) => {
        const saltRounds = 10; // The number of salt rounds
        return bcrypt.hash(password, saltRounds);
      }

      hashedPassword = await hashPassword(password);

    }

    const userUpdateResult = await collection.updateOne(
      //find user with id
      { userID: userID },
      //update user profile with the new file name...
      {
        $set: {

          username: username,
          tel: tel,
          password: hashedPassword,
          usermail: usermail,
          updated_at: formattedDate

        }
      }
    );


    if (userUpdateResult.modifiedCount === 1) {
      // Handle the uploaded file here, save it, or perform any required processing


      const userData = await collection.findOne({
        $or: [
          { username: username },
          { usermail: usermail },
        ],
      });

      //console.log(userData)


      res.status(200).json({ message: "User updated successfully", userData, statusCode: 200 });
      // console.log("update successfull.."+username + "pass : "+password);

    } else {

      res.status(200).json({ message: "Update failed , Please try again ", statusCode: 501 });

    }

  }

  catch (error) {
    logger.log('error', '[' + Date() + '] can not update user profile' + error);
    res.status(200).json({ message: "Update failed , Please try again ", statusCode: 501 });
  }



}

module.exports = {

  Users: Users,

  deleteUsers: deleteUsers,

  EditUsersDetails: EditUsersDetails,

};