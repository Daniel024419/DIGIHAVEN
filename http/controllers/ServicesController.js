const { connectToDB, closeDB } = require('../../config/mongodbconfig');
const logger = require('../../logger');
let db;

const DashboardServices = async (req, res, next) => {

    try {
        //query
        db = await connectToDB();

        const collection = db.collection('services');

        const services = await collection.find().toArray();
        res.json(services);



    }
    catch (error) {
        res.status(501).json({ statusCode: 501 });
        logger.log('error', '[' + Date() + ']can not fetch all services for dashboard...' + error);
    }

}




const DashboardServicesCompleted = async (req, res, next) => {


    try {
        //query
        db = await connectToDB();

        const collection = db.collection('services');

        const services = await collection.find({ completed: 1 }).toArray();
        res.json(services);
    }
    catch (error) {
        res.status(501).json({ statusCode: 501 });
        logger.log('error', '[' + Date() + ']can not fetch all services for platform...' + error);
    }

}

const DashboardServicesCancelled = async (req, res, next) => {



    try {
        //query
        db = await connectToDB();

        const collection = db.collection('services');

        const services = await collection.find({ completed: 2 }).toArray();
        res.json(services);

    }
    catch (error) {
        res.status(501).json({ statusCode: 501 });
        logger.log('error', '[' + Date() + 'can not fetch all services for platform...' + error);
    }
}


const DashboardServicesPending = async (req, res, next) => {



    try {
        //query
        db = await connectToDB();

        const collection = db.collection('services');

        const services = await collection.find({ completed: 0 }).toArray();
        res.json(services);


    }
    catch (error) {
        res.status(501).json({ statusCode: 501 });
        logger.log('error', '[' + Date() + 'can not fetch all services for platform...' + error);
    }

}




module.exports = {
    DashboardServices: DashboardServices,
    DashboardServicesCompleted: DashboardServicesCompleted,
    DashboardServicesCancelled: DashboardServicesCancelled,
    DashboardServicesPending: DashboardServicesPending,





};
