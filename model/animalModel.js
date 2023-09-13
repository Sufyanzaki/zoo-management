import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema({
  animalName: {
    type: String,
    required: true,
  },
  animalDetails: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  totalFee: {
    type: Number,
    required: true
  },
  ticketDetails: {
    type: String,
    required: true
  },
  images: [
    {type: String}
  ]
});

export default mongoose.model('Animal', animalSchema);

