
const { connectToDB, closeDB } = require('../../config/mongodbconfig');
const logger = require('../../logger');
let db;
const fetchActiveArtisans = async (req, res, next) => {

	try {
		//query
		db = await connectToDB();

		const collection = db.collection('artisans');

		//fetching user password,empty
		const artisans = await collection.find({ status: 1 }).toArray();
		res.json({ total: artisans.length });


	}
	catch (error) {
		res.status(501).json({ statusCode: 501 });
		logger.log('error', '[' + Date() + ']can not fetch all artisans...' + error);
	}
}


const fetchInActiveArtisans = async (req, res, next) => {
	try {
		//query
		db = await connectToDB();

		const collection = db.collection('artisans');

		//fetching user password,empty
		const artisans = await collection.find({ status: 0 }).toArray();
		res.json({ total: artisans.length });


	}
	catch (error) {
		res.status(501).json({ statusCode: 501 });
		logger.log('error', '[' + Date() + ']can not fetch all artisans...' + error);
	}
}


const fetchVerfiedArtisans = async (req, res, next) => {
	try {
		//query
		db = await connectToDB();

		const collection = db.collection('artisans');

		//fetching user password,empty
		const artisans = await collection.find({ verified: 1 }).toArray();
		res.json({ total: artisans.length });


	}
	catch (error) {
		res.status(501).json({ statusCode: 501 });
		logger.log('error', '[' + Date() + ']can not fetch all verified artisans...' + error);
	}
}

module.exports = {
	fetchActiveArtisans: fetchActiveArtisans,
	fetchInActiveArtisans: fetchInActiveArtisans,
	fetchVerfiedArtisans: fetchVerfiedArtisans,
};