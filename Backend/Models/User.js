const mongoose = require('mongoose');

// Define a schema for the User model
const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        maxLength:50,
        trim: true,
    },
    lastName: {
        type:String,
        required:true,
        maxLength:50,
        trim: true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
        maxLength:50,
        trim: true, // Removes unnecessary whitespaces
        lowercase: true // Ensures case-insensitivity
    },
    password: {
        type:String,
        required:true,
        maxLength:500
    },
    role: {
        type: String,
        enum: ['Admin', 'Customer'], // Roles can either be 'Admin' or 'Customer'
        default: 'Customer', // Default role is 'Customer'
    },
}, 

{ timestamps: true }); // Automatically add createdAt and updatedAt fields

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
