module.exports = (app) => {
  app.use(require("./home.routes"));
  app.use(require("./note.routes"));
};
