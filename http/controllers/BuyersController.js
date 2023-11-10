
const { connectToDB, closeDB } = require('../../config/mongodbconfig');
const logger = require('../../logger');
const bcrypt = require('bcrypt');
let db;

const buyers = async (req, res, next) => {

  try {
    //query
    db = await connectToDB();

    const collection = db.collection('buyers');
    const buyersData = await collection.find().toArray();
    res.json(buyersData);


  }
  catch (error) {
    res.status(501).json({ statusCode: 501 });
    logger.log('error', '[' + Date() + ']can not fetch all buyers...' + error);
  }

}


const CreateBuyer = async (req, res, next) => {

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
    const collection = db.collection('buyers');

    const {
      buyerId,
      username,
      password,
      role,
      created_at,
      usermail,
      created_by,
      file,
      tel,
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
      buyerId: buyerId,
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
      logger.log('error', "can not create buyer account /  internal error", error);
      res.status(501).json({ message: "Internal error... " });
    
    }
  }


}



const DeleteBuyer = async (req , res , next )=>{

  const buyerId = req.params.buyerId;

  try {
    //query
    db = await connectToDB();


    const collection = db.collection('buyers');

    //fetching user password,empty
    const users_del = await collection.deleteOne({ buyerId: buyerId });
  
    if (users_del.deletedCount === 1) {

      res.status(200).json({ message: "Buyer deleted successfully..", statusCode: 200 });
 
    } else {

      res.status(200).json({ message: "Failed deleting buyer....", statusCode: 501 });
 
    }

  }
  catch (error) {
    logger.log('error', '[' + Date() + ']can not delete  Users...' + error);
    res.status(501).json({ message: "Failed to delete buyer....", statusCode: 501 });

  }

}

module.exports = {
  buyers: buyers,
  CreateBuyer: CreateBuyer,
  DeleteBuyer:DeleteBuyer,
};