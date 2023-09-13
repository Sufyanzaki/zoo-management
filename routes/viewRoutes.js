import express from 'express';
import {
  homeView, loginView, signupView, animalDetailView, animalsView
} from "../controller/viewController.js";

import {isAuthenticatedUser, authorizeRoles} from '../middleware/auth.js';
const router = express.Router();

router.route("/").get(homeView); //working
router.route("/login").get(loginView); //working
router.route("/signup").get(signupView); //working
router.route("/animals").get(isAuthenticatedUser,authorizeRoles('admin'),animalsView); //working
router.route("/animal-details").get(isAuthenticatedUser, animalDetailView); //working
router.route("/animal-details/:id").get(animalDetailView); //working

export default router;