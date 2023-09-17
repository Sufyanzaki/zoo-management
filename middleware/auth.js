import User from "../model/userModel.js"
import Jwt from 'jsonwebtoken';

const {verify} = Jwt;

export const isAuthenticatedUser = (type) =>{
  return (async (req, res, next) => {
    //auth token from cookies;
    const {token} = req.cookies;
  
    if (!token && type === 'strict') {
      return res.redirect('/login')
    }
    else if(!token && type === 'default'){
      req.user = null
      next()
    }
    else{ // if token is here 
      const decodedData = verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedData.id);
      next();
    }
  });
}

export const authorizeRoles = (role) => {
  return (req, res, next) => {
    if (role !== req.user.role) {
      return res.render("error.ejs", {
        errors: {
          message: 'Your gift to Viserlife Zoo plays an ',
          title: 'You are not Authorized to access this resource'
        }
      });
    }

    next();
  };
};