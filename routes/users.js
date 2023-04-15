const usersRouter = require('express').Router();
const {
  addUser,
  getLastUser,
  loadUsers,
  checkEmail,
  checkPassword,
} = require("../utils/users");
const { body, validationResult } = require("express-validator");

usersRouter.get("/", (req, res) => {
  res.render("index");
});

usersRouter.get("/api/v1/users", (req, res) => {
  const data = loadUsers();

  const users = data.map((user) => {
    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
    };
  });

  res.json(users);
});

usersRouter.get("/games/rockpaperscissors", (req, res) => {
  res.render("games");
});

usersRouter.get("/api/v1/users/login", (req, res) => {
  res.render("login");
});

usersRouter.post(
  "/api/v1/users/login",
  [
    body("email").custom((value) => {
      const email = checkEmail(value);
      if (!email) {
        throw new Error("Email or Password does not match!");
      }
      return true;
    }),
    body("password").custom((value) => {
      const password = checkPassword(value);
      if (!password) {
        throw new Error("Please enter a valid account");
      }
      return true;
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("login", { errors: errors.array() });
    } else {
      res.redirect("/");
    }
  }
);

usersRouter.get("/api/v1/users/signup", (req, res) => {
  res.render("signup");
});

usersRouter.post(
  "/api/v1/users/signup",
  [
    body("email").custom((value) => {
      const duplikat = checkEmail(value);
      if (duplikat) {
        throw new Error("Email already exists!");
      }
      return true;
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("signup", { errors: errors.array() });
    } else {
      addUser(req.body);
      const user = getLastUser();
      res.render("greet", { user });
    }
  }
);

module.exports = usersRouter;