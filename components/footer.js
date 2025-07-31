document.addEventListener("DOMContentLoaded", () => {
  const localCSVPath = "./static/data/latest-posts.csv";

  fetch(localCSVPath)
    .then(response => {
      if (!response.ok) throw new Error("Failed to load CSV file");
      return response.text();
    })
    .then(data => {
      const container = document.getElementById("posts-container");
      if (!container) {
        console.error("#posts-container not found.");
        return;
      }

      const rows = data.trim().split("\n");
      const headers = rows.shift().split(",");

      rows.forEach(row => {
        const values = row.split(",");
        const post = {};
        headers.forEach((header, index) => {
          post[header.trim()] = values[index] ? values[index].trim() : "";
        });

        if (!post.image) return;

        const postDiv = document.createElement("div");
        postDiv.className = "post";

        // Build image wrapped in anchor
        const postHTML = `
          <a href="${post.url || '#'}">
            <img src="./static/images/${post.image}" alt="${post.caption || 'Post image'}">
          </a>
          <div class="post-caption">${post.caption}</div>
        `;

        postDiv.innerHTML = postHTML;
        container.appendChild(postDiv);
      });
    })
    .catch(error => {
      console.error("Error loading CSV:", error);
    });
});
