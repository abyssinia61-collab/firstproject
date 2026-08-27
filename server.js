const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "simple_backend"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }

    console.log("Connected to MySQL!");
});

app.get("/", (req, res) => {
    res.send("Backend is working!");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});