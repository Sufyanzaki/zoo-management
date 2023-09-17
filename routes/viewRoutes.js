import express from 'express';
import {
  homeView, loginView, signupView, animalDetailView, animalsView, detailView, doctorView, createdoctorView
} from "../controller/viewController.js";

import {isAuthenticatedUser, authorizeRoles} from '../middleware/auth.js';
const router = express.Router();

router.route("/").get(isAuthenticatedUser('default'),homeView); //working
router.route("/login").get(isAuthenticatedUser('default'),loginView); //working
router.route("/signup").get(isAuthenticatedUser('default'),signupView); //working
router.route("/animals").get(isAuthenticatedUser('default'),animalsView); //working
router.route("/animal-details").get(isAuthenticatedUser('default'), animalDetailView); //working
router.route("/animal-details/:id").get(isAuthenticatedUser('default'),animalDetailView); //working
router.route("/animal-detail/:id").get(isAuthenticatedUser('default'),detailView); //working
router.route("/doctors").get(isAuthenticatedUser('strict'), doctorView); //working
router.route("/doctors/create").get(createdoctorView); //working
router.route("/doctors/:id").get(createdoctorView); //working

export default router;