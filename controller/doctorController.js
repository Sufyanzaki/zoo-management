import Doctor from "../model/doctorModel.js";
import { uploadImages } from "../utils/GeneralFunctions.js";

export const createDoctor = async (req, res, next) => {
  try {
    const file = req.files?.file || null;
    const fileArr = await uploadImages(file);
    await Doctor.create({
      ...req.body,
      image: `${fileArr[0]}`
    });
    res.send('Success')
  } catch (error) {
    console.log(error)
    res.render('error', {
      errors: {
        message: 'This Animal does not exist',
        title: 'Animal not found'
      }
    })
  }
}
export const getSingleDoctor = async (req, res, next) => {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }
    res.status(200).json({
      message: "Doctor found",
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};
export const updateDoctor = async (req, res, next) => {
  try {
    const file = req.files?.file || null;
    const fileArr = await uploadImages(file);
    const doctorId = req.params.id;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, {
      ...req.body,
      _id:doctorId,
      image: `${fileArr[0]}`
    }, { new: true });
    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }
    return res.status(200).json({
      message: "Doctor updated successfully",
      data: doctor, // Return the updated doctor object
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error: error.message, // Provide more detailed error information
    });
  }
};


export const removeDoctor = async (req, res, next) => {
  const doctorId = req.params.id;
  try {
    await Doctor.findByIdAndDelete(doctorId);
    res.send('Success')
  } catch (error) {
    res.render('error', {
      errors: {
        message: 'This doctor does not exist',
        title: 'doctor not found'
      }
    })
  }
}

export const removeImages = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const doctor = await Doctor.findById(userId);
    doctor.image = '';
    await doctor.save();
    res.status(200).send('Success');
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}