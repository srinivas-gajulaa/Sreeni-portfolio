// File: /api/github.js

// This is a Node.js serverless function
export default async function handler(request, response) {
  const username = 'srinivas-gajulaa'; // Your GitHub username
  const token = process.env.GITHUB_PAT; // Access the token securely from Vercel

  try {
    // Fetch repositories from GitHub API, sorted by last updated
    const githubResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`, {
      headers: {
        // Use the token for authentication
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    // Handle any errors from the GitHub API
    if (!githubResponse.ok) {
      // This will now provide a more specific error if the token is bad
      const errorBody = await githubResponse.text();
      throw new Error(`GitHub API responded with ${githubResponse.status}: ${errorBody}`);
    }

    const data = await githubResponse.json();
    
    // Send the clean data back to your frontend script
    response.status(200).json(data);

  } catch (error) {
    console.error(error);
    // Send an error response back to the frontend
    response.status(500).json({ message: 'Error fetching data from GitHub API' });
  }
}