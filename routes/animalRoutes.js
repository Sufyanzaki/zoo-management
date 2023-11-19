import express from 'express';
import {
    createAnimal, removeImages, updateAnimal, deleteAnimal
} from "../controller/animalController.js";

import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/animals").post(isAuthenticatedUser('strict'), createAnimal); //working

router.route("/animals/:id").post(isAuthenticatedUser('strict'), updateAnimal)
  .delete(isAuthenticatedUser('strict'), deleteAnimal); //working
router.route("/removeImage/:id").get(isAuthenticatedUser('strict'), removeImages); //working
export default router;