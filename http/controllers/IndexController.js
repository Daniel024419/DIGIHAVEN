//essentials
const logger = require('../../logger');
//path
const path = require("path");

const index = async (req, res, next) => {

  try {

    res.sendFile(path.join(__dirname, '../../build', 'index.html'));

  } catch (error) {

    logger.log('error', '[' + Date() + '] can not serve static files...' + error);


  }

};


module.exports = {
  index: index,
};
