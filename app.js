import 'express-async-errors';
import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import cors from 'cors'
import fileUpload from 'express-fileupload';
import errorMiddleware from './middleware/error.js'
// import { v2 as cloudinary } from 'cloudinary';
import { fileURLToPath } from 'url';
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// cloudinary.config({ 
//   cloud_name: 'dkfy6dxrg', 
//   api_key: '113136512756865', 
//   api_secret: 'CvdwBz2znMdv6SOHtf0ciAKpg_8',
//   secure: false
// });

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Route Imports
import user from "./routes/userRoutes.js";
import views from "./routes/viewRoutes.js";

app.use(errorMiddleware);

app.use("/", user);
app.use("/", views);

export default app;