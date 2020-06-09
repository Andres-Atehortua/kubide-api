// Model import
const { NoteModel } = require("./../models");

class NoteController {
  // Obtener todas las notas
  async getAll(req, res) {
    try {
      const allNotes = await NoteModel.find();
      return res.status(200).json({ ok: true, allNotes });
    } catch (error) {
      return res.status(500).json({ ok: false, error });
    }
  }

  // Crear una nota
  async createNote(req, res) {
    let { title, description } = req.body;

    try {
      const createdNote = await NoteModel.create({ title, description });
      res.status(201).json({ ok: true, createdNote });
    } catch (error) {
      res
        .status(500)
        .json({ ok: false, error, message: "No se ha podido crear la nota" });
    }
  }

  // Obtener una nota por id
  async getOneNote(req, res) {
    let { id } = req.params;

    try {
      const note = await NoteModel.findById(id);
      note
        ? res.json({ ok: true, note })
        : res.status(404).json({
            ok: false,
            message: "El id no corresponde a ninguna nota",
          });
    } catch (error) {
      res.status(500).json({
        ok: false,
        error,
        message: "No se ha podido encontrar la nota. Inténtelo de nuevo",
      });
    }
  }

  // Marcar una nota como favorita
  async setAsFavorite(req, res) {
    let { id } = req.params;
    try {
      const note = await NoteModel.findByIdAndUpdate(
        id,
        { favorite: true },
        { new: true }
      );
      note
        ? res.json({ ok: true, note })
        : res.status(404).json({
            ok: false,
            message: "El id no corresponde a ninguna nota",
          });
    } catch (error) {
      res.status(500).json({
        ok: false,
        error,
        message: "No se ha podido completar el proceso. Inténtelo de nuevo",
      });
    }
  }

  // Obtener todas las notas favoritas
  async getAllFavorites(req, res) {
    try {
      const allFavorites = await NoteModel.find({ favorite: true });
      res.json({ ok: true, allFavorites });
    } catch (error) {
      res.status(500).json({
        ok: false,
        error,
        message:
          "No se ha podido realizar la búsqueda. Porfavor inténtelo de nuevo",
      });
    }
  }
}

module.exports = new NoteController();
