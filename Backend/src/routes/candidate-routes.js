const express = require("express");
const router = express.Router();
const {
   createCandidate,
   getAllCandidates,
   getCandidateById,
   updateCandidate,
   deleteCandidate,
   addVoteToCandidate,
} = require("../controllers/candidate-controller");
const authorizeAdmin = require("../middlewares/admin-middleware");

// POST /api/candidates - Crée un nouveau candidat
router.post("/",authorizeAdmin, createCandidate);
router.get("/", getAllCandidates);
router.get("/:id", getCandidateById);
router.put("/:id",authorizeAdmin, updateCandidate);
router.delete("/:id",authorizeAdmin, deleteCandidate);
router.patch("/:id/vote", addVoteToCandidate);

module.exports = router;
