// Mongoose imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//calendar shchema (events for the user and pets)
const noteSchema = new Schema(
  {
    title: { type: String, required: [true, "El título es necesario"] },
    description: {
      type: String,
      required: [true, "La descripción es necesaria"],
    },
    favorite: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
