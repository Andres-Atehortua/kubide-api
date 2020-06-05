//Express imports
const express = require("express");
const router = express.Router();
// Model import
const { NoteModel } = require("./../models");

// Get all notes
router.get("/notes", async (req, res) => {
  try {
    const allNotes = await NoteModel.find();
    res.status(200).json({ ok: true, allNotes });
  } catch (error) {
    error && res.json({ ok: false, error });
  }
});

// Create note
router.post("/notes", async (req, res) => {
  let { title, description } = req.body;

  try {
    const createdNote = await NoteModel.create({ title, description });
    res.status(201).json({ ok: true, createdNote });
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, error, message: "No se ha podido crear la nota" });
  }
});

// Get note by id
router.get("/notes/:id", async (req, res) => {
  let { id } = req.params;

  try {
    const note = await NoteModel.findById(id);
    note
      ? res.json({ ok: true, note })
      : res
          .status(404)
          .json({ ok: false, message: "El id no corresponde a ninguna nota" });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
      message: "No se ha podido encontrar la nota. Inténtelo de nuevo",
    });
  }
});

// Set note as favorite

router.put("/favorites/:id", async (req, res) => {
  let { id } = req.params;
  try {
    const note = await NoteModel.findByIdAndUpdate(
      id,
      { favorite: true },
      { new: true }
    );
    note
      ? res.json({ ok: true, note })
      : res
          .status(404)
          .json({ ok: false, message: "El id no corresponde a ninguna nota" });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
      message: "No se ha podido completar el proceso. Inténtelo de nuevo",
    });
  }
});

// Get all favorites

router.get("/favorites", async (req, res) => {
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
});

module.exports = router;
