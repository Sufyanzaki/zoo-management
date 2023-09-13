import express from 'express';
import {
  createDoctor, getAllDoctors, getSingleDoctor, updateDoctor
} from "../controller/doctorController.js";

import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/doctor").post(createDoctor)
  .get(getAllDoctors); //working

router.route('/doctor/:id').get(getSingleDoctor)
  .put(updateDoctor)

export default router;