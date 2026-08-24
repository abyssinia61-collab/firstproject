const express = require("express");

const app = express();
const PORT = 3000;

// Allow the server to receive JSON data
app.use(express.json());

// Temporary user data
let users = [{
    id: 1,
    name: "Abyssinia",
    email: "abyssinia@example.com"
}];

// GET endpoint
app.get("/api/users", (req, res) => {
    res.json({
        success: true,
        users: users
    });
});

// POST endpoint
app.post("/api/users", (req, res) => {
    const { name, email } = req.body;

    // Basic validation
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required"
        });
    }

    // Create a new user
    const newUser = {
        id: users.length + 1,
        name: name,
        email: email
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        message: "User created successfully",
        user: newUser
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});