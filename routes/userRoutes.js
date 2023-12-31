import express from 'express';
import {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
} from "../controller/userController.js";

import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/signup").post(isAuthenticatedUser('default'), registerUser); //working

router.route("/login").post(isAuthenticatedUser('default'),loginUser); //working

router.route("/logout").get(isAuthenticatedUser('default'),logout); //working

router.route("/me").get(isAuthenticatedUser('strict'), getUserDetails); //working

export default router;