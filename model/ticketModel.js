import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    ticketNumber: {
        type: String,
        unique: true,
        required: true,
    },
    ticketType: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    purchaseDate: {
        type: Date,
        required: true,
    },
    expirationDate: {
        type: Date,
    },
    zoo: {
        name: String,
        location: String,
    },
    entryDateTime: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['used', 'unused', 'expired'],
        default: 'unused',
    },
    payment: {
        method: String,
        transactionID: String,
    },
    notes: {
        type: String,
    },
});

export default mongoose.model('Ticket', ticketSchema);

