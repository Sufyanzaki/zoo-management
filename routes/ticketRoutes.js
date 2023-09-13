import express from 'express';
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from '../controller/ticketController.js';

import {isAuthenticatedUser, authorizeRoles} from '../middleware/auth.js';

const router = express.Router();

// Create a new ticket
router.route('/tickets').post(isAuthenticatedUser, authorizeRoles('admin'), createTicket)
  .get(isAuthenticatedUser, authorizeRoles, getTickets);

router.route('/tickets/:id').get(isAuthenticatedUser, authorizeRoles, getTicketById)
  .put(isAuthenticatedUser, authorizeRoles, updateTicket)
  .delete(isAuthenticatedUser, deleteTicket);

export default router;
