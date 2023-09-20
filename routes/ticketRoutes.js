import express from 'express';
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  // reserveTicket
} from '../controller/ticketController.js';

import {isAuthenticatedUser, authorizeRoles} from '../middleware/auth.js';

const router = express.Router();

// Create a new ticket
router.route('/tickets').post(isAuthenticatedUser('strict'), authorizeRoles('admin'), createTicket)
  .get(isAuthenticatedUser('strict'), authorizeRoles, getTickets);

router.route('/tickets/:id').get(isAuthenticatedUser('strict'), authorizeRoles('admin'), getTicketById)
  .post(isAuthenticatedUser('strict'), authorizeRoles('admin'), updateTicket)
  .delete(isAuthenticatedUser('strict'), deleteTicket);


// router.route('/reserveTickets:/id').get(isAuthenticatedUser('strict'), reserveTicket)
export default router;
