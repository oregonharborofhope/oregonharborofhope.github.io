document.addEventListener("DOMContentLoaded", () => {
  Papa.parse("./static/data/news.csv", {
    download: true,
    header: true,
    complete: function(results) {
      const data = results.data;
      const cardsDiv = document.getElementById("cards");

      data.forEach(item => {
        // Create anchor element wrapping the card
        const link = document.createElement("a");
        link.href = item.url;
        link.className = "news-card-link"; // optional, for styling anchors if needed
        link.style.textDecoration = "none"; // prevent default underline

        // Create the card div
        const card = document.createElement("div");
        card.className = "news-card";
        card.innerHTML = `
          <p>${item.category}</p>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
        `;

        // Append card to anchor
        link.appendChild(card);

        // Append anchor to the container
        cardsDiv.appendChild(link);
      });
    }
  });
});
