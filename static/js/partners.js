document.addEventListener("DOMContentLoaded", () => {
  Papa.parse("./static/data/partners.csv", {
    download: true,
    header: true,
    complete: function(results) {
      const data = results.data;
      const cardsDiv = document.getElementById("cards");

      data.forEach(partner => {
        // Create anchor tag
        const anchor = document.createElement("a");
        anchor.href = partner.url;
        anchor.target = "_blank"; // optional: opens in new tab
        anchor.rel = "noopener noreferrer"; // security best practice

        // Create card div
        const card = document.createElement("div");
        card.className = "partner-card";

        card.innerHTML = `
          <div class="partner-logo">
            <img src="./static/images/${partner.image}" alt="${partner.partner} logo">
          </div>
          <h3>${partner.partner}</h3>
          <p>${partner.text}</p>
        `;

        // Append card to anchor
        anchor.appendChild(card);

        // Append anchor to cardsDiv
        cardsDiv.appendChild(anchor);
      });
    }
  });
});
