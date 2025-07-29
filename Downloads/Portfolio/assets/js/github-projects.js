// assets/js/github-projects.js

document.addEventListener('DOMContentLoaded', () => {
  // --- CONFIGURATION ---
  const projectsContainer = document.getElementById('github-projects-container');

  // This is the URL to your Vercel Serverless Function (we will create this in the next step)
  const apiUrl = '/api/github'; 
  
  // --- FETCHING AND DISPLAYING PROJECTS ---
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(repos => {
      // Clear the 'Loading...' message
      projectsContainer.innerHTML = ''; 

      // OPTIONAL: Filter out specific repositories you don't want to show
      const reposToExclude = new Set(['srinivas-gajulaa']); // Add any repo names to exclude here
      const filteredRepos = repos.filter(repo => !reposToExclude.has(repo.name));

      // Re-create the box-container to hold the cards
      const boxContainer = document.createElement('div');
      boxContainer.className = 'box-container';

      filteredRepos.forEach(repo => {
        // Use the same 'box' class as your original design
        const projectCard = document.createElement('div');
        projectCard.className = 'box';

        // Populate the card with repository data
        // This HTML structure is based on your original project boxes
        projectCard.innerHTML = `
          <img src="assets/images/projects/project_placeholder.png" alt="${repo.name}">
          <div class="content">
            <div class="tag"><h3>${repo.name}</h3></div>
            <div class="desc">
              <p>${repo.description || 'No description available.'}</p>
              <div class="project-stats" style="margin-top: 15px; display: flex; gap: 15px; color: #888;">
                  <span>⭐ ${repo.stargazers_count}</span>
                  <span>🍴 ${repo.forks_count}</span>
                  ${repo.language ? `<span>🔷 ${repo.language}</span>` : ''}
              </div>
            </div>
            <div class="btns">
                <a href="${repo.html_url}" class="btn" target="_blank" rel="noopener noreferrer">Code <i class="fas fa-code"></i></a>
            </div>
          </div>
        `;
        
        boxContainer.appendChild(projectCard);
      });
      // Add the container with all the project cards to the page
      projectsContainer.appendChild(boxContainer);
    })
    .catch(error => {
      console.error('Error fetching GitHub repos:', error);
      projectsContainer.innerHTML = '<p style="text-align: center;">Sorry, my projects could not be loaded at this time.</p>';
    });
});