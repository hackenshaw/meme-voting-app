// server/index.js

// Import required libraries
const express = require('express'); // Web framework for Node.js
const mongoose = require('mongoose'); // MongoDB object modeling tool
const cors = require('cors'); // Middleware to allow cross-origin requests
const memeRoutes = require('./routes/memeRoutes'); // Import routes related to meme operations

// Initialize Express app
const app = express();
const PORT = 3000; // Define the port for the server

// Middleware
app.use(express.json()); // Parses incoming JSON requests and puts the parsed data in req.body
app.use(cors()); // Allows the server to handle requests from other origins

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/memeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB'); // Connection success message
})
.catch(err => console.error('MongoDB connection error:', err)); // Error handling

// Routes
app.use('/memes', memeRoutes); // All routes defined in memeRoutes will be prefixed with "/memes"

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); // Message on successful server start
});