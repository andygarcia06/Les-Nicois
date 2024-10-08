document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('carte-popup');
    const openBtn = document.querySelector('.open-popup');  // Bouton "Carte"
    const closeBtn = document.querySelector('.close-popup');  // Bouton de fermeture dans la popup
    const carteButtonContainer = document.querySelector('.restaurant-button'); // Conteneur du bouton "Carte"

    // Ouvrir la popup et masquer le conteneur du bouton "Carte"
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        popup.style.display = 'block';  // Afficher la popup
        carteButtonContainer.style.display = 'none';  // Masquer le conteneur du bouton "Carte"
    });

    // Fermer la popup et réafficher le conteneur du bouton "Carte"
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';  // Cacher la popup
        carteButtonContainer.style.display = 'block';  // Réafficher le conteneur du bouton "Carte"
    });

    // Fermer la popup lorsqu'on clique à l'extérieur du contenu et réafficher le conteneur du bouton "Carte"
    window.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';  // Cacher la popup
            carteButtonContainer.style.display = 'block';  // Réafficher le conteneur du bouton "Carte"
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const popupReservation = document.querySelector('.popup-reservation-frame');
    const openReservationBtns = document.querySelectorAll('.restaurant-button a'); // Sélectionner tous les liens <a> à l'intérieur des boutons
    const closeReservationBtn = document.querySelector('.popup-reservation-close');

    // Fonction pour ouvrir la popup
    openReservationBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();  // Empêche la redirection de l'ancre <a>
            popupReservation.style.display = 'block';  // Affiche la popup
        });
    });

    // Fonction pour fermer la popup
    closeReservationBtn.addEventListener('click', function() {
        popupReservation.style.display = 'none';  // Cache la popup
    });

    // Déplacement de la popup (draggable)
    let isDragging = false;
    let startX, startY, initialX, initialY;
    const header = document.querySelector('.popup-reservation-header');

    header.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = popupReservation.offsetLeft;
        initialY = popupReservation.offsetTop;
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            popupReservation.style.left = initialX + dx + 'px';
            popupReservation.style.top = initialY + dy + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    // Fermer la popup en cliquant à l'extérieur de son contenu
    window.addEventListener('click', function(e) {
        if (e.target === popupReservation) {
            popupReservation.style.display = 'none';
        }
    });
});

