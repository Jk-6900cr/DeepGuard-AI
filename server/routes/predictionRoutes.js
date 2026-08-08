const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getDashboardStats,
  getPredictionHistory,
} = require("../controllers/predictionController");

const router = express.Router();

router.get("/dashboard", authMiddleware, getDashboardStats);
router.get("/history", authMiddleware, getPredictionHistory);

module.exports = router;