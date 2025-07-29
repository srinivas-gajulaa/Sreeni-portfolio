// File: /api/github.js

export default async function handler(request, response) {
  const username = 'srinivas-gajulaa';
  const token = process.env.GITHUB_PAT;

  try {
    const githubResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!githubResponse.ok) {
      const errorBody = await githubResponse.json();
      // Pass the specific error from GitHub forward
      throw new Error(errorBody.message || `GitHub API responded with ${githubResponse.status}`);
    }

    const data = await githubResponse.json();
    response.status(200).json(data);

  } catch (error) {
    console.error(error); // For server logs
    // IMPORTANT: Send the specific error message back to the frontend
    response.status(500).json({ errorMessage: error.message });
  }
}