// @ts-nocheck
const jwt = require("jsonwebtoken");
const Voter = require("../models/voters-model");
const { isBlacklisted } = require("../controllers/auth-controller");

const authMiddleware = async (req, res, next) => {
   try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
         return res.status(401).json({ message: "Accès refusé. Jeton manquant." });
      }

      if (isBlacklisted(token)) {
         return res.status(401).json({ message: "Authentification échouée. Jeton invalide (déconnecté)." });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const voter = await Voter.findById(decoded.id).select('-password');

      if (!voter) {
         return res.status(403).json({ message: "Authentification échouée. Utilisateur non trouvé ou compte supprimé." });
      }

      req.voter = voter; 

      next();
   } catch (error) {
      console.error("Erreur d'authentification du jeton:", error.message);
      res.status(401).json({ message: "Authentification échouée. Jeton non valide ou expiré.", error: error.message });
   }
};

module.exports = authMiddleware;