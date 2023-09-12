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
    visitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This should match the model name for the User schema
    },
    zoo: {
        name: String,
        location: String,
        // Add more zoo information properties as needed.
    },
    entryDateTime: {
        type: Date,
    },
    qrCode: {
        type: String,
        unique: true,
    },
    status: {
        type: String,
        enum: ['used', 'unused', 'expired'],
        default: 'unused',
    },
    payment: {
        method: String,
        transactionID: String,
        // Add more payment information properties as needed.
    },
    notes: {
        type: String,
    },
});

export default mongoose.model('Ticket', ticketSchema);

