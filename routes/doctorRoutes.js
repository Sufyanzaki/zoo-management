import express from 'express';
import {
  createDoctor, getSingleDoctor, updateDoctor, removeDoctor, removeImages
} from "../controller/doctorController.js";
import { isAuthenticatedUser } from '../middleware/auth.js';

const router = express.Router();

router.route("/doctor").post(isAuthenticatedUser('strict'),createDoctor)

router.route('/doctor/:id').get(isAuthenticatedUser('strict'),getSingleDoctor)
  .post(updateDoctor).delete(isAuthenticatedUser('strict'),removeDoctor)

router.route('/doctorImage/:id').get(isAuthenticatedUser('strict'),removeImages)

export default router;