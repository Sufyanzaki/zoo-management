import ErrorHandler from "../utils/errorHandler.js";
import User from "../model/userModel.js"
import Jwt from 'jsonwebtoken';
const { verify } = Jwt;

export const isAuthenticatedUser = (async (req, res, next) => {
  //auth token from cookies;
  const {token} = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);

  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};