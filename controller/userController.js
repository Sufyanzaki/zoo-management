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
    });
    sendToken(user, 200, res);
  } catch (error) {
    res.render("sign-up", { error: error.errors.password.message, data:req.user });
  }
};

// Login User
export const loginUser = async (req, res, next) => {
  const errors = [];
  const { email, password } = req.body;
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
    res.render("sign-in", { errors, data:req.user });
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

  return res.redirect('/')
};

// Get User Detail
export const getUserDetails = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  return res.status(200).json({
    success: true,
    user,
  });
};

