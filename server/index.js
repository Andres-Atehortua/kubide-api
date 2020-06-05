// Habilitar la configuracion de dotenv
require("dotenv").config();

const http = require("http");

let app = require("./../app");
app.disable("x-powered-by");

// catch 404 and render a not-found.hbs template
app.use((req, res, next) => {
  res.status(404).json({ ok: false, message: "No se ha encontrado la ruta." });
});

app.use((err, req, res) => {
  // always log the error
  console.error("ERROR", req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).json({
      ok: false,
      message:
        "Ha ocurrido un error en el servidor. Porfavor, inténtelo más tarde",
    });
  }
});

let server = http.createServer(app);

server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  // hManejar errores específicos con mensajes amistosos.
  switch (error.code) {
    case "EACCES":
      console.error(`Port ${process.env.PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`Port ${process.env.PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});
