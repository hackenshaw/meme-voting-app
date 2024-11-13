// server/routes/memeRoutes.js

const express = require('express'); // Import Express
const Meme = require('../models/Meme'); // Import the Meme model

const router = express.Router(); // Create a new router

// Route to create a new meme
router.post('/', async (req, res) => {
    try {
        // Create a new meme document using data from request body
        const meme = new Meme(req.body);
        await meme.save(); // Save meme to database
        res.status(201).json(meme); // Send saved meme as response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Error handling
    }
});

// Route to retrieve all memes, sorted by vote count in descending order
router.get('/', async (req, res) => {
    try {
        // Find all memes and sort by vote count (highest first)
        const memes = await Meme.find().sort({ votes: -1 });
        res.json(memes); // Send sorted memes as response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Error handling
    }
});

// Route to upvote or downvote a meme by ID
router.put('/:id/vote', async (req, res) => {
    try {
        const { action } = req.query; // Extract action parameter from query (upvote/downvote)
        const meme = await Meme.findById(req.params.id); // Find meme by ID

        if (!meme) {
            return res.status(404).json({ message: 'Meme not found' }); // If meme doesn't exist
        }

        // Update votes based on action
        if (action === 'upvote') meme.votes += 1;
        else if (action === 'downvote') meme.votes -= 1;

        await meme.save(); // Save updated meme to database
        res.json(meme); // Send updated meme as response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Error handling
    }
});

// Route to get a random meme
router.get('/random', async (req, res) => {
    try {
        // Use MongoDB's aggregation framework to get a random document
        const memes = await Meme.aggregate([{ $sample: { size: 1 } }]);
        res.json(memes[0]); // Send random meme as response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Error handling
    }
});

module.exports = router; // Export the router to be used in index.js