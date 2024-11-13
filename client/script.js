const server = 'http://127.0.0.1:3000';

// Function to load memes from the server and display them on the page
async function loadMemes() {
    const res = await fetch(`${server}/memes`); // GET request to server
    const memes = await res.json(); // Parse JSON response

    // Map over memes to create styled meme cards
    document.getElementById('memes').innerHTML = memes.map(meme => `
        <div class="meme-card">
            <h3>${meme.title}</h3> <!-- Meme title -->
            <img src="${meme.imageUrl}" alt="${meme.title}"> <!-- Meme image -->
            <p>Votes: ${meme.votes}</p> <!-- Current vote count -->

            <!-- Upvote and Downvote buttons -->
            <button onclick="vote('${meme._id}', 'upvote')">Upvote</button>
            <button class="downvote" onclick="vote('${meme._id}', 'downvote')">Downvote</button>
        </div>
    `).join(''); // Join each mapped meme HTML to form a continuous string for innerHTML
}

// Function to handle voting on a meme by sending a PUT request to the server
async function vote(id, action) {
    await fetch(`${server}/memes/${id}/vote?action=${action}`, { method: 'PUT' }); // PUT request for voting
    loadMemes(); // Reload memes after voting
}

// Event listener for meme submission form
document.getElementById('memeForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    
    // Get values from the form input fields
    const title = document.getElementById('title').value;
    const imageUrl = document.getElementById('imageUrl').value;

    // Send POST request to add a new meme
    await fetch(`${server}/memes`, {
        method: 'POST', // HTTP method for creating a new meme
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, imageUrl }) // Meme data
    });

    // Clear form fields after submission
    document.getElementById('title').value = '';
    document.getElementById('imageUrl').value = '';

    // Reload memes to include the new meme
    loadMemes();
});

// Initial load of memes when the page loads
loadMemes();