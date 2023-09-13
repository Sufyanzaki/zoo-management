import express from 'express';
import {
    createAnimal, getAllAnimals, removeImages, updateAnimal
} from "../controller/animalController.js";

import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/animals").get(isAuthenticatedUser, authorizeRoles('admin') ,getAllAnimals)
  .post(isAuthenticatedUser, createAnimal); //working

router.route("/animals/:id").post(isAuthenticatedUser, updateAnimal); //working
router.route("/removeImage/:id").get(isAuthenticatedUser, removeImages); //working
export default router;