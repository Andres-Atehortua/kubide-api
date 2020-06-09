class HomeController {
  index = (req, res) => {
    res.json({ ok: true, message: "Bienvenido" });
  };
}

module.exports = new HomeController();
