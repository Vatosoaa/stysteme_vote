const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/database");

// --- CONFIGURATION INITIALE ---
// Charge les variables d'environnement du fichier .env
dotenv.config();

// Lance la connexion à la base de données MongoDB
connectDB();

// Crée une instance de l'application Express
const app = express();

// --- MIDDLEWARES ---
// Le middlewares 'cors' permet d'autoriser les requêtes venant d'autres origines (ex: ton front-end Angular)
app.use(cors());

// Ce middlewares permet à Express de comprendre le JSON envoyé dans les corps de requête (pour les POST, PUT, etc.)
app.use(express.json());

// Ce middlewares permet de lire les données envoyées par un formulaire HTML simple
app.use(express.urlencoded({ extended: false }));

// --- ROUTES ---
// Une route de test simple pour vérifier que le serveur fonctionne bien
app.get("/", (req, res) => {
   res.send("Bienvenue sur l'API de gestion de Candidate ! 🗳️");
});

const adminRoutes = require("./src/routes/admin-routes");
const candidateRoutes = require("./src/routes/candidate-routes");
const authRoutes = require("./src/routes/auth-routes");
const authenticateToken = require("./src/middlewares/auth-middleware");

app.use("/api/admin", adminRoutes);
app.use("/api/candidates", authenticateToken, candidateRoutes);
app.use("/api/auth", authRoutes);

// --- DÉMARRAGE DU SERVEUR ---
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
   console.log(`🚀 Serveur démarré et à l'écoute sur le port ${PORT}`);
});
