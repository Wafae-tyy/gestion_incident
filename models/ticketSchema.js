const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const ticketSchema = new Schema({
  Technecien: String,
  Demandeur: String,
  Email: String,
  Téléphone: String,
  Titre: String,
  Lieu: String,
  Date: String,
  Statu : String,
  Etat: String,
  Priority : String,
  },
  { timestamps: true });

// Create a model based on that schema
const Incident = mongoose.model("ticket", ticketSchema);



// export the model
module.exports = Incident