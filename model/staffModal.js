import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
    image: {type: String},
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Admin', 'Veterinarian', 'Zookeeper', 'Ticketing', 'Security', 'Guide'],
        required: true,
    },
    shift: {
        type: String,
        enum: ['Morning', 'Afternoon', 'Night'],
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    dateOfJoining: {
        type: Date,
        default: Date.now,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
    }
}, { timestamps: true });

export default mongoose.model('Staff', staffSchema);
