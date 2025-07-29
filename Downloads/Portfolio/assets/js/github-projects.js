// File: assets/js/github-projects.js

document.addEventListener('DOMContentLoaded', () => {
  const projectsContainer = document.getElementById('github-projects-container');
  const apiUrl = '/api/github';

  fetch(apiUrl)
    .then(response => {
      // This part is crucial for handling errors from the API
      if (!response.ok) {
        return response.json().then(errorData => {
          // Throw an error that includes the server's specific message
          throw new Error(errorData.errorMessage || 'An unknown error occurred.');
        });
      }
      return response.json();
    })
    .then(repos => {
      projectsContainer.innerHTML = '';
      const reposToExclude = new Set(['srinivas-gajulaa']);
      const filteredRepos = repos.filter(repo => !reposToExclude.has(repo.name));
      const boxContainer = document.createElement('div');
      boxContainer.className = 'box-container';

      filteredRepos.forEach(repo => {
        const projectCard = document.createElement('div');
        projectCard.className = 'box';
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
      projectsContainer.appendChild(boxContainer);
    })
    .catch(error => {
      console.error('Detailed error from server:', error);
      // IMPORTANT: Display the specific error message on the page
      projectsContainer.innerHTML = `<p style="text-align: center; color: red; font-weight: bold;">Error: ${error.message}</p>`;
    });
});