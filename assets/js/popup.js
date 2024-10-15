document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('carte-popup');
    const openBtn = document.querySelector('.open-popup');
    const closeBtn = document.querySelector('.close-popup');
    const carteButtonContainer = document.querySelector('.restaurant-button');

    // Ouvrir la popup et masquer le conteneur du bouton "Carte"
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        popup.style.display = 'block';
        carteButtonContainer.style.display = 'none';
    });

    // Fermer la popup et réafficher le conteneur du bouton "Carte"
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
        carteButtonContainer.style.display = 'block';
    });

    // Fermer la popup lorsqu'on clique à l'extérieur
    window.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
            carteButtonContainer.style.display = 'block';
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const popupReservation = document.querySelector('.popup-reservation-frame');
    const openReservationBtns = document.querySelectorAll('.restaurant-button a');
    const closeReservationBtn = document.querySelector('.popup-reservation-close');
    const header = document.querySelector('.popup-reservation-header');

    let isDragging = false;
    let startX, startY, initialX, initialY;

    // Fonction pour ouvrir la popup
    openReservationBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            popupReservation.style.display = 'block';
        });
    });

    // Fonction pour fermer la popup
    closeReservationBtn.addEventListener('click', function() {
        popupReservation.style.display = 'none';
    });

    // Déplacement de la popup (draggable)
    header.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = popupReservation.offsetLeft;
        initialY = popupReservation.offsetTop;

        // Changer le curseur en "grabbing" (main fermée)
        header.classList.add('grabbing');
        header.classList.remove('grab');  // Enlever la main ouverte
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

        // Remettre le curseur en "grab" (main ouverte)
        header.classList.remove('grabbing');
        header.classList.add('grab');
    });

    // Fermer la popup en cliquant à l'extérieur de son contenu
    window.addEventListener('click', function(e) {
        if (e.target === popupReservation) {
            popupReservation.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const infoEncart = document.getElementById('index-infos-encart');
    const infoMenu = document.getElementById('index-infos-menu');
    const restaurantButtons = document.querySelector('.restaurant-buttons');

    // Fonction pour ouvrir et fermer le menu Infos
    infoEncart.addEventListener('click', function() {
        infoMenu.classList.toggle('active'); // Ajoute/enlève la classe active

        // Vérifie si le menu est ouvert
        if (infoMenu.classList.contains('active')) {
            restaurantButtons.classList.add('menu-active'); // Ajoute la classe pour les boutons
        } else {
            restaurantButtons.classList.remove('menu-active'); // Enlève la classe
        }
    });
});
