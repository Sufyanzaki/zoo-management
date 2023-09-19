import express from 'express';
import {
  homeView, loginView, faqView, signupView,userDoctorList, animalDetailView, animalsView,userAnimalView, detailView, doctorView, createdoctorView, createTicketsView, ticketsView, contactView
} from "../controller/viewController.js";

import {isAuthenticatedUser, authorizeRoles} from '../middleware/auth.js';
const router = express.Router();

router.route("/").get(isAuthenticatedUser('default'),homeView); //working

router.route("/login").get(isAuthenticatedUser('default'),loginView); //working
router.route("/signup").get(isAuthenticatedUser('default'),signupView); //working

router.route("/contact").get(isAuthenticatedUser('strict'),contactView); //working
router.route("/faq").get(isAuthenticatedUser('strict'),faqView); //working

router.route("/animals-list").get(isAuthenticatedUser('default'),userAnimalView); //working
router.route("/doctor-list").get(isAuthenticatedUser('default'),userDoctorList); //working

router.route("/animals").get(isAuthenticatedUser('default'),animalsView); //working
router.route("/animal-details").get(isAuthenticatedUser('default'), animalDetailView); //working
router.route("/animal-details/:id").get(isAuthenticatedUser('default'),authorizeRoles('admin'),animalDetailView); //working
router.route("/animal-detail/:id").get(isAuthenticatedUser('default'),detailView); //working

router.route("/doctors").get(isAuthenticatedUser('strict'), doctorView); //working
router.route("/doctors/create").get(isAuthenticatedUser('strict'),createdoctorView); //working
router.route("/doctors/:id").get(isAuthenticatedUser('strict'),createdoctorView); //working

router.route("/tickets").get(isAuthenticatedUser('strict'), ticketsView); //working
router.route("/tickets/create").get(isAuthenticatedUser('strict'),createTicketsView); //working
router.route("/tickets/:id").get(isAuthenticatedUser('strict'),createTicketsView); //working

export default router;