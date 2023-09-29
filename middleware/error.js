const errorMiddleware = (err, req, res, next) => {
  console.log(err)
  const errors = Object.values(err.errors).map(error => error.message);
  res.locals.errors = errors;
  errors.push("Internal Server Error")

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    res.locals.errors = message;
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Username or email already exist`;
    res.locals.errors = message;
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    res.locals.errors = message;
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    res.locals.errors = message;
  }

  res.render('sign-in', { errors: res.locals.errors, data:req.user });
};

export default errorMiddleware;