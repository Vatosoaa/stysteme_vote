const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema(
   {
      email: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         trim: true,
      },
      password: {
         type: String,
         required: true,
         minlength: 6,
      },
      firstName: {
         type: String,
         required: true,
         trim: true,
      },
      lastName: {
         type: String,
         required: true,
         trim: true,
      },
      dateOfBirth: {
         type: Date,
         required: true,
      },
      gender: {
         type: String,
         enum: ["male", "female", "other"], // Optionnel, selon le contexte
         required: true,
      },
      country: {
         type: String,
         required: true,
         trim: true,
      },
      city: {
         type: String,
         required: true,
         trim: true,
      },
      address: {
         type: String,
         trim: true,
      },
      phone: {
         type: String,
         trim: true,
      },
       isAdmin: {
           type: Boolean,
           default: false,
       },
      hasVoted: {
         type: Boolean,
         default: false, // Pour suivre si le votant a déjà voté (important pour le scrutin)
      },
      dateLastVoted: {
         type: Date, // Enregistrer la date du dernier Candidate
      },
      profilePicture: {
         type: String,
         trim: true,
      },
   },
   { timestamps: true }
);

const Voter = mongoose.model("Voter", voterSchema);

module.exports = Voter;
