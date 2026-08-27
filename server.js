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
app.post("/users", (req, res) => {
    const { name, email, age } = req.body;

    const sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";

    db.query(sql, [name, email, age], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(201).json({
            message: "User created successfully",
            id: result.insertId
        });
    });
});
app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(results);
    });
});
app.put("/users/:id", (req, res) => {
    const { name, email, age } = req.body;
    const { id } = req.params;

    const sql = `
        UPDATE users
        SET name = ?, email = ?, age = ?
        WHERE id = ?
    `;

    db.query(sql, [name, email, age, id], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json({
            message: "User updated successfully"
        });
    });
});
app.put("/users/:id", (req, res) => {
    const { name, email, age } = req.body;
    const { id } = req.params;

    const sql = `
        UPDATE users
        SET name = ?, email = ?, age = ?
        WHERE id = ?
    `;

    db.query(sql, [name, email, age, id], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json({
            message: "User updated successfully"
        });
    });
});
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});