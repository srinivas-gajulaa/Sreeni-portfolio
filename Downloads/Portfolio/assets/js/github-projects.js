// File: assets/js/github-projects.js

document.addEventListener('DOMContentLoaded', () => {
  // The script will find the container with the ID 'github-projects-container'.
  // Since it now ALSO has the class 'box-container', your CSS will apply correctly.
  const projectsContainer = document.getElementById('github-projects-container');
  const apiUrl = '/api/github';

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(errorData.errorMessage || 'An unknown error occurred.');
        });
      }
      return response.json();
    })
    .then(repos => {
      // Clear the "Loading..." message
      projectsContainer.innerHTML = '';

      const reposToExclude = new Set(['srinivas-gajulaa']);
      const filteredRepos = repos.filter(repo => !reposToExclude.has(repo.name));

      if (filteredRepos.length === 0) {
        projectsContainer.innerHTML = '<p style="text-align: center;">No public projects found on GitHub.</p>';
        return;
      }

      // Add each project card directly to the container
      filteredRepos.forEach(repo => {
        const projectCard = document.createElement('div');
        projectCard.className = 'box';

        projectCard.innerHTML = `
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
            <img src="assets/images/projects/project_placeholder.png" alt="${repo.name}">
          </a>
          <div class="content">
            <div class="tag">
              <h3>${repo.name}</h3>
            </div>
            <div class="desc">
              <p>${repo.description || 'No description available.'}</p>
              <p><b>Language:</b> ${repo.language || 'N/A'} | <b>Stars:</b> ${repo.stargazers_count} | <b>Forks:</b> ${repo.forks_count}</p>
              <div class="btns">
                <a href="${repo.html_url}" class="btn" target="_blank" rel="noopener noreferrer"><i class="fas fa-eye"></i> View</a>
                <a href="${repo.html_url}" class="btn" target="_blank" rel="noopener noreferrer">Code <i class="fas fa-code"></i></a>
              </div>
            </div>
          </div>
        `;
        projectsContainer.appendChild(projectCard);
      });
    })
    .catch(error => {
      console.error('Detailed error:', error);
      projectsContainer.innerHTML = `<p style="text-align: center; color: red; font-weight: bold;">Error: ${error.message}</p>`;
    });
});