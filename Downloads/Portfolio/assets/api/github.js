// File: /api/github.js

// This is the final production code
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
      const errorBody = await githubResponse.json();
      throw new Error(errorBody.message || `GitHub API responded with ${githubResponse.status}`);
    }

    const data = await githubResponse.json();

    // Send the project data (which is an array) back to your frontend script
    response.status(200).json(data);

  } catch (error) {
    console.error(error); // For server logs
    response.status(500).json({ errorMessage: error.message });
  }
}