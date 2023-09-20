import Animal from '../model/animalModel.js';
import Doctor from "../model/doctorModel.js";
import Ticket from '../model/ticketModel.js';
import { formatDbDate, formatDate } from '../utils/GeneralFunctions.js';

export const homeView = async (req, res, next) => {
  res.render("index", { user: req.user });
};
export const loginView = async (req, res, next) => {
  res.render("sign-in", { errors: [], user: req.user });
};
export const signupView = async (req, res, next) => {
  res.render("sign-up", { error: null, user: req.user });
};
export const animalDetailView = async (req, res, next) => {
  const params = req.params.id;
  try {
    if (params) {
      const animal = await Animal.findById(params);
      res.render("admin/animal-detail", { error: null, data: animal, user: req.user });
    } else {
      res.render("admin/animal-detail", { error: null, data: null, user: req.user });
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
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 10;
  try {
    const skip = (page - 1) * itemsPerPage;
    const animals = await Animal.find()
      .skip(skip)
      .limit(itemsPerPage);

    const totalAnimals = await Animal.countDocuments();
    const totalPages = Math.ceil(totalAnimals / itemsPerPage);

    res.render("admin/animal", {
      data: animals,
      formatDate,
      user: req.user,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    console.log(err)
    res.status(500).render("error", {
      errors: {
        title: "No Animal with this ID found",
        message: "Something went Wrong! Please Contact the Provider id the problem persists"
      }
    });
  }
};
export const detailView = async (req, res, next) => {
  const params = req.params.id;
  try {
    if (params) {
      const animal = await Animal.findById(params);
      res.render("animal-details", { error: null, data: animal, user: req.user });
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

export const doctorView = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 10;
  try {
    const skip = (page - 1) * itemsPerPage;
    const doctors = await Doctor.find()
      .skip(skip)
      .limit(itemsPerPage);

    const totalDoctors = await Doctor.countDocuments();
    const totalPages = Math.ceil(totalDoctors / itemsPerPage);

    res.render("admin/doctors", { doctors, error: null, user: req.user, currentPage: page, totalPages });
  } catch (err) {
    console.log(err)
    res.status(500).render("error", {
      errors: {
        title: "No Doctor with this ID found",
        message: "Something went Wrong! Please Contact the Provider id the problem persists"
      }
    });
  }
}

export const createdoctorView = async (req, res, next) => {
  const doctorId = req.params.id;
  if (doctorId) {
    let doctor = await Doctor.findById({
      _id: doctorId
    })
    res.render("admin/createDoctor", { data: doctor, error: null, user: req.user });
  }
  res.render("admin/createDoctor", { data: null, error: null, user: req.user });
}

export const createTicketsView = async (req, res, next) => {
  const ticketId = req.params.id;
  if (ticketId) {
    let tickets = await Ticket.findById({
      _id: ticketId
    })
    res.render("admin/createTicket", { tickets, error: null, user: req.user, formatDbDate });
  }
  res.render("admin/createTicket", { tickets: null, error: null, user: req.user, formatDbDate });
}

export const ticketsView = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 10;
  try {
    const skip = (page - 1) * itemsPerPage;
    const tickets = await Ticket.find()
      .skip(skip)
      .limit(itemsPerPage);

    const totalTickets = await Ticket.countDocuments();
    const totalPages = Math.ceil(totalTickets / itemsPerPage);

    res.render("admin/tickets", { tickets, error: null, user: req.user, currentPage: page, totalPages });
  } catch (err) {
    console.log(err)
    res.status(500).render("error", {
      errors: {
        title: "No Doctor with this ID found",
        message: "Something went Wrong! Please Contact the Provider id the problem persists"
      }
    });
  }
}

export const contactView = async (req, res, next) => {
  res.render("contact", { user: req.user });
}

export const faqView = async (req, res, next) => {
  res.render("faq", { user: req.user });
}
export const userAnimalView = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 10;
  try {
    const skip = (page - 1) * itemsPerPage;
    const animals = await Animal.find()
      .skip(skip)
      .limit(itemsPerPage);

    const totalAnimals = await Animal.countDocuments();
    const totalPages = Math.ceil(totalAnimals / itemsPerPage);

    res.render("animal", {
      data: animals,
      formatDate,
      user: req.user,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    console.log(err)
    res.status(500).render("error", {
      errors: {
        title: "No Animal with this ID found",
        message: "Something went Wrong! Please Contact the Provider id the problem persists"
      }
    });
  }
};

export const userDoctorList = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 10;
  try {
    const skip = (page - 1) * itemsPerPage;
    const doctors = await Doctor.find()
      .skip(skip)
      .limit(itemsPerPage);

    const totalDoctors = await Doctor.countDocuments();
    const totalPages = Math.ceil(totalDoctors / itemsPerPage);

    res.render("member", {
      data: doctors,
      formatDate,
      user: req.user,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    console.log(err)
    res.status(500).render("error", {
      errors: {
        title: "No doctors with this ID found",
        message: "Something went Wrong! Please Contact the Provider id the problem persists"
      }
    });
  }
};

export const userTicketView= async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 10;
  try {
    const skip = (page - 1) * itemsPerPage;
    const tickets = await Doctor.find()
      .skip(skip)
      .limit(itemsPerPage);

    const totalTickets = await Ticket.countDocuments();
    const totalPages = Math.ceil(totalTickets / itemsPerPage);

    res.render("tickets", {
      tickets,
      formatDate,
      user: req.user,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    console.log(err)
    res.status(500).render("error", {
      errors: {
        title: "No doctors with this ID found",
        message: "Something went Wrong! Please Contact the Provider id the problem persists"
      }
    });
  }
}