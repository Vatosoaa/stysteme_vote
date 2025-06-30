const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
   {
      fullName: {
         type: String,
         required: [true, "Le nom complet du candidat est obligatoire"],
         trim: true,
      },
      age: {
         type: Number,
         required: [true, "L'âge est obligatoire"],
         min: [18, "Le candidat doit avoir au moins 18 ans."],
      },
      image: {
         type: String,
         required: false,
         default: process.env.IMAGES_BASE_URL ? `${process.env.IMAGES_BASE_URL}/default-candidate.png` : 'no-image.png',
      },
      description: {
         type: String,
         required: false,
         trim: true,
      },
      slogan: {
         type: String,
         required: false,
         trim: true,
      },
      party: {
         type: String,
         required: false,
         trim: true,
         default: "Indépendant",
      },
      votes: {
         type: Number,
         default: 0,
      },
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model("Candidate", candidateSchema);