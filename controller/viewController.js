import Animal from '../model/animalModel.js';
import {formatDate} from "../utils/GeneralFunctions.js";
import Doctor from "../model/doctorModel.js";

export const homeView = async (req, res, next) => {
  res.render("index", {user : req.user});
};
export const loginView = async (req, res, next) => {
  res.render("sign-in", {errors : [], user:req.user});
};
export const signupView = async (req, res, next) => {
  res.render("sign-up", {error : null, user:req.user});
};
export const animalDetailView = async (req, res, next) => {
  const params = req.params.id;
  try {
    if (params) {
      const animal = await Animal.findById(params);
      res.render("admin/animal-detail", {error: null, data: animal, user:req.user});
    } else {
      res.render("admin/animal-detail", {error: null, data: null, user:req.user});
    }
  } catch (error) {
    console.error("Error fetching animal:", error);
    res.status(500).render("error", {
      errors: {
        title: "No Animal with this ID found",
        message: "Something went Wrong! Please Contact the Provider id the problem persists"
      }
    });
  }
};
export const animalsView = async (req, res, next) => {
  const animals = await Animal.find();
  res.render("admin/animal", {data: animals, formatDate: formatDate, user:req.user});
}
export const detailView = async (req, res, next) => {
  const params = req.params.id;
  try {
    if (params) {
      const animal = await Animal.findById(params);
      res.render("animal-details", {error: null, data: animal, user:req.user});
    } else {
      res.status(500).render("error", {
        errors: {
          title: "No Animal with this ID found",
          message: "Something went Wrong! Please Contact the Provider id the problem persists"
        }
      });
    }
  } catch (error) {
    console.error("Error fetching animal:", error);
    res.status(500).render("error", {
      errors: {
        title: "No Animal with this ID found",
        message: "Something went Wrong! Please Contact the Provider id the problem persists"
      }
    });
  }
};

export const doctorView = async (req, res, next)=>{
  const doctors = await Doctor.find();
  res.render("doctors", {doctors, error:null, user:req.user});
}

export const createdoctorView = async (req, res, next)=>{
  const doctorId = req.params.id;
  if(doctorId){
    let doctor = await Doctor.findById({
      _id:doctorId
    })
    res.render("admin/createDoctor", {data:doctor, error:null, user:req.user});
  }
  res.render("admin/createDoctor", {data:null, error:null, user:req.user});
}