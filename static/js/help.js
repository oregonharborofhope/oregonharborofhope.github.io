// help.js - Runs JS for the I need cards at the top of the Resources section
// static/js/help.js

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.help-card');

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault(); // prevent page from jumping
      const action = card.dataset.action;

      // Customize this:
      console.log(`User clicked: ${action}`);

      // You can replace this with modal opening, navigation, etc.
      // if (action === 'shelter') {
      //   openModal('shelterModal');
      // }
    });
  });
});
