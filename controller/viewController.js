export const homeView = async (req, res, next) => {
  res.render("index");
};

export const loginView = async (req, res, next) => {
  res.render("sign-in", {errors : []});
};

export const signupView = async (req, res, next) => {
  res.render("sign-up", {error : null});
};

export const animalDetailView = async (req, res, next)=>{
  res.render("animal-detail", {error : null});
} 
