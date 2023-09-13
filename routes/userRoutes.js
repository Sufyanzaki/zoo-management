import express from 'express';
import {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
} from "../controller/userController.js";

import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/signup").post(registerUser); //working

router.route("/login").post(loginUser); //working

router.route("/logout").get(logout); //working

router.route("/me").get(isAuthenticatedUser, getUserDetails); //working

export default router;