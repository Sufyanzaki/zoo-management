import 'express-async-errors';
import express from 'express';
import passport from 'passport';
import './config/passport-setup.js'
const app = express();
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session'
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import errorMiddleware from './middleware/error.js'
import { v2 as cloudinary } from 'cloudinary';
import { fileURLToPath } from 'url';
import path from 'path'
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: ".env" });

app.use(cookieSession({
  name: 'tuto-session',
  keys: ['key1', 'key2']
}))
app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.use(passport.session())

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: false
});

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', process.env.BASE_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// Route Imports
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import viewsRoutes from "./routes/viewRoutes.js";
import animalRoutes from "./routes/animalRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import sendToken from './utils/jwtToken.js';

app.use(errorMiddleware);

app.use("/", viewsRoutes);
app.use("/", userRoutes);
app.use("/", ticketRoutes)
app.use("/", animalRoutes);
app.use("/", doctorRoutes);

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback',
  passport.authenticate('google',
    { failureRedirect: '/failed' }),
  (req, res) => {
    sendToken(req.user, req, res)
  })

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

app.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }
  ));

app.use((req, res, next) => {
  res.status(404).render('error', {
    errors: {
      title: "Page Not Found",
      message: "Your gift to Viserlife Zoo plays an important role in our mission. Together, our footprint here in Viserlife translates to action"
    }
  });
});
export default app;