import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
  },
  licenseNumber : {
    type : Number,
    required: true
  },
  specialization : {
    type : String,
    required : true
  },
  experience : {
    type : Number,
    required : true
  },
  education : {
    type : String,
    required : true
  },
  contactInfo : {
    type : String,
    required : true
  },
  servicesOffered : {
    type : String,
    required : true
  },
  availability : {
    type : String,
    required : true
  },
});

export default mongoose.model('Doctor', doctorSchema);

