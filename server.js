const express = require('express');
const app = express();
const multer = require("multer");
const mongodbconfig = require('./config/mongodbconfig');
const db_con = mongodbconfig.connectToDB;
//db_con();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//auth origins
const cors = require('cors');
// Enable CORS for all routes
app.use(cors());

var bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
///env viriables
const dotenv = require("dotenv");
dotenv.config();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })
const session = require('express-session');
const EventEmitter = require('events');
// Increase the event listener limit for Express (change 15 to your desired limit)
EventEmitter.setMaxListeners(200);
//path
const path = require("path");
// Initialization cookie
app.use(cookieParser());
app.use(express.json());
//defined port or 3sfs000
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());

app.use(urlencodedParser);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// time to live for cookies
const oneDay = 100 * 60 * 60 * 24;
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: {
    name: 'google-auth-session',
    keys: ['key1', 'key2'],
    maxAge: oneDay
  },
}));

//global files
app.use(express.static(path.join(__dirname, 'assets', 'files')));
//serve react build
app.use(express.static(path.join(__dirname, 'build')));

//middlewares
const Middlewares = require('./http/middlewares/authMiddleware');


//controllers
//index conrollers
const IndexController = require('./http/controllers/IndexController');

//auth
const AuthController = require('./http/controllers/AuthController');


//update user profile
const UpdateUserController = require('./http/controllers/UpdateUserController');


//Add users
const AddUserController = require('./http/controllers/AddUserController');

// users
const UsersContoller = require('./http/controllers/UsersContoller');

const UserOverviewController = require('./http/controllers/UserOverviewController');
const ArtisansOverviewController = require('./http/controllers/ArtisansOverviewController');
//artisans
const ArtisansController = require('./http/controllers/ArtisansController');

//VerificationController
VerificationController = require('./http/controllers/VerificationController');


const BuyersController = require('./http/controllers/BuyersController');
const FeedBackController = require('./http/controllers/FeedBackController');

//support
const SupportController = require('./http/controllers/SupportController');

const PlatformServicesController = require('./http/controllers/PlatformServicesController')
const BuyersOverviewController = require('./http/controllers/BuyersOverviewController');

//services
const ServicesController = require('./http/controllers/ServicesController');


//payment
const PaymentApiController = require('./http/controllers/PaymentApiController');

//contact

const ContactController = require('./http/controllers/ContactController');

//book services
const BookServiceController = require('./http/controllers/BookServiceController');

//platform controller
const ArtisansPlatformDashboardController = require('./http/controllers/ArtisansPlatformDashboardController');

//error_404
//const error_404_PNF  = require('./http/controllers/error_404');


//  configuring the location for file upload
// Define the storage location and file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/files"); // Folder where the uploaded file will be stored
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

//  configuring the location for file upload
// Define the storage location and file name
const storage2 = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "assets/files"); // Folder where the uploaded file will be stored
  },
  filename: (req, file, callback) => {
    const {
      username,
      usermail,
      userID,
    } = req.body.formData;
    const fileName = file.originalname

    callback(null, userID + "-" + fileName);
  },
});

const storage3 = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "assets/files");
    // Folder where the uploaded file will be stored
  },
  filename: (req, file, callback) => {
    //const userID = UpdateUserController.randomstring;
    const fileName = file.originalname

    let now = new Date();
    let hours = now.getHours();
    let year = now.getFullYear();

    let timestamp = hours + "" + year;

    callback(null, timestamp + "-" + fileName);
  },
});

const upload = multer({ storage: storage });
const profileUpload = multer({ storage: storage2 });
const profileUploadpic = multer({ storage: storage3 });

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID_LOGIN,
  clientSecret: process.env.CLIENT_SECRET_LOGIN,

  //developing
  callbackURL: process.env.SERVER_APP_URL_CALLBACK_DEV+'/auth/callback',

  //production
  //callbackURL: process.env.SERVER_APP_URL_CALLBACK_PRO + '/auth/callback',

}, (accessToken, refreshToken, profile, done) => {
  // 'profile' contains user information, including the email
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Auth 
app.get('/google/auth', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.email'],
}));

app.get('/auth/callback',
  passport.authenticate('google', { failureRedirect: '/auth/callback/failure' }),
  AuthController.googleUthCallback
);

//end
// failure
app.get('/auth/callback/failure',
  (req, res) => {
    console.log("google auth error");
  });

// Middleware for authentication
app.use('/auth', Middlewares.AuthMiddleware);

//login / authenticate users
app.post('/login/admin', AuthController.admin);
app.post('/login/artisan', AuthController.ArtisanAuth);
app.post('/login/buyer', AuthController.BuyerAuth);
//update user details
app.post('/auth/update/user-profile-picture', profileUploadpic.single("file"), UpdateUserController.UpdateUserProfile);

//update user details
app.post('/auth/edit/edit-user-profile-picture', profileUploadpic.single("file"), UpdateUserController.EditUserProfile);


//update user details
app.post('/auth/update/user-details', UpdateUserController.UpdateUserData);

//fetch user details
app.get('/auth/fetch-user-profile/:profile', UpdateUserController.fetchUserProfile);

