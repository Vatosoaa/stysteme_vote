// @ts-nocheck
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/database");
const path = require('path');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const imagesUploadDir = path.join(__dirname, process.env.UPLOAD_IMAGE_DIR);

app.use(process.env.IMAGES_BASE_URL, express.static(imagesUploadDir));

app.get("/", (req, res) => {
   res.send("Bienvenue sur l'API de gestion de Vote Miss ! 🗳️");
});

const adminRoutes = require("./src/routes/admin-routes");
const candidateRoutes = require("./src/routes/candidate-routes");
const authRoutes = require("./src/routes/auth-routes");

app.use("/api/admin", adminRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
   console.log(`🚀 Serveur démarré et à l'écoute sur le port ${PORT}`);
});