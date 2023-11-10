
const { connectToDB, closeDB } = require('../../config/mongodbconfig');
const logger = require('../../logger');
let db;
const fetchActiveBuyers = async (req, res, next) => {

	try {
		//query
		db = await connectToDB();

		const collection = db.collection('buyers');

		//fetching user password,empty
		const Buyers = await collection.find({ status: 1 }).toArray();

        console.log(Buyers)
		res.json({ total: Buyers.length });



	}
	catch (error) {
		res.status(501).json({ statusCode: 501 });
		logger.log('error', '[' + Date() + ']can not fetch all Buyers...' + error);
	}
}


const fetchInActiveBuyers = async (req, res, next) => {
	try {
		//query
		db = await connectToDB();

		const collection = db.collection('buyers');

		//fetching user password,empty
		const Buyers = await collection.find({ status: 0 }).toArray();
		res.json({ total: Buyers.length });
	}
	catch (error) {
		res.status(501).json({ statusCode: 501 });
		logger.log('error', '[' + Date() + ']can not fetch all Buyers...' + error);
	}
}


const fetchVerfiedBuyers = async (req, res, next) => {
	try {
		//query
		db = await connectToDB();

		const collection = db.collection('buyers');

		//fetching user password,empty
		const Buyers = await collection.find({ verified: 1 }).toArray();
		res.json({ total: Buyers.length });

	}
	catch (error) {
		res.status(501).json({ statusCode: 501 });
		logger.log('error', '[' + Date() + ']can not fetch all verified Buyers...' + error);
	}
}

module.exports = {
	fetchActiveBuyers: fetchActiveBuyers,
	fetchInActiveBuyers: fetchInActiveBuyers,
	fetchVerfiedBuyers: fetchVerfiedBuyers,
};