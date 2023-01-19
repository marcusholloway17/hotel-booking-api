require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const credentials = require("./middleware/credentials");
const PORT = process.env.PORT || 3000;
// const { adminAuthenticate } = require("./middleware/authenticate")
const info = {
  title: "HOTEL BOOKING",
  description: "Api for hotel booking app",
};

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// set view engine
app.set("view engine", "ejs");
app.set("views", "views");

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(
    "/public/",
    express.static(path.join(__dirname, "/public"))
  );

// routes
app.get("/", (req, res) => {
  res.render("index.ejs", { info });
});
app.use("/api", require("./routes/api"))
// app.use("/auth", require("./routes/v1/auth"));
// app.use("/api/v1/admin", adminAuthenticate, require("./routes/v1/admin"));

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));