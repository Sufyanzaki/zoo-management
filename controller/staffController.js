import Staff from "../model/staffModal.js";
import { uploadImages } from "../utils/GeneralFunctions.js";

export const createStaff = async (req, res, next) => {
    try {
        const file = req.files.image || null;
        const fileArr = await uploadImages(file);
        const staff = await Staff.create({
            ...req.body,
            image: `${fileArr[0]}`
        });
        return res.status(201).json({
            message : ''
        })
    } catch (error) {
        console.log(error)
        res.render('error', {
            errors: {
                message: 'Something went wrong',
                title: 'Not found'
            }
        })
    }
}
export const getSingleStaff = async (req, res, next) => {
    try {
        const doctorId = req.params.id;
        const doctor = await Staff.findById(doctorId);
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
export const updateStaff = async (req, res, next) => {
    try {
        const file = req.files.image || null;
        const fileArr = await uploadImages(file);
        const staffId = req.params.id;
        const staff = await Staff.findByIdAndUpdate(staffId, {
            ...req.body,
            _id:staffId,
            image: `${fileArr[0]}`
        }, { new: true });
        if (!staff) {
            return res.status(404).json({
                message: "Doctor not found",
            });
        }
        return res.status(200).json({
            message: "Staff member updated successfully",
            data: staff, // Return the updated doctor object
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred",
            error: error.message, // Provide more detailed error information
        });
    }
};


export const removeStaff = async (req, res, next) => {
    const staffId = req.params.id;
    try {
        await Staff.findByIdAndDelete(staffId);
        res.send('Success')
    } catch (error) {
        res.render('error', {
            errors: {
                message: 'This Staff member does not exist',
                title: 'Staff not found'
            }
        })
    }
}

export const removeImages = async (req, res, next) => {
    const staffId = req.params.id;
    try {
        const staffMember = await Staff.findById(staffId);
        staffMember.image = null;
        await staffMember.save();
        res.status(200).send('Success');
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}