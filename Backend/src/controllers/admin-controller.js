const Voter = require("../models/voters-model");

exports.getAllVoters = async (req, res) => {
    try {
        // Récupère tous les votants sauf leur mot de passe par sécurité
        const voters = await Voter.find({}).select("-password");
        res.status(200).json(voters);
    } catch (error) {
        console.error("Erreur lors de la récupération de tous les votants:", error);
        res.status(500).json({
            message: "Erreur lors de la récupération des votants",
            error: error.message,
        });
    }
};

// On peut ajoute d'autres fonctions admin ici, comme :
// exports.deleteVoter = async (req, res) => { ... };
// exports.updateVoterRole = async (req, res) => { ... };
// exports.getDashboardStats = async (req, res) => { ... };
