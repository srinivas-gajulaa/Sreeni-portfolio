// File: assets/js/github-projects.js

document.addEventListener('DOMContentLoaded', () => {
  const projectsContainer = document.getElementById('github-projects-container');
  const apiUrl = '/api/github';

  // --- 1. This list now includes ONLY the 5 projects you want to show ---
  const targetRepoNames = new Set([
    'GitHub-Copilot-Agent-Mode',
    'mlops-customer-churn',
    'genai-fraud-detection',
    'jpmc-virtual-internship',
    'metropolis-nim-workflows'
  ]);

  // --- 2. IMPORTANT: Update this section with your exact image filenames ---
  const customProjectImages = {
    'GitHub-Copilot-Agent-Mode': 'Github Copilot agent Mode.png',
    'mlops-customer-churn': 'MLops Customer churn.png',
    'genai-fraud-detection': 'GenAI fraud Detection.png',
    'jpmc-virtual-internship': 'Jp Morgan Data analytics.jpg',
    'metropolis-nim-workflows': 'metropolis-nim-wf.png'
  };

  fetch(apiUrl)
    .then(response => response.json())
    .then(repos => {
      projectsContainer.innerHTML = '';
      
      // Filter to only include repositories from your target list
      const filteredRepos = repos.filter(repo => targetRepoNames.has(repo.name));

      if (filteredRepos.length === 0) {
        projectsContainer.innerHTML = '<p style="text-align: center;">Could not load specified projects from GitHub.</p>';
        return;
      }

      // Sort the projects to match the order in your target list (optional)
      const sortedRepos = filteredRepos.sort((a, b) => {
        const order = Array.from(targetRepoNames);
        return order.indexOf(a.name) - order.indexOf(b.name);
      });

      sortedRepos.forEach(repo => {
        const projectCard = document.createElement('div');
        projectCard.className = 'box';

        const customImageFile = customProjectImages[repo.name];
        const imageUrl = customImageFile 
          ? `assets/images/${customImageFile}` 
          : `https://opengraph.githubassets.com/1/${repo.full_name}`;

        projectCard.innerHTML = `
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
            <img src="${imageUrl}" alt="${repo.name}">
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