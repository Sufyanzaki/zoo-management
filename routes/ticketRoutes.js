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
router.route('/tickets').post(isAuthenticatedUser('strict'), authorizeRoles('admin'), createTicket)
  .get(isAuthenticatedUser('strict'), authorizeRoles, getTickets);

router.route('/tickets/:id').get(isAuthenticatedUser('strict'), authorizeRoles('admin'), getTicketById)
  .post(isAuthenticatedUser('strict'), authorizeRoles('admin'), updateTicket)
  .delete(isAuthenticatedUser('strict'), deleteTicket);

export default router;
