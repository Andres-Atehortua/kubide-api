// Habilitar la configuracion de dotenv
require("dotenv").config();

const http = require("http");

let app = require("./../app");
app.disable("x-powered-by");

// Error 404 y enviar json del error
app.use((req, res) => {
  res.status(404).json({ ok: false, message: "No se ha encontrado la ruta." });
});

app.use((err, req, res) => {
  // Mostrar siempre el error
  console.error("ERROR", req.method, req.path, err);

  // Solo enviar json si el error ocure antes de enviar la respuesta
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

  // Manejar errores específicos con mensajes amistosos.
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
