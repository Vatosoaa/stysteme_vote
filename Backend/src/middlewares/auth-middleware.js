// @ts-nocheck

const jwt = require("jsonwebtoken");

const authController = require("../controllers/auth-controller");

const Voter = require("../models/voters-model");



const authenticateToken = async (req, res, next) => {

   const authHeader = req.headers["authorization"];

   const token = authHeader && authHeader.split(" ")[1];



   if (token == null) {

      return res.sendStatus(401); // Non autorisé si pas de token

   }



// Vérifier si le token est dans la blacklist

   if (authController.isBlacklisted(token)) {

      return res

          .status(401)

          .json({ message: "Token révoqué. Veuillez vous reconnecter." });

   }



   jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {

      if (err) {

         return res.sendStatus(403); // Token invalide

      }



      try {

         const voter = await Voter.findById(user.id);

         if (!voter) {

            return res.sendStatus(403); // Utilisateur non trouvé (peut-être supprimé)

         }

         req.voter = voter; // Ajouter l'utilisateur à l'objet requête

         next();

      } catch (error) {

         return res.sendStatus(500); // Erreur lors de la récupération de l'utilisateur

      }

   });

};



module.exports = authenticateToken;