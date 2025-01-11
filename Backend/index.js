// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config(); // For loading environment variables

// Initialize the express app
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cookieParser()); // Parse cookies
app.use(bodyParser.json()); // Parse JSON payloads (alternative to express.json())
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded payloads (alternative to express.urlencoded())

// PORT setup
const PORT = process.env.PORT || 4000;

// Routes
const route = require("./Routes/authRoutes");
app.use('/api/v1/', route);

// DB Connection
require('./Config/dbConnect').dbConnects()

// Test Route for Server Status
app.get('/', (req, res) => {
    res.send(`<h1> THIS IS HOME PAGE... </h1>`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening at PORT NO: ${PORT}`);
});
