const authorizeAdmin = (req, res, next) => {
    if (req.voter && req.voter.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: "Accès refusé, seul les administrateurs sont autorisés." });
    }
};

module.exports = authorizeAdmin;
