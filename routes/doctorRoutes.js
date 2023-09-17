import express from 'express';
import {
  createDoctor, getSingleDoctor, updateDoctor, removeDoctor
} from "../controller/doctorController.js";


const router = express.Router();

router.route("/doctor").post(createDoctor)

router.route('/doctor/:id').get(getSingleDoctor)
  .post(updateDoctor).delete(removeDoctor)

export default router;