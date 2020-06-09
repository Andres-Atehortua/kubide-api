// Router
const router = require("express").Router();

// Controller
const { NoteController } = require("./../controllers");
const {
  createNote,
  getAll,
  getOneNote,
  setAsFavorite,
  getAllFavorites,
} = NoteController;

// Get all notes
router.get("/notes", getAll);

// Create note
router.post("/notes", createNote);

// Get note by id
router.get("/notes/:id", getOneNote);

// Set note as favorite
router.put("/favorites/:id", setAsFavorite);

// Get all favorites
router.get("/favorites", getAllFavorites);

module.exports = router;
