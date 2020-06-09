// Express require
const express = require("express");
let app = express();
// Mongoose config
require("./configs/mongoose.config");
// Body parser config
require("./configs/middleware.config")(app);

// Routes
require("./routes")(app);

module.exports = app;
