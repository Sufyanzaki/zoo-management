export const homeView = async (req, res, next) => {
  res.render("index");
};

export const loginView = async (req, res, next) => {
  res.render("sign-in");
};

export const signupView = async (req, res, next) => {
  res.render("sign-up");
};
