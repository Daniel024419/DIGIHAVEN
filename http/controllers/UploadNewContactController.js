let db;
const logger = require('../../logger');
const { connectToDB, closeDB } = require('../../config/mongodbconfig');

// Create a new Date object
var currentDate = new Date();

// Get the day, month, and year
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();

// Create a formatted string
var formattedDate = day + '/' + month + '/' + year;

const Contact = async (req, res, next) => {

    try {

        db = await connectToDB();
        const collection = db.collection('contacts');
        //results
        const results = await collection.find().toArray();
        if (results) {
            res.json(results);
        } else {
            res.status(200).json({ message: "Contact not created successfully.. ", statusCode: 501 });
        }


    } catch (error) {
        logger.log('error', '[' + Date() + '] can not fetch contact / Internal error' + error)

    }

}

const AddContact = async (req, res, next) => {
    try {


        console.log("contact")
        db = await connectToDB();
        const collection = db.collection('contacts');
        const {
            lname,
            fname,
            tel,
            usermail,
        } = req.body.formData;


        const newContact = {
            contactId: Date(),
            fname: fname,
            lname: lname,
            usermail: usermail,
            tel: tel,
            created_at:formattedDate,
        };
        //results
        const results = await collection.insertOne(newContact);
        if (results) {
            res.status(200).json({ message: "Contact created successfully.. ", statusCode: 200 });
        } else {
            res.status(200).json({ message: "Contact not created successfully.. ", statusCode: 501 });
        }

    } catch (error) {
        logger.log('error', '[' + Date() + '] can not add contact / Internal error' + error)
        console.log(error)
    }
}


module.exports = {

    Contact: Contact,
    AddContact: AddContact
};
