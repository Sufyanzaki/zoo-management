import Animal from '../model/animalModel.js';
export const homeView = async (req, res, next) => {
  res.render("index");
};

export const loginView = async (req, res, next) => {
  res.render("sign-in", {errors : []});
};

export const signupView = async (req, res, next) => {
  res.render("sign-up", {error : null});
};

export const animalDetailView = async (req, res, next) => {
  const params = req.params.id;
  try {
    if (params) {
      const animal = await Animal.findById(params);
      res.render("admin/animal-detail", { error: null, data: animal });
    } else {
      res.render("admin/animal-detail", { error: null , data: null});
    }
  } catch (error) {
    console.error("Error fetching animal:", error);
    res.status(500).render("error-page", { error: "Internal Server Error" });
  }
};


export const animalsView = async (req, res, next)=>{
  res.render("admin/animal");
}