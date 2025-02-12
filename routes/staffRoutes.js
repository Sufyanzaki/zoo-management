import express from 'express';
import {createStaff, getSingleStaff, updateStaff, removeStaff, removeImages} from "../controller/staffController.js";
import { isAuthenticatedUser } from '../middleware/auth.js';

const router = express.Router();

router.route("/staff").post(isAuthenticatedUser('strict'),createStaff)

router.route('/staff/:id').get(isAuthenticatedUser('strict'),getSingleStaff)
    .post(updateStaff).delete(isAuthenticatedUser('strict'),removeStaff)

router.route('/staffImage/:id').get(isAuthenticatedUser('strict'),removeImages)

export default router;