//overview
app.get('/auth/fetch-users/active', UserOverviewController.fetchActiveUsers);
app.get('/auth/fetch-users/inactive', UserOverviewController.fetchInActiveUsers);


//add user details
app.post('/auth/add-new-user', profileUpload.single("file"), AddUserController.AddUser);

//UsersContoller
app.get('/auth/fetch-users', UsersContoller.Users);

//deleteUsers
app.delete('/auth/delete-users/:userID', UsersContoller.deleteUsers);
//edit user

app.post('/auth/edit/edit-user-details', UsersContoller.EditUsersDetails);


//artisans controller 
app.get('/auth/fetch-artisans', ArtisansController.artisans);
app.delete('/auth/delete-artisan/:artisanId', ArtisansController.deleteArtisan);
app.get('/auth/fetch-artisans/:artisanId', ArtisansController.fetchArtisansId);

app.get('/auth/fetch-artisans/active', ArtisansOverviewController.fetchActiveArtisans);
app.get('/auth/fetch-artisans/inactive', ArtisansOverviewController.fetchInActiveArtisans);
app.get('/auth/fetch-artisans/verified', ArtisansOverviewController.fetchVerfiedArtisans);


app.get('/auth/artisan-action/:artisanId/:action', ArtisansController.VerifyArtisans);
app.post('/auth/create-artisan', upload.single("file"), ArtisansController.CreateArtisan);


app.get('/auth/fetch-feebacks', FeedBackController.feedbacks);


app.get('/auth/fetch-buyers', BuyersController.buyers);
app.post('/auth/create-buyer', upload.single("file"), BuyersController.CreateBuyer);
app.delete('/auth/delete-buyer/:buyerId',BuyersController.DeleteBuyer);

app.get('/auth/fetch-buyers/active', BuyersOverviewController.fetchActiveBuyers);
app.get('/auth/fetch-buyers/inactive', BuyersOverviewController.fetchInActiveBuyers);
app.get('/auth/fetch-buyers/verified', BuyersOverviewController.fetchVerfiedBuyers);


//SupportController
app.get('/auth/fetch-supports', SupportController.supports);
app.post('/auth/add-support-message', upload.single("file"), SupportController.AddSuport);


//dashboard
app.get('/auth/fetch-services-platform-all', PlatformServicesController.Services);

//bookings ARTISAN platform
app.get('/auth/fetch-bookings-completed-artisan/:artisanId', PlatformServicesController.bookingsCompleted);
app.get('/auth/fetch-bookings-cancelled-artisan/:artisanId', PlatformServicesController.bookingsCancelled);
app.get('/auth/fetch-bookings-pending-artisan/:artisanId', PlatformServicesController.bookingsPending);
app.get('/auth/fetch-bookings-all-artisan/:artisanId', PlatformServicesController.DashboardBookingAll);


//bookings BUYER platform
app.get('/auth/fetch-bookings-completed-buyer/:buyerId', PlatformServicesController.bookingsCompletedBuyer);
app.get('/auth/fetch-bookings-cancelled-buyer/:buyerId', PlatformServicesController.bookingsCancelledBuyer);
app.get('/auth/fetch-bookings-pending-buyer/:buyerId', PlatformServicesController.bookingsPendingBuyer);


//dasboard services
app.get('/auth/fetch-services-dashboard', ServicesController.DashboardServices);
app.get('/auth/fetch-services-completed', ServicesController.DashboardServicesCompleted);
app.get('/auth/fetch-services-cancelled', ServicesController.DashboardServicesCancelled);
app.get('/auth/fetch-services-pending', ServicesController.DashboardServicesPending);


//verify user mail
app.post('/auth/user/verify-usermailorTel', VerificationController.VerifyUsermail);
//update forgot passord 
app.post('/auth/user/update-forgot-password', VerificationController.UpdateForgotPassword);


//payment

app.post('/auth/make-payment', PaymentApiController.PaystackApi);
app.post('/auth/paystack/payment/callback', PaymentApiController.PaystackApiCallback);


app.post('/auth/upload-contact',upload.single("file"), ContactController.addContact);
//app.post('/auth/paystack/payment/callback', PaymentApiController.PaystackApiCallback);

//book service
//BookServiceController
app.post('/auth/book-services',upload.single("file"), BookServiceController.AddbookServices);
app.get('/auth/booked-services', BookServiceController.BookedServices);
app.post('/auth/update-booked-services',upload.single("file"), BookServiceController.UpdateBookedServices);
app.get('/auth/cancel-booked-services/:bookingId', BookServiceController.CancelBookedServices);
app.get('/auth/delete-booked-services/:bookingId', BookServiceController.DeleteBookedServices);



app.post('/auth/add-platform-feedback',upload.single("file"), FeedBackController.feedbacks);
//platformdashboard
// ArtisansPlatformDashboardController
app.post('/auth/artisan-create-services',upload.single("file"), ArtisansPlatformDashboardController.createServiceArtisan);

//logout
app.get('/logout/users', AuthController.logout);

//end
//serve client
app.get('*', IndexController.index);




app.listen(PORT, (error) => {
  if (!error)
    console.log("Server is Running on port " + PORT)
  else
    console.log("Error occurred, server can't start", error);
}
); 
