const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const authenticateToken = require("../middlewares/auth-middleware");
const authorizeAdmin = require("../middlewares/admin-middleware");

router.get("/users", authenticateToken, authorizeAdmin, adminController.getAllVoters);

module.exports = router;
