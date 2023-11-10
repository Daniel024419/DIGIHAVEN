
//google auth

const googleUthCallback = async (req, res) => {



    const email = req.user.emails[0].value;
  
    console.log(email)
  
    try {
  
      //query
      db = await connectToDB();
      let userData;
  
  
      //admin
      const collection_admin = db.collection('users');
      const userData_Admin = await collection_admin.findOne({
        $or: [
          { usermail: email },
        ],
      });
  
  
      //buyer
      const collection_Buyers = db.collection('buyers');
      const userData_Buyer = await collection_Buyers.findOne({
        $or: [
          { usermail: email },
        ],
      });
  
  
      //artisans
      const collection_Artisans = db.collection('artisans');
      const userData_Artisans = await collection_Artisans.findOne({
        $or: [
          { usermail: email },
        ],
      });
  
  
  
      //user found
      if (userData_Admin) {
        //save array if the use is admin
        userData = userData_Admin;
        // User information you want to include in the JWT payload
        const user_token = {
          userID: userData.userID,
          username: userData.username,
        };
        // Generate a JWT
        const token = jwt.sign(user_token, secretKey, { expiresIn: '24h' }); // '1h' means the token expires in 24 hours
  
        User_Session.userID = userData.userID;
        User_Session.username = userData.username;
        User_Session.profile = userData.profile;
        User_Session.created_at = userData.created_at;
        User_Session.updated_at = userData.updated_at;
        User_Session.usermail = userData.usermail;
        User_Session.role = userData.role;
        User_Session.tel = userData.tel;
        User_Session.last_visit = userData.last_visit;
        req.session.Authenticated = true;
        const Authenticated = req.session.Authenticated;
        req.session.User = User_Session;
  
        //fetching user by auth
        await collection.updateOne(
          //find user with id
          { userID: userData.userID },
          //update user profile with the new file name...
          {
            $set: {
  
              status: 1,
              last_visit: Date(),
            }
          }
        );
  
        // Encrypt the data and create a token
        //URL_REDIRECT back to client
        const data_token = jwt.sign({ userData, message: "Authenticated as " + email, token, statusCode: 200 }, secretKey);
  
        // res.redirect(`${process.env.SERVER_APP_URL_REDIRECT_CLIENT}/auth/google/callback?data_token=${data_token}`);
        res.redirect(`${process.env.SERVER_APP_URL_REDIRECT_CLIENT_PRO}/auth/google/callback?data_token=${data_token}`);
  
      }
  
      //buyer
      else if (userData_Buyer) {
        //save array if the user is buyerr
        userData = userData_Buyer;
        // User information you want to include in the JWT payload
        const user_token = {
          userID: userData.userID,
          username: userData.username,
        };
        // Generate a JWT
        const token = jwt.sign(user_token, secretKey, { expiresIn: '24h' }); // '1h' means the token expires in 24 hours
  
        User_Session.userID = userData.userID;
        User_Session.username = userData.username;
        User_Session.profile = userData.profile;
        User_Session.created_at = userData.created_at;
        User_Session.updated_at = userData.updated_at;
        User_Session.usermail = userData.usermail;
        User_Session.role = userData.role;
        User_Session.tel = userData.tel;
        User_Session.last_visit = userData.last_visit;
        req.session.Authenticated = true;
        const Authenticated = req.session.Authenticated;
        req.session.User = User_Session;
  
        //fetching user by auth
        await collection.updateOne(
          //find user with id
          { userID: userData.userID },
          //update user profile with the new file name...
          {
            $set: {
  
              status: 1,
              last_visit: Date(),
            }
          }
        );
  
        // Encrypt the data and create a token
        //URL_REDIRECT back to client
        const data_token = jwt.sign({ userData, message: "Authenticated as " + email, token, statusCode: 200 }, secretKey);
  
        // res.redirect(`${process.env.SERVER_APP_URL_REDIRECT_CLIENT}/auth/google/callback?data_token=${data_token}`);
        res.redirect(`${process.env.SERVER_APP_URL_REDIRECT_CLIENT_PRO}/auth/google/callback?data_token=${data_token}`);
  
      }
  
      else if (userData_Artisans) {
        //save array if the user is an artisan
        userData = userData_Artisans;
        // User information you want to include in the JWT payload
        const user_token = {
          userID: userData.userID,
          username: userData.username,
        };
        // Generate a JWT
        const token = jwt.sign(user_token, secretKey, { expiresIn: '24h' }); // '1h' means the token expires in 24 hours
  
        User_Session.userID = userData.userID;
        User_Session.username = userData.username;
        User_Session.profile = userData.profile;
        User_Session.created_at = userData.created_at;
        User_Session.updated_at = userData.updated_at;
        User_Session.usermail = userData.usermail;
        User_Session.role = userData.role;
        User_Session.tel = userData.tel;
        User_Session.last_visit = userData.last_visit;
        req.session.Authenticated = true;
        const Authenticated = req.session.Authenticated;
        req.session.User = User_Session;
  
        //fetching user by auth
        await collection.updateOne(
          //find user with id
          { userID: userData.userID },
          //update user profile with the new file name...
          {
            $set: {
  
              status: 1,
              last_visit: Date(),
            }
          }
        );
  
        // Encrypt the data and create a token
        //URL_REDIRECT back to client
        const data_token = jwt.sign({ userData, message: "Authenticated as " + email, token, statusCode: 200 }, secretKey);
  
        // res.redirect(`${process.env.SERVER_APP_URL_REDIRECT_CLIENT}/auth/google/callback?data_token=${data_token}`);
        res.redirect(`${process.env.SERVER_APP_URL_REDIRECT_CLIENT_PRO}/auth/google/callback?data_token=${data_token}`);
  
      }
  
      else {
        res.status(200).json({ message: "User not found.. ", statusCode: 404 });
      }
  
    } catch (error) {
      logger.log('error', '[' + Date() + '] authenticating error /  internal error', error);
  
    }
  }
  