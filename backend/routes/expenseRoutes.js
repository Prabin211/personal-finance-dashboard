const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  addExpense,
  getExpenses,
  getCategoryTotals,
  getDashboardSummary,
  getMonthlyTrend,
  deleteExpense,
  updateExpense,
  getMonthlyAnalysis,
  getYearlyAnalysis,
  getHighestCategory,
  importExpenses,
} = require("../controllers/expenseController");

router.post("/", addExpense);
router.get("/", getExpenses);
router.get("/category-totals", getCategoryTotals);
router.get("/summary", getDashboardSummary);
router.get("/monthly-trend", getMonthlyTrend);
router.delete("/:id", deleteExpense);
router.put("/:id", updateExpense);
router.get(
  "/monthly-analysis",
  getMonthlyAnalysis
);
router.get(
  "/yearly-analysis",
  getYearlyAnalysis
);
router.get(
  "/highest-category",
  getHighestCategory
);
router.post(
  "/import",
  upload.single("file"),
  importExpenses
);
module.exports = router;