const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const sendVerificationEmail = require("../Utils/sendEmail");

// Register Customer
exports.registerCustomer = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ success: false, msg: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new customer user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: "Customer",
        });

        // Save the user in the database
        await newUser.save(); // Using async/await instead of callback
        sendVerificationEmail(newUser);
        res.status(201).json({ success: true, msg: "Customer registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error during registration" });
    }
};

// Register Admin
exports.registerAdmin = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ success: false, msg: "All fields are required" });
        }

        // Check if admin already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: "Admin",
        });

        // Save the user in the database
        await newUser.save(); // Using async/await instead of callback
        sendVerificationEmail(newUser);
        res.status(201).json({ success: true, msg: "Admin registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error during registration" });
    }
};


exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ success: false, msg: "All fields are required" });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        // Ensure the user has the 'Admin' role
        if (user.role !== "Admin") {
            return res.status(403).json({ msg: "Access denied. You are not allowed to login from here Or Only Admins can log in." });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1h" });

        // Set JWT token in a cookie (Optional)
        res.cookie('token', token, { 
            httpOnly: true,  // Ensures the cookie can't be accessed via JavaScript
            secure: process.env.NODE_ENV === 'production',  // Set to true for production, use https
            maxAge: 3600000  // Set cookie expiry (1 hour here, matches token expiry)
        });

        res.status(200).json({ success: true, msg: "Login successful", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error during login" });
    }
};
