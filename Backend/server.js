const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db/index");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Server running ✅"));

// Example route: test DB connection
app.get("/dbtest", async (req, res) => {
  const result = await db.query("SELECT NOW()");
  res.json(result.rows);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

