
const { connectToDB, closeDB } = require('../../config/mongodbconfig');
let db;
const logger = require('../../logger');
  // Create a new Date object
  var currentDate = new Date();

  // Get the day, month, and year
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();

  // Create a formatted string
  var formattedDate = day + '/' + month + '/' + year;



const createServiceArtisan = async (req ,res , next)=>{
try{

    const {
        artisanId,
        serviceId,
        description,
        charge,
        tel,
        type,
        location,
        created_by,
        created_at,
      } = req.body.formData;
//Get the uploaded file name
    const fileName = req.file.originalname;
    db = await connectToDB();
    const collection = db.collection('services');

    const newService = {
        artisanId: artisanId,
        serviceId: serviceId,
        description: description,
        charge: charge,
        completed:0,
        profile: fileName,
        location: location,
        tel: tel,
        type: type,
        charge: charge,
        tel: tel,
        created_by: created_by,
        created_at: formattedDate,
        completed_at:"",
  
      };
      //results
      const results = await collection.insertOne(newService);
      if (results) {
        res.status(200).json({ message: "Service created successfully.. ", statusCode: 200 });
      

      } else {
        res.status(200).json({ message: "service not created successfully.. ", statusCode: 200 });
      }

}

catch (error) {
  if (error) {
    logger.log('error', "can not create artisan services /  internal error", error);
    res.status(501).json({ message: "internal error... "+error });
  
  }
}
    
}

const deleteServiceArtisan = async (req ,res , next)=>{

    const serviceId = req.params.serviceId;

    try {
      //query
      db = await connectToDB();
  
  
      const collection = db.collection('services');
  
      const service_del = await collection.deleteOne({ serviceId:serviceId });
  
      if (service_del.deletedCount === 1) {
  
        res.status(200).json({ message: "Service deleted successfully..", statusCode: 200 });
  
  
      } else {
  
        res.status(200).json({ message: "Failed deleting service..", statusCode: 501 });
  
      }
  
    }
    catch (error) {
      logger.log('error', '[' + Date() + '] can not delete service.. / internal eror', error);
    }
}

const updateServiceArtisan = async (req ,res , next)=>{

}

module.exports = {
    createServiceArtisan:createServiceArtisan,
    updateServiceArtisan:updateServiceArtisan,
    deleteServiceArtisan:deleteServiceArtisan

};

