const { connectToDB, closeDB } = require('../../config/mongodbconfig');
const logger = require('../../logger');
let db;

const addContact = async ( req, res ,next)=>{
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
    const collection = db.collection('contacts');

    const {
      
      usermail,
      lname,
      fname,
      created_at,
      phone,
      message,
    } = req.body.formData;

    

const newContact ={
	contactId: Date.now() ,
	usermail: usermail,
    fname: fname,
    lname: lname,
    message: message,
    phone: phone,
    created_at:formattedDate,
}

    //results
    const results = await collection.insertOne(newContact);
    if (results) {
      res.status(200).json({ message: "Contact created successfully.. ", statusCode: 200 });
    } else {
      res.status(200).json({ message: "Contact not created successfully.. ", statusCode: 501 });
    }


}
catch(error){
if (error) {
      logger.log('error', "can not create contact /  internal error", error);
      res.status(501).json({ message: "Internal error... " });
   }

   console.log(error)
}
}


module.exports = {

	addContact:addContact,

};