import express from 'express';
import {
  homeView, loginView, signupView, animalDetailView
} from "../controller/viewController.js";

import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(homeView); //working
router.route("/login").get(loginView); //working
router.route("/signup").get(signupView); //working
router.route("/animal-details").get(animalDetailView); //working

export default router;