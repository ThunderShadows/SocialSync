const REPO_OWNER = "ThunderShadows";
const REPO_NAME = "SocialSync";
const GITHUB_TOKEN = ""; // Optional: Add your GitHub personal access token to avoid rate limits

async function fetchContributors() {
  const contributorsContainer = document.getElementById("contributors");

  try {
    // Fetch contributors from the GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`,
      {
        headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {},
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to fetch contributors: ${errorDetails}`);
    }

    const contributors = await response.json();

    contributors.forEach((contributor) => {
      // Create a card for each contributor
      const card = document.createElement("div");
      card.className = "contributor-card";

      // Profile image with link
      const profileLink = document.createElement("a");
      profileLink.href = contributor.html_url;
      profileLink.target = "_blank";
      const img = document.createElement("img");
      img.src = contributor.avatar_url;
      img.alt = `${contributor.login}'s avatar`;
      img.style.borderRadius = "50%"; // Optional: Adds a circular avatar
      profileLink.appendChild(img);

      // Contributor name with GitHub icon link
      const nameContainer = document.createElement("div");
      nameContainer.className = "contributor-name";
      nameContainer.style.textAlign = "center";

      const nameText = document.createElement("span");
      nameText.textContent = contributor.login;
      nameText.style.marginRight = "8px";

      const githubIcon = document.createElement("a");
      githubIcon.href = contributor.html_url;
      githubIcon.target = "_blank";
      githubIcon.innerHTML = "<i class='fa-brands fa-github'></i>";
      githubIcon.style.fontSize = "20px";
      githubIcon.style.color = "black";
      githubIcon.style.textDecoration = "none";

      nameContainer.appendChild(nameText);
      nameContainer.appendChild(githubIcon);

      // Append elements to card
      card.appendChild(profileLink); // Image wrapped in a link
      card.appendChild(nameContainer); // Name displayed below

      // Append card to container
      contributorsContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Error fetching contributors:", error);
    contributorsContainer.innerHTML =
      "<p style='color: red;'>Failed to load contributors. Please try again later.</p>";
  }
}

// Fetch and render contributors on page load
fetchContributors();
