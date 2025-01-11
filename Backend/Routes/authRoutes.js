const express = require('express');
const { auth, isAdmin, isCustomer } = require('../Middlewares/authMiddleware');
const { registerCustomer, registerAdmin, loginAdmin } = require('../Controllers/userRegistrationLoginController');

const router = express.Router();

// Register routes
router.post('/register/customer', registerCustomer);
router.post('/register/admin', registerAdmin);

// Admin login
router.post('/login/admin', loginAdmin);

// Admin-only protected route
router.get('/admin/dashboard', auth, isAdmin, (req, res) => {
    res.send('Welcome to the Admin Dashboard');
});

module.exports = router;
