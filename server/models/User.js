// server/models/Meme.js

const mongoose = require('mongoose'); // Import Mongoose library

// Define the Meme schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Meme title, required field
    email: { type: String, required: true }, // URL of the meme image, required field
    pasword: { type: String, default: 0 } // Vote count for the meme, defaults to 0
});

// Export the Meme model based on the schema
module.exports = mongoose.model('Meme', memeSchema);