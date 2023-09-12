import express from 'express';
import {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
} from '../controller/ticketController.js';

import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Create a new ticket
router.post('/tickets', isAuthenticatedUser, authorizeRoles, createTicket);

// Get all tickets
router.get('/tickets', isAuthenticatedUser, authorizeRoles, getTickets);

// Get a specific ticket by ID
router.get('/tickets/:id', isAuthenticatedUser, authorizeRoles, getTicketById);

// Update a ticket by ID
router.put('/tickets/:id', isAuthenticatedUser, authorizeRoles, updateTicket);

// Delete a ticket by ID
router.delete('/tickets/:id', isAuthenticatedUser, deleteTicket);

export default router;
