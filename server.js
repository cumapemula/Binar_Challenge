const express = require("express");
const app = express();
const port = 3000;
const usersRouter = require("./routes/users");
const morgan = require("morgan");

// Built-in Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Third Party Middleware
app.use(morgan("dev"));

// Use EJS
app.set("view engine", "ejs");

// Routing
app.use(usersRouter);

// Internal Server Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    status: "fail",
    errors: err.message,
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render("pagenotfound");
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
