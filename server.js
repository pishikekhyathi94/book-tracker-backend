const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync(); // creates the tables

app.get("/", (req, res) => res.json({ message: "Welcome to the API." }));

require("./app/routes/tutorial.routes")(app); // FIX TYPO here

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
