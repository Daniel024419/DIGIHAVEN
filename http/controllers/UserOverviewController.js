
const { connectToDB, closeDB } = require('../../config/mongodbconfig');
const logger = require('../../logger');
let db;
const fetchActiveUsers = async (req, res, next) => {

	try {
		//query
		db = await connectToDB();

		const collection = db.collection('users');

		const users = await collection.find({ status: 1 }).toArray();
		res.json({ total: users.length });


	}
	catch (error) {
		res.status(501).json({ statusCode: 501 });
		logger.log('error', '[' + Date() + ']can not fetch all Users...' + error);
	}
}


const fetchInActiveUsers = async (req, res, next) => {
	try {
		//query
		db = await connectToDB();

		const collection = db.collection('users');

		//fetching user password,empty
		const users = await collection.find({ status: 0 }).toArray();
		res.json({ total: users.length });


	}
	catch (error) {
		res.status(501).json({ statusCode: 501 });
		logger.log('error', '[' + Date() + ']can not fetch all Users...' + error);
	}
}


module.exports = {
	fetchActiveUsers: fetchActiveUsers,
	fetchInActiveUsers: fetchInActiveUsers
};