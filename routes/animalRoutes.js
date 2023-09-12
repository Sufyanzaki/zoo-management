import express from 'express';
import {
    uploadImages
} from "../controller/animalController.js";

import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/upload-images").post(uploadImages); //working

export default router;