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
const authMiddleware = require("../middlewares/auth-middleware");

const upload = require("../config/multer-config");

router.post(
   "/",
   authMiddleware,
   authorizeAdmin,
   upload.single("image"),
   createCandidate
);

router.get("/", getAllCandidates);
router.get("/:id", getCandidateById);

router.put(
   "/:id",
   authMiddleware,
   authorizeAdmin,
   upload.single("image"),
   updateCandidate
);

router.delete("/:id", authMiddleware, authorizeAdmin, deleteCandidate);
router.patch("/:id/vote", authMiddleware, addVoteToCandidate);

module.exports = router;