
const { connectToDB, closeDB } = require('../../config/mongodbconfig');
const logger = require('../../logger');
let db;

const feedbacks = async (req, res, next) => {

	try {
		//query
		db = await connectToDB();

		const collection = db.collection('feedbacks');

		const feedbacksData = await collection.find().toArray();
		res.json(feedbacksData);
	}
	catch (error) {
		res.status(501).json({ statusCode: 501 });
		logger.log('error', '[' + Date() + ']can not fetch all feedbacks...' + error);
	}

}


const Addfeedbacks = async (req, res, next) => {

	try {
		//query
		db = await connectToDB();

		const {
			message,
			
		  } = req.body.formData;

		  const collection = db.collection('feedbacks');


		  const newFeedback = {
			message: message,
		
	  
		  };

		    //results
			const feedbacksData = await collection.insertOne(newFeedback);
			if (feedbacksData) {
			  res.status(200).json({ message: "Feedback created successfully.. ", statusCode: 200 });
			} else {
			  res.status(200).json({ message: "Feedback not created successfully.. ", statusCode: 501 });
			}
		
		
	}
	catch (error) {
		res.status(501).json({ statusCode: 501 });
		logger.log('error', '[' + Date() + ']can not createe feedbacks...' + error);
		console.log(error)
	}

}



module.exports = {

	feedbacks: feedbacks,
	Addfeedbacks:Addfeedbacks,
};