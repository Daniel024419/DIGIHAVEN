const { connectToDB, closeDB } = require('../../config/mongodbconfig');
const logger = require('../../logger');
let db;

const Services = async (req, res, next) => {

    try {
        //query
        db = await connectToDB();

        const collection = db.collection('services');

        const bookings = await collection.find().toArray();
        res.json(bookings);

    }
    catch (error) {
        res.status(501).json({ statusCode: 501 });
        logger.log('error', '[' + Date() + ']can not fetch all bookings for platform...' + error);
    }

}


// bookingsCategory
const bookingsCategory = async (req, res, next) => {

    try {
        //query
        // db = await connectToDB();

        // const collection = db.collection('bookings');

        // const bookings = await collection.find().toArray();
       
        // res.json(bookings);

        db = await connectToDB();

        const collection = db.collection('bookings');

        const bookings = await collection.find().toArray();

        const types = bookings.map(service => service.type);

        res.json(types);


    }
    catch (error) {
        res.status(501).json({ statusCode: 501 });
        logger.log('error', '[' + Date() + '] can not fetch all bookings for platform...' + error);
    }

}

// const bookingsCat= async (req, res, next) => {
//     try {
//         db = await connectToDB();

//         const collection = db.collection('bookings');

//         const bookings = await collection.find({type}).toArray();
//     } catch (error) {
        
//     }
// }




const bookingsCompleted = async (req, res, next) => {

    const artisanId = req.params.artisanId;

    try {
        //query
        db = await connectToDB();

        const collection = db.collection('bookings');

        const bookings = await collection.find({ artisanId: artisanId, completed: 1 }).toArray();
        res.json(bookings);
    }
    catch (error) {
        res.status(501).json({ statusCode: 501 });
        logger.log('error', '[' + Date() + ']can not fetch all bookings for platform...' + error);
    }

}

const bookingsCancelled = async (req, res, next) => {

    const artisanId = req.params.artisanId;

    try {
        //query
        db = await connectToDB();

        const collection = db.collection('bookings');

        const bookings = await collection.find({ artisanId: artisanId, completed: 2 }).toArray();
        res.json(bookings);

    }
    catch (error) {
        res.status(501).json({ statusCode: 501 });
        logger.log('error', '[' + Date() + ']can not fetch all bookings for platform...' + error);
    }
}


const bookingsPending = async (req, res, next) => {
    const artisanId = req.params.artisanId;


    try {
        //query
        db = await connectToDB();

        const collection = db.collection('bookings');

        const bookings = await collection.find({ artisanId: artisanId, completed: 0 }).toArray();
        res.json(bookings);


    }
    catch (error) {
        res.status(501).json({ statusCode: 501 });
        logger.log('error', '[' + Date() + ']can not fetch all bookings for platform...' + error);
    }

}




//buyer
const bookingsCompletedBuyer = async (req, res, next) => {


    const buyerId = req.params.buyerId;

    try {
        //query
        db = await connectToDB();

        const collection = db.collection('bookings');

        const bookings = await collection.find({ buyerId: buyerId, completed: 1 }).toArray();
        res.json(bookings);

    }
    catch (error) {
        res.status(501).json({ statusCode: 501 });
        logger.log('error', '[' + Date() + ']can not fetch all bookings for platform...' + error);
    }

}

const bookingsCancelledBuyer = async (req, res, next) => {

    const buyerId = req.params.buyerId;


    try {
        //query
        db = await connectToDB();

        const collection = db.collection('bookings');

        const bookings = await collection.find({ buyerId: buyerId, completed: 2 }).toArray();
        res.json(bookings);

    }
    catch (error) {
        res.status(501).json({ statusCode: 501 });
        logger.log('error', '[' + Date() + ']can not fetch all bookings for platform...' + error);
    }
}


const bookingsPendingBuyer = async (req, res, next) => {
    const buyerId = req.params.buyerId;


    try {
        //query
        db = await connectToDB();

        const collection = db.collection('bookings');

        const bookings = await collection.find({ buyerId: buyerId, completed: 0 }).toArray();
        res.json(bookings);

    }
    catch (error) {
        res.status(501).json({ statusCode: 501 });
        logger.log('error', '[' + Date() + ']can not fetch all bookings for platform...' + error);
    }

}

const DashboardBookingAll = async (req, res, next) => {

const buyerId = req.params.buyerId;


    const artisanId = req.params.artisanId;

    try {
        //query
        db = await connectToDB();

        const collection = db.collection('bookings');

        const bookings = await collection.find({ artisanId: artisanId}).toArray();
        res.json(bookings);

    }
    catch (error) {
        res.status(501).json({ statusCode: 501 });
        logger.log('error', '[' + Date() + 'can not fetch all bookings for platform...' + error);
    }

}


module.exports = {
    Services: Services,
    bookingsCategory:bookingsCategory,
    bookingsCompleted: bookingsCompleted,
    bookingsCancelled: bookingsCancelled,
    bookingsPending: bookingsPending,


    bookingsCancelledBuyer: bookingsCancelledBuyer,
    bookingsPendingBuyer: bookingsPendingBuyer,
    bookingsCompletedBuyer: bookingsCompletedBuyer,
    DashboardBookingAll:DashboardBookingAll,




};
