
const axios = require('axios');
const logger = require('../../logger');

const PAYSTACK_SECRET_KEY = 'sk_test_b3c81775f241d11177f95c15968e6e8f33ececca';
const paystack_public_key = 'pk_test_5078e15055d1ab0e3ed50f01f6382e319feedd48';

const PaystackApi = async (req , res , next ) => {
	
try{

const { email, amount, reference } = req.body;

  const paymentData = {
    email,
    amount: amount * 100,
    reference,
    callback_url: 'http://localhost:3030/auth/paystack/payment/callback', 
  };

  try {
    const response = await axios.post('https://api.paystack.co/transaction/initialize', paymentData, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json(error.response.data);
  }

}
catch(error){
logger.log('error', "can not initialize payment /  internal error", error);

}

}

PaystackApiCallback =  async ( req, res , next )=>{

try{

const body = req.body;
  const event = body.event;

  if (event === 'charge.success') {
    // Payment was successful
    // Handle success and update your application accordingly
    console.log('Payment successful:', body);
  } else {
    // Payment was not successful
    // Handle failure
    console.log('Payment failed:', body);
  }

  res.sendStatus(200);

}catch(error){
logger.log('error', "payment callback failed /  internal error", error);

}


}


module.exports = {
PaystackApi:PaystackApi,
PaystackApiCallback:PaystackApiCallback,

};