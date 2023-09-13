
import Ticket from "./../model/ticketModel.js"
// Create a new ticket
export const createTicket = async (req, res) => {
    try {
        const ticket = await Ticket.create(req.body);
        return res.status(201).json(ticket);
    } catch (error) {
        return res.status(500).json({ error: 'Unable to create a ticket' });
    }
};

// Get all tickets
export const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        return res.status(200).json(tickets);
    } catch (error) {
        return res.status(500).json({ error: 'Unable to fetch tickets' });
    }
};

// Get a specific ticket by ID
export const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        return res.status(200).json(ticket);
    } catch (error) {
        return res.status(500).json({ error: 'Unable to fetch the ticket' });
    }
};

// Update a ticket by ID
export const updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        return res.status(200).json(ticket);
    } catch (error) {
        return res.status(500).json({ error: 'Unable to update the ticket' });
    }
};

// Delete a ticket by ID
export const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndRemove(req.params.id);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: 'Unable to delete the ticket' });
    }
};