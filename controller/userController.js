import ErrorHandler from "../utils/errorHandler.js";
import User from "../model/userModel.js";
import sendToken from "../utils/jwtToken.js";

// Register a User
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "123",
        url: "url",
      },
    });
    sendToken(user, 200, res);
  } catch (error) {
    res.render("sign-up", { error: error.errors.password.message });
  }
};

// Login User
export const loginUser = async (req, res, next) => {
  const errors = [];
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    errors.push("Please Enter Email & Password");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    errors.push("User not found");
  }

  const isPasswordMatched = await user?.comparePassword(password);

  if (!isPasswordMatched) {
    errors.push("Invalid email or password");
  }

  if (errors.length > 0) {
    console.log(errors);
    res.render("sign-in", { errors });
    return;
  }
  sendToken(user, 200, res);
};

// Logout User
export const logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};

// Get User Detail
export const getUserDetails = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
};

// the super admin
export const superLoginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
};
