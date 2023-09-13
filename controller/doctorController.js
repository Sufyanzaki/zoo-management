import Doctor from "../model/doctorModel.js";

export const createDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.create(req.body);
    return res.status(404).json({
      message: doctor,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
}
export const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    if (!doctors) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }
    return res.status(404).json({
      message: "Doctor found",
    });
  } catch (error) {
    return res.status(404).json({
      message: error
    });
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
    const doctorId = req.params.id;
    const updatedDoctor = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, updatedDoctor, { new: true });
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
