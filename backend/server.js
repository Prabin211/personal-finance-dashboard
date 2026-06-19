require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const app = express();
const expenseRoutes = require("./routes/expenseRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/expenses", expenseRoutes);

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Backend Running",
      databaseTime: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});