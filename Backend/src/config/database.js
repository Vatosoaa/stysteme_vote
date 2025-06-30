// @ts-nocheck
const mongoose = require("mongoose");

const connectDB = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
   } catch (error) {
      console.error(
         `Erreur de connexion à la base de données: ${error.message}`
      );
      process.exit(1);
   }
};

module.exports = connectDB;