const pool = require("../config/db");
const XLSX = require("xlsx");
const fs = require("fs");

const addExpense = async (req, res) => {
  try {
    const {
      amount,
      category,
      month,
      year,
    } = req.body;

    if (!amount || !category || !month || !year) {
      return res.status(400).json({
        message:
          "Amount, category, month and year are required",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO expenses
      (amount, category, month, year)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        amount,
        category,
        month,
        year,
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

const getExpenses = async (req, res) => {
  try {

    const { month, year } = req.query;

    let query = `
      SELECT *
      FROM expenses
    `;

    const values = [];

    if (month && year) {
      query += `
        WHERE month = $1
        AND year = $2
      `;

      values.push(month, year);
    }

    query += `
      ORDER BY id DESC
    `;

    const result = await pool.query(
      query,
      values
    );

    res.status(200).json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

const getCategoryTotals = async (req, res) => {
  try {

    const result = await pool.query(
      `
      SELECT
        category,
        SUM(amount) AS total
      FROM expenses
      GROUP BY category
      ORDER BY SUM(amount) DESC
      `
    );

    res.status(200).json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

const getDashboardSummary = async (req, res) => {
  try {

    const { month, year } = req.query;

    const result = await pool.query(
      `
      SELECT
        COUNT(*) AS total_entries,
        COALESCE(SUM(amount),0) AS total_expense
      FROM expenses
      WHERE month = $1
      AND year = $2
      `,
      [month, year]
    );

    res.json(result.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

const getMonthlyTrend = async (req, res) => {
  try {

    const result = await pool.query(
      `
      SELECT
        month,
        year,
        SUM(amount) AS total
      FROM expenses
      GROUP BY month, year
      ORDER BY year, month
      `
    );

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

const deleteExpense = async (req, res) => {
  try {

    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM expenses
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.json({
      message: "Expense deleted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }
};

const updateExpense = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      amount,
      category,
      month,
      year
    } = req.body;

    const result = await pool.query(
      `
      UPDATE expenses
      SET
        amount = $1,
        category = $2,
        month = $3,
        year = $4
      WHERE id = $5
      RETURNING *
      `,
      [
        amount,
        category,
        month,
        year,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.json(result.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }
};

const getMonthlyAnalysis = async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT
        month,
        year,
        SUM(amount) AS total
      FROM expenses
      GROUP BY month, year
      ORDER BY year, month
    `);

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }
};

const getYearlyAnalysis = async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT
        year,
        SUM(amount) AS total
      FROM expenses
      GROUP BY year
      ORDER BY year
    `);

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }
};

const getHighestCategory = async (req, res) => {
  try {

    const month = Number(req.query.month);
    const year = Number(req.query.year);

    const result = await pool.query(
      `
      SELECT
        category,
        SUM(amount) AS total
      FROM expenses
      WHERE month = $1
      AND year = $2
      GROUP BY category
      ORDER BY total DESC
      LIMIT 1
      `,
      [month, year]
    );

    res.json(
      result.rows[0] || {}
    );

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }
};

const importExpenses = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const workbook = XLSX.readFile(
      req.file.path
    );

    const sheetName =
      workbook.SheetNames[0];

    const sheet =
      workbook.Sheets[sheetName];

    const data =
      XLSX.utils.sheet_to_json(sheet);

    let insertedCount = 0;

    for (const row of data) {

      await pool.query(
        `
        INSERT INTO expenses
        (category, amount, month, year)
        VALUES ($1, $2, $3, $4)
        `,
        [
          row.category,
          row.amount,
          row.month,
          row.year,
        ]
      );

      insertedCount++;
    }

    fs.unlinkSync(req.file.path);

    res.json({
      message: "Import successful",
      insertedRows: insertedCount,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
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
  importExpenses
